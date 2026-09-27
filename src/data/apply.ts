// Join the Team (/apply) content. Recruiting status itself lives in `recruiting` in src/data/site.ts.
// Sources: the Google Site's About Us and Contact Us (Offseason) pages (scraped 2026-09-26), the 2026
// sponsorship package (page 1, the FIRST Tech Challenge card: grades 7-12, ages 12-18; page 3, zero membership
// fees), and the roles on Meet the Team (src/data/team.ts) for the subteams. No invented requirements, dates
// or steps: the application itself is the team's form, linked from site.ts when recruiting opens.

export const lede =
  'We are a student-led FIRST Tech Challenge team, with members from middle and high schools across the Greater Seattle Area.';

// Who can join, for the applicant: grades and ages (package page 1), zero fees (package page 3), and student-led
// (the Google Site's About Us).
export const joining =
  'Students in grades 7 to 12, ages 12 to 18, join with zero membership fees and run the team themselves, each on one or more subteams.';

// The subteams, as the roles on Meet the Team name them. Each line is what that group does on this team.
export const subteams = [
  { name: 'Build', body: 'Builds the robot, from the chassis to the 3D-printed parts.' },
  { name: 'Design and CAD', body: 'Designs the robot in Onshape and publishes the CAD for other teams to use.' },
  { name: 'Programming', body: 'Writes the robot code on SolversLib, the open-source library we maintain.' },
  { name: 'Outreach', body: 'Runs our LEGO robotics classes, community events, and the RISE School pilot.' },
  { name: 'Finance', body: 'Brings in the sponsors and grants that keep the team free to join.' },
];
