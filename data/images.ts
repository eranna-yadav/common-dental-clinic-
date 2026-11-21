/**
 * Placeholder imagery (free Unsplash photos). Every image used on the site is
 * referenced from here so you can swap in real clinic photography in one place.
 * TODO: Replace with real photos of the clinic, team and (consented) patients.
 * Recommended: drop files into /public/images and use paths like "/images/hero.webp".
 */
const u = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const images = {
  hero: u("photo-1629909613654-28e377c37b09"),
  clinicInterior: u("photo-1629909615184-74f495363b67"),
  clinicReception: u("photo-1519494026892-80bbd2d6fd0d"),
  dentalChair: u("photo-1606811971618-4486d14f3f99"),
  dentistAtWork: u("photo-1606811841689-23dfddce3e95"),
  smilingPatient: u("photo-1588776814546-1ffcf47267a5"),
  sterilisation: u("photo-1576091160550-2173dba999ef"),
  technology: u("photo-1581594693702-fbdc51b2763b"),
  kids: u("photo-1588776814546-daab30f310ce"),
  toothbrush: u("photo-1609840114035-3c981b782dfe"),
  aligners: u("photo-1598256989800-fe5f95da9787"),
  consultation: u("photo-1579684385127-1ef15d508118"),
  doctor1: u("photo-1559839734-2b71ea197ec2", 900),
  doctor2: u("photo-1612349317150-e413f6a5b16d", 900),
  doctor3: u("photo-1594824476967-48c8b964273f", 900),
  doctor4: u("photo-1622253692010-333f2da6031d", 900),
  patient1: u("photo-1494790108377-be9c29b29330", 200),
  patient2: u("photo-1507003211169-0a1dd7228f2d", 200),
  patient3: u("photo-1438761681033-6461ffad8d80", 200),
  patient4: u("photo-1500648767791-00dcc994a43e", 200),
  patient5: u("photo-1544005313-94ddf0286df2", 200),
  patient6: u("photo-1472099645785-5658abf4ff4e", 200),
  patient7: u("photo-1534528741775-53994a69daeb", 200),
  patient8: u("photo-1573496359142-b8d87734a5a2", 200),
} as const;
