// Cypher point-cloud renderer. Raw WebGL2, one draw call. The cloud is surface-sampled from the
// team's STL, with extra dots along sharp feature edges so motors, wheels, and plate numbers read.
// Dots start scattered on a wide 3D shell around the robot, then spiral in and land. Everything is a
// shade of yellow except the team numbers, which are a pale cream.

type Palette = { far: [number, number, number]; alpha: number; haze: number };

// Source STL bounds (mm, Z-up). Points are packed per uint32: x 10 bits | y 10 | z 10 | category 2
// (0 surface haze, 1 feature edge, 2 team-number outline). See tools/pointcloud/build_cloud.py.
const LO = [-287.0704, -210.85, -4.1686];
const EXT = [472.0454, 421.7, 444.9899];
// Turntable pivot: the CAD origin in plan (the chassis center), mid-height vertically.
const PIVOT = [0, 0, 218.33];
const UNIT = 236.02; // mm per scene unit
const SWEEP = 1.52; // scene-unit radius the robot sweeps in plan as it turns
const DIST = 6;
// Assembly: a short hold, then the cloud converges over BUILD_MS on an ease-in-out curve.
const BUILD_DELAY_MS = 250;
const BUILD_MS = 1500;

const VERT = /* glsl */ `#version 300 es
precision highp float;
layout(location = 0) in uint aP;
uniform vec3 uLo;
uniform vec3 uExt;
uniform vec3 uPivot;
uniform float uUnit;
uniform mat4 uView;
uniform mat4 uProj;
uniform vec2 uShift;
uniform float uBuild;
uniform float uLoaded;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerOn;
uniform float uAspect;
uniform float uSize;
uniform float uDpr;
uniform float uDist;
uniform float uAlpha;
uniform float uHaze;
uniform vec3 uFar;
out float vAlpha;
out vec3 vColor;

const vec3 SUN = vec3(1.0, 0.906, 0.361);    // #ffe75c
const vec3 GOLD = vec3(0.949, 0.808, 0.0);   // #f2ce00
const vec3 LEMON = vec3(1.0, 0.871, 0.2);    // #ffde33
const vec3 AMBER = vec3(0.851, 0.659, 0.0);  // #d9a800
const vec3 NUMBER = vec3(0.941, 0.878, 0.588); // #f0e096, a pale cream, lighter than the edges

float hash(uint x) {
  x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16;
  return float(x) / 4294967295.0;
}

vec3 rotY(vec3 v, float a) {
  float c = cos(a), s = sin(a);
  return vec3(c * v.x + s * v.z, v.y, -s * v.x + c * v.z);
}

void main() {
  uint id = uint(gl_VertexID) * 6u;
  float r1 = hash(id), r2 = hash(id + 1u), r3 = hash(id + 2u);
  float r4 = hash(id + 3u), r5 = hash(id + 4u), r6 = hash(id + 5u);

  uint cat = aP >> 30u;
  vec3 u = vec3(float(aP & 1023u), float((aP >> 10u) & 1023u), float((aP >> 20u) & 1023u)) / 1023.0;
  vec3 p = (uLo + u * uExt - uPivot) / uUnit;
  p = vec3(p.x, p.z, -p.y); // STL is Z-up; the scene is Y-up.

  // Start: a wide shell around the robot, in model space, so the cloud turns with the robot and sits
  // at real depth. Dots that pass near the camera render large and sweep past.
  float th = r1 * 6.2831853, cz = r2 * 2.0 - 1.0, sz = sqrt(max(0.0, 1.0 - cz * cz));
  vec3 start = vec3(sz * cos(th), cz * 0.8, sz * sin(th)) * (2.2 + 3.4 * r3);
  start += 0.08 * vec3(sin(uTime * 0.5 + r4 * 6.28), cos(uTime * 0.4 + r5 * 6.28), sin(uTime * 0.45 + r6 * 6.28));

  // Each dot leaves on its own beat, spirals in, and lands with an ease-out.
  float t = clamp((uBuild - r5 * 0.42) / 0.58, 0.0, 1.0);
  float e = 1.0 - pow(1.0 - t, 3.0);
  vec3 from = rotY(start, (1.0 - e) * (1.2 + 1.8 * r6));
  vec3 pos = mix(from, p, e);

  vec4 view = uView * vec4(pos, 1.0);
  if (view.z > -0.3) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vAlpha = 0.0;
    vColor = vec3(0.0);
    return;
  }
  vec4 clip = uProj * view;
  vec2 ndc = clip.xy / clip.w + uShift;

  // The cursor parts the landed dots.
  vec2 d = (ndc - uPointer) * vec2(uAspect, 1.0);
  float dist = length(d);
  float push = uPointerOn * e * pow(max(0.0, 1.0 - dist / 0.16), 2.0) * 0.05;
  ndc += (dist > 1e-4 ? d / dist : vec2(0.0)) * push / vec2(uAspect, 1.0);
  gl_Position = vec4(ndc, 0.0, 1.0);

  // Size follows perspective; the team numbers are drawn a hair bolder.
  float sizeL = uSize * (uDist / -view.z) * mix(0.8, 1.2, r2) * (cat == 2u ? 1.15 : cat == 1u ? 1.0 : 0.9);
  sizeL = min(sizeL * (1.0 + push * 12.0), 18.0);
  gl_PointSize = sizeL * uDpr;

  // Landed tone. Atmospheric depth: the near side stays crisp, the far side recedes. The drivetrain
  // band (lowest quarter) is the busiest part of the robot, so its outlines are lighter and its haze
  // nearly goes. The numbers stay strong so they read from either side.
  float depth = clamp((-view.z - (uDist - 1.2)) / 2.4, 0.0, 1.0);
  float recede = cat == 2u ? mix(1.0, 0.45, depth) : mix(1.0, 0.1, pow(depth, 0.75));
  float low = smoothstep(0.06, 0.32, u.z);
  float body = cat == 2u ? 0.6 : cat == 1u ? 0.66 * mix(0.55, 1.0, low) : uHaze * mix(0.3, 1.0, low);
  float landed = body * recede;

  // In flight every dot shows, so the cloud is a bright field; near dots soften like out-of-focus
  // sparks. Before the data arrives only a sparse, twinkling tenth of the field shows.
  float twinkle = 0.6 + 0.4 * sin(uTime * 1.4 + r1 * 40.0);
  float star = step(r4, 0.1) * 0.55 * twinkle;
  float flying = mix(0.45, 0.9, r4) * min(1.0, 2.4 / sizeL);
  float appear = uLoaded * smoothstep(0.0, 0.14, uBuild);
  float cloud = mix(star, flying, appear);
  vAlpha = mix(cloud, landed, smoothstep(0.72, 1.0, e)) * uAlpha;

  // Color: pale cream numbers, edges in shades of yellow, haze in deeper golds. Each dot keeps its
  // color in flight, so the cloud is as yellow as the robot, with cream only in proportion to the numbers.
  vec3 col;
  if (cat == 2u) col = NUMBER;
  else if (cat == 1u) col = r4 < 0.5 ? SUN : r4 < 0.8 ? GOLD : LEMON;
  else col = r4 < 0.6 ? AMBER : GOLD;
  vColor = mix(col, uFar, smoothstep(0.35, 1.0, depth) * e * (cat == 2u ? 0.25 : 1.0));
}`;

const FRAG = /* glsl */ `#version 300 es
precision highp float;
in float vAlpha;
in vec3 vColor;
out vec4 outColor;
void main() {
  vec2 c = gl_PointCoord * 2.0 - 1.0;
  float r = dot(c, c);
  if (r > 1.0 || vAlpha < 0.004) discard;
  float a = vAlpha * smoothstep(1.0, 0.35, r);
  outColor = vec4(vColor * a, a);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
  return s;
}

function perspective(fovy: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

// View = translate(0, 0, -dist) * rotX(pitch) * rotY(yaw), column-major.
function viewMatrix(yaw: number, pitch: number, dist: number) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  return new Float32Array([cy, sp * sy, -cp * sy, 0, 0, cp, sp, 0, sy, -sp * cy, cp * cy, 0, 0, 0, -dist, 1]);
}

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.trim().replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number];
};

/** What the rest of the hero can ask of the robot: hold all motion, turn it one step, or tilt it to show its
 *  underside, all without a drag. */
export type CypherControl = {
  setPaused(paused: boolean): void;
  nudge(direction: -1 | 1): void;
  setBelow(below: boolean): void;
};
const noControl: CypherControl = { setPaused() {}, nudge() {}, setBelow() {} };

// The tilt that shows the robot from underneath (radians; the rest pose looks down on it at 0.2).
const UNDER = -0.8;
const UNIFORMS = {
  view: 'uView', proj: 'uProj', shift: 'uShift', build: 'uBuild', loaded: 'uLoaded', time: 'uTime',
  pointer: 'uPointer', pointerOn: 'uPointerOn', aspect: 'uAspect', size: 'uSize', dpr: 'uDpr',
  alpha: 'uAlpha', far: 'uFar', haze: 'uHaze',
} as const;

export type CypherOptions = {
  /** Show the robot already built when its dots arrive, with no assembly (the 404 page). */
  assembled?: boolean;
};

export function mountCypher(root: HTMLElement, options: CypherOptions = {}): CypherControl {
  const canvas = root.querySelector<HTMLCanvasElement>('canvas')!;
  const controls = root.querySelector<HTMLElement>('.hint');
  const poster = root.querySelector<HTMLImageElement>('img[data-src]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const small = window.matchMedia('(max-width: 767px)').matches;
  const total = Number(root.dataset.count);
  const count = small ? Math.min(total, 120000) : total;

  // Placement comes from CSS: --robot-x and --robot-y in clip space, --robot-s in clip units per scene unit.
  let place = { x: 0.36, y: 0, s: 0.62 };
  // The sun disk (canvas pixels) is the robot's hit area: inside it the robot can be grabbed.
  let sun = { cx: 0, cy: 0, r: 0 };
  // The drawing buffer's size, applied when the next frame is drawn.
  let width = 1, height = 1, dpr = 1;
  // The sun clears the words, and the words change width when their web fonts arrive. Until then the sun keeps the
  // place the stylesheet gives it (the same geometry, worked out for the web fonts), so it moves at most once.
  let fontsIn = false;

  // Runs whether or not WebGL does, so the poster and the controls always sit in the sun the robot would fill.
  function layout() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(r.width * dpr));
    height = Math.max(1, Math.round(r.height * dpr));
    const cs = getComputedStyle(root);
    const aspect = r.width / Math.max(r.height, 1);
    const s = parseFloat(cs.getPropertyValue('--robot-s')) || 0.62;
    const y = parseFloat(cs.getPropertyValue('--robot-y')) || 0;
    let x = parseFloat(cs.getPropertyValue('--robot-x')) || 0;
    // Keep the turning robot on screen (--robot-fit above 1 lets it brush past the edges on phones).
    const fit = parseFloat(cs.getPropertyValue('--robot-fit')) || 0.98;
    const fitS = (xx: number) => ((fit - Math.abs(xx)) * aspect) / SWEEP;
    let scale = Math.min(s, fitS(x));
    // Beside the words (wider screens), the sun must clear them: it slides right, and shrinks only if it has to,
    // until its left edge sits past the right edge of the headline, lede and button.
    if (cs.getPropertyValue('--clear-copy').trim() === '1') {
      fontsIn ||= document.fonts?.status !== 'loading';
      if (!fontsIn) {
        const disk = root.querySelector('.sun')!.getBoundingClientRect();
        const cx = disk.left + disk.width / 2 - r.left, cy = disk.top + disk.height / 2 - r.top;
        place = { x: (cx / r.width) * 2 - 1, y, s: disk.width / (1.36 * r.height) };
        sun = { cx, cy, r: disk.width / 2 };
        return;
      }
      const words = root.parentElement?.querySelectorAll('.copy h1, .copy .accent, .copy .lede, .copy .btn-sponsor');
      const edge = words?.length ? Math.max(...[...words].map((el) => el.getBoundingClientRect().right)) - r.left + 28 : 0;
      const clearS = (xx: number) => (((xx + 1) / 2) * r.width - edge) / (0.68 * r.height);
      let best = Math.min(scale, clearS(x));
      for (let xx = x + 0.01; xx <= 0.62; xx += 0.01) {
        const v = Math.min(s, fitS(xx), clearS(xx));
        if (v > best) {
          best = v;
          x = xx;
        }
      }
      scale = Math.max(0.2, best);
    }
    place = { x, y, s: scale };
    // Mirror the placement to CSS so the sun holds the whole robot (its mass sits a little low) and
    // the hint can sit just outside the disk.
    const cxF = (place.x + 1) / 2, cyF = (1 - (place.y - 0.1 * place.s)) / 2, d = place.s * 1.36 * r.height;
    root.style.setProperty('--sun-cx', `${cxF * 100}%`);
    root.style.setProperty('--sun-cy', `${cyF * 100}%`);
    root.style.setProperty('--sun-d', `${d}px`);
    sun = { cx: cxF * r.width, cy: cyF * r.height, r: d / 2 };
  }

  // The canvas is announced, focusable and turnable (with the controls showing) only while the robot is there.
  function setLive(on: boolean) {
    if (on) {
      canvas.tabIndex = 0;
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-roledescription', '3D model');
      canvas.setAttribute('aria-label', canvas.dataset.label ?? '');
    } else {
      for (const a of ['tabindex', 'role', 'aria-roledescription', 'aria-label']) canvas.removeAttribute(a);
    }
    if (controls) controls.hidden = !on;
    root.classList.toggle('is-live', on);
  }

  let stopped = false, visible = false, raf = 0;
  // No WebGL2, no model, or a lost context: stop drawing and screen the poster over the sun instead.
  function fallback() {
    stopped = true;
    cancelAnimationFrame(raf);
    raf = 0;
    setLive(false);
    root.classList.remove('is-over-robot', 'is-dragging');
    root.classList.add('is-fallback');
    if (poster && !poster.getAttribute('src')) poster.src = poster.dataset.src!;
  }

  let redraw = () => {};
  const relayout = () => {
    layout();
    redraw();
  };
  layout();
  new ResizeObserver(relayout).observe(canvas);
  document.fonts?.ready.then(() => {
    fontsIn = true;
    relayout();
  });

  const gl = canvas.getContext('webgl2', { antialias: false, premultipliedAlpha: true, alpha: true });
  if (!gl) {
    fallback();
    return noControl;
  }

  // Program, uniforms and the point buffer; built again if a lost context comes back. The buffer exists before
  // the data does: until it arrives, the dots draw as a sparse star field (start positions come from the vertex id).
  const U = {} as Record<keyof typeof UNIFORMS, WebGLUniformLocation | null>;
  let buf: WebGLBuffer | null = null;
  let data: Uint32Array | null = null;
  const setup = () => {
    const prog = gl.createProgram()!;
    try {
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    } catch {
      return false;
    }
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
    gl.useProgram(prog);
    const u = (name: string) => gl.getUniformLocation(prog, name);
    for (const [key, name] of Object.entries(UNIFORMS)) U[key as keyof typeof UNIFORMS] = u(name);
    gl.uniform3fv(u('uLo'), LO);
    gl.uniform3fv(u('uExt'), EXT);
    gl.uniform3fv(u('uPivot'), PIVOT);
    gl.uniform1f(u('uUnit'), UNIT);
    gl.uniform1f(u('uDist'), DIST);
    gl.bindVertexArray(gl.createVertexArray());
    buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, count * 4, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribIPointer(0, 1, gl.UNSIGNED_INT, 4, 0);
    if (data) gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
    return true;
  };
  if (!setup()) {
    fallback();
    return noControl;
  }

  const palette: Palette = readPalette();
  function readPalette(): Palette {
    const cs = getComputedStyle(root);
    return {
      far: hexToRgb(cs.getPropertyValue('--dot-far') || '#7C6D1F'),
      alpha: parseFloat(cs.getPropertyValue('--dot-alpha')) || 1,
      haze: parseFloat(cs.getPropertyValue('--dot-haze')) || 0.2,
    };
  }

  // Rest pose: the 23511 plate reads left to right across the chassis, with a swerve module at the corner.
  let restYaw = -0.5, restPitch = 0.2;
  if (import.meta.env.DEV) {
    // Dev-only pose tuning: ?yaw=&pitch= (radians).
    const q = new URLSearchParams(location.search);
    if (q.has('yaw')) restYaw = parseFloat(q.get('yaw')!);
    if (q.has('pitch')) restPitch = parseFloat(q.get('pitch')!);
  }
  let yaw = restYaw, pitch = restPitch, yawVel = 0, pitchVel = 0;
  // A tilt asked for from the controls (the view from underneath, or back to rest), eased toward and then cleared.
  let pitchTo: number | null = null;
  let build = 0, building = false, buildStart = 0, loaded = false, firstView = true;
  // Turntable, in radians per second (time-based, so 60 Hz and 120 Hz screens turn alike). The robot
  // turns from the first frame: quicker while the dots stream in, easing to a steady idle turn.
  const SPIN_IDLE = 0.09, SPIN_LOAD = 0.55, SPIN_EASE_MS = 1800;
  let lastNow = 0;
  let pointer = [9, 9], pointerOn = 0, pointerTarget = 0;
  let dragging = false, lastX = 0, lastY = 0, lastMove = 0;
  // The hero's pause control holds every automatic movement (the build, the idle turn, the twinkle), like
  // reduced motion does; dragging, the arrow keys and the turn buttons still work.
  let paused = false;
  const t0 = performance.now();

  const frame = (now: number) => {
    raf = 0;
    if (stopped) return;
    const still = reduceMotion.matches || paused;
    const time = (now - t0) / 1000;
    const dt = lastNow ? Math.min(0.05, (now - lastNow) / 1000) : 0;
    lastNow = now;

    if (building) {
      const raw = Math.min(1, Math.max(0, (now - buildStart - BUILD_DELAY_MS) / BUILD_MS));
      build = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2; // ease in-out
      if (raw >= 1) building = false;
    }
    if (loaded && !dragging) {
      yaw += yawVel;
      pitch += pitchVel;
      yawVel *= 0.94;
      pitchVel *= 0.9;
      // A chosen tilt eases in at the pace a turn step settles.
      if (pitchTo !== null) {
        pitch += (pitchTo - pitch) * (1 - Math.pow(0.94, dt * 60));
        if (Math.abs(pitchTo - pitch) < 0.001) {
          pitch = pitchTo;
          pitchTo = null;
        }
      }
      if (!still && Math.abs(yawVel) < 0.0009) {
        const spin = SPIN_IDLE + (SPIN_LOAD - SPIN_IDLE) * Math.exp(-(now - buildStart) / SPIN_EASE_MS);
        yaw += spin * dt;
      }
    }
    pitch = Math.max(-1.45, Math.min(1.45, pitch));
    pointerOn += (pointerTarget - pointerOn) * 0.12;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    const aspect = width / height;
    const fov = 2 * Math.atan(1 / (place.s * DIST));
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    // Standard premultiplied "over". Writing color with zero alpha to fake glow only
    // works in Chromium; WebKit composites those pixels as transparent.
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniformMatrix4fv(U.view, false, viewMatrix(yaw, pitch, DIST));
    gl.uniformMatrix4fv(U.proj, false, perspective(fov, aspect, 0.1, 30));
    gl.uniform2f(U.shift, place.x, place.y);
    gl.uniform1f(U.build, still && loaded ? 1 : build);
    gl.uniform1f(U.loaded, loaded ? 1 : 0);
    gl.uniform1f(U.time, still ? 0 : time);
    gl.uniform2f(U.pointer, pointer[0], pointer[1]);
    gl.uniform1f(U.pointerOn, still ? 0 : pointerOn);
    gl.uniform1f(U.aspect, aspect);
    gl.uniform1f(U.size, small ? 1.2 : 1.35);
    gl.uniform1f(U.dpr, dpr);
    gl.uniform1f(U.alpha, palette.alpha);
    gl.uniform3fv(U.far, palette.far);
    gl.uniform1f(U.haze, palette.haze);
    gl.drawArrays(gl.POINTS, 0, count);

    const settled =
      still && !dragging && pitchTo === null && Math.abs(yawVel) < 1e-4 && Math.abs(pitchVel) < 1e-4;
    if (visible && !settled) raf = requestAnimationFrame(frame);
  };

  const kick = () => {
    if (!raf && visible && !stopped) raf = requestAnimationFrame(frame);
  };
  redraw = kick;

  function startBuild() {
    build = 0;
    buildStart = performance.now();
    building = !reduceMotion.matches && !options.assembled;
    if (!building || paused) {
      building = false;
      build = 1;
    }
    // Start a turn early so the robot lands on its best angle (plate readable) as the dots settle.
    else yaw = restYaw - 1.0;
    kick();
  }

  // One step is about 40 degrees; under reduced motion it jumps there instead of easing.
  const nudge = (direction: -1 | 1) => {
    if (!loaded) return;
    if (reduceMotion.matches) yaw += direction * 0.7;
    else yawVel = direction * 0.042;
    kick();
  };

  // Drag on the robot rotates it freely, including underneath, with a finger as with a mouse. Drags that start
  // elsewhere in the hero are left alone, so the page still scrolls from anywhere outside the sun.
  const toClip = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1)];
  };
  const overRobot = (e: { clientX: number; clientY: number }) => {
    const r = canvas.getBoundingClientRect();
    const dx = e.clientX - r.left - sun.cx, dy = e.clientY - r.top - sun.cy;
    return dx * dx + dy * dy <= sun.r * sun.r;
  };
  // .is-over-robot tells the page (and its cursor) when the pointer is on the robot itself.
  const setOver = (on: boolean) => root.classList.toggle('is-over-robot', on);
  // The canvas lets the page take vertical swipes (touch-action: pan-y); a touch that lands on the robot claims the
  // whole gesture instead, so dragging up and down tilts it rather than scrolling.
  canvas.addEventListener(
    'touchstart',
    (e) => {
      if (loaded && e.cancelable && overRobot(e.touches[0])) e.preventDefault();
    },
    { passive: false },
  );
  canvas.addEventListener('pointerdown', (e) => {
    if (!loaded || !overRobot(e)) return;
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    lastMove = performance.now();
    yawVel = pitchVel = 0;
    pitchTo = null;
    canvas.setPointerCapture(e.pointerId);
    root.classList.add('is-dragging');
    kick();
  });
  canvas.addEventListener('pointermove', (e) => {
    setOver(dragging || overRobot(e));
    if (e.pointerType === 'mouse') {
      pointer = toClip(e);
      pointerTarget = 1;
    }
    if (dragging) {
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      const k = 0.0075;
      yaw += dx * k;
      pitch += dy * k;
      yawVel = dx * k * 0.5;
      pitchVel = dy * k * 0.3;
      lastX = e.clientX;
      lastY = e.clientY;
      lastMove = performance.now();
    }
    kick();
  });
  const end = (e: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    // A flick coasts to a stop, except under reduced motion or when the pointer had already come to rest.
    if (reduceMotion.matches || performance.now() - lastMove > 80) yawVel = pitchVel = 0;
    root.classList.remove('is-dragging');
    setOver(overRobot(e));
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    kick();
  };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('pointerleave', () => {
    pointerTarget = 0;
    if (!dragging) setOver(false);
    kick();
  });
  canvas.addEventListener('keydown', (e) => {
    const step = 0.12;
    // Left and right turn like the turn buttons (under reduced motion one jump per press, not per key repeat).
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      if (!(e.repeat && reduceMotion.matches)) nudge(e.key === 'ArrowLeft' ? -1 : 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      pitch += e.key === 'ArrowUp' ? -step : step;
      pitchTo = null;
    } else return;
    e.preventDefault();
    kick();
  });

  // A lost context (a GPU reset, or a phone reclaiming memory from a background tab) leaves the poster in the sun.
  // If the browser hands the context back, the robot returns as it was.
  let failed = false;
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    fallback();
  });
  canvas.addEventListener('webglcontextrestored', () => {
    if (failed || !setup()) return;
    stopped = false;
    root.classList.remove('is-fallback');
    if (loaded) {
      firstView = building = false;
      build = 1;
      setLive(true);
    }
    kick();
  });

  reduceMotion.addEventListener('change', kick);

  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible && loaded && firstView && !stopped) {
        firstView = false;
        startBuild();
      }
      kick();
    },
    { threshold: 0.02 },
  ).observe(root);

  // Small screens ask for a prefix of the file; the dots are shuffled, so any prefix is an even subset.
  const headers: HeadersInit = count < total ? { Range: `bytes=0-${count * 4 - 1}` } : {};
  fetch(root.dataset.src!, { headers })
    .then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.arrayBuffer();
    })
    .then((ab) => {
      data = new Uint32Array(ab, 0, Math.min(count, Math.floor(ab.byteLength / 4)));
      loaded = true;
      // With the context lost, the data waits for it to come back.
      if (stopped) return;
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
      setLive(true);
      if (visible) {
        firstView = false;
        startBuild();
      }
    })
    .catch(() => {
      failed = true;
      fallback();
    });

  return {
    setPaused(on: boolean) {
      paused = on;
      if (on && building) {
        building = false;
        build = 1;
      }
      kick();
    },
    nudge,
    // The view from underneath and back, eased like a turn step; under reduced motion it jumps there.
    setBelow(below: boolean) {
      if (!loaded) return;
      const to = below ? UNDER : restPitch;
      pitchVel = 0;
      if (reduceMotion.matches) {
        pitch = to;
        pitchTo = null;
      } else pitchTo = to;
      kick();
    },
  };
}
