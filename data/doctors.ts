import { images } from "./images";

export type Doctor = {
  slug: string;
  name: string;
  title: string;
  qualifications: string;
  experienceYears: number;
  image: string;
  imageAlt: string;
  shortBio: string;
  bio: string[];
  expertise: string[];
  education: { degree: string; institution: string; year: string }[];
  memberships: string[];
  languages: string[];
  availability: string;
  lead?: boolean;
};

// TODO: Replace with the real team. Keep `lead: true` on the principal dentist.
export const doctors: Doctor[] = [
  {
    slug: "dr-ananya-rao",
    name: "Dr. Ananya Rao",
    title: "Founder & Lead Dentist — Prosthodontist & Implantologist",
    qualifications: "BDS, MDS (Prosthodontics)",
    experienceYears: 15,
    image: images.doctor1,
    imageAlt: "Portrait of Dr. Ananya Rao, lead prosthodontist, smiling in her clinic coat",
    shortBio: "Dr. Ananya has placed over 3,000 implants and leads our smile makeover and full-mouth rehabilitation programme.",
    bio: [
      "Dr. Ananya Rao founded Lumina Dental Studio with a simple belief: every patient deserves dentistry that is gentle, honest and built to last. Over 15 years she has restored thousands of smiles, from single implants to complex full-mouth rehabilitations.",
      "She trained in implantology in Germany and digital smile design in Spain, and regularly lectures on minimally invasive restorative dentistry. Patients describe her as calm, unhurried and exceptionally clear in explaining their options.",
    ],
    expertise: ["Dental implants", "Full-mouth rehabilitation", "Smile makeovers & veneers", "Crowns & bridges", "Digital smile design"],
    education: [
      { degree: "MDS — Prosthodontics & Implantology", institution: "Government Dental College, Bengaluru", year: "2011" },
      { degree: "BDS", institution: "Manipal College of Dental Sciences", year: "2008" },
      { degree: "Fellowship in Oral Implantology", institution: "University of Frankfurt (ICOI)", year: "2014" },
    ],
    memberships: ["Indian Dental Association (IDA)", "Indian Prosthodontic Society", "International Congress of Oral Implantologists"],
    languages: ["English", "Kannada", "Hindi", "Telugu"],
    availability: "Mon – Sat",
    lead: true,
  },
  {
    slug: "dr-karthik-menon",
    name: "Dr. Karthik Menon",
    title: "Endodontist — Root Canal Specialist",
    qualifications: "BDS, MDS (Conservative Dentistry & Endodontics)",
    experienceYears: 11,
    image: images.doctor2,
    imageAlt: "Portrait of Dr. Karthik Menon, endodontist, in the treatment room",
    shortBio: "Dr. Karthik specialises in painless microscope-assisted root canals and saving teeth others might extract.",
    bio: [
      "Dr. Karthik Menon is a microscope-trained endodontist with a special interest in single-sitting and re-treatment root canals. He's known for turning anxious patients into relaxed ones.",
      "He believes in saving natural teeth whenever possible and uses magnification and rotary systems to make treatment faster and more predictable.",
    ],
    expertise: ["Painless root canal treatment", "Re-RCT", "Microscopic endodontics", "Cosmetic fillings", "Dental trauma"],
    education: [
      { degree: "MDS — Conservative Dentistry & Endodontics", institution: "M.S. Ramaiah Dental College", year: "2015" },
      { degree: "BDS", institution: "Government Dental College, Kozhikode", year: "2012" },
    ],
    memberships: ["Indian Endodontic Society", "Indian Dental Association (IDA)"],
    languages: ["English", "Malayalam", "Kannada", "Hindi"],
    availability: "Mon, Wed, Fri, Sat",
  },
  {
    slug: "dr-meera-iyer",
    name: "Dr. Meera Iyer",
    title: "Orthodontist — Braces & Clear Aligners",
    qualifications: "BDS, MDS (Orthodontics)",
    experienceYears: 9,
    image: images.doctor3,
    imageAlt: "Portrait of Dr. Meera Iyer, orthodontist, smiling warmly",
    shortBio: "Dr. Meera is a certified clear-aligner provider who has straightened more than 1,500 smiles.",
    bio: [
      "Dr. Meera Iyer is a specialist orthodontist who treats children, teens and adults with braces and clear aligners. She uses 3D scanning and digital treatment planning so patients can see their final result before starting.",
      "She is passionate about early orthodontic screening and helping adults who thought it was 'too late' get the smile they've always wanted.",
    ],
    expertise: ["Clear aligners", "Ceramic & metal braces", "Early (interceptive) orthodontics", "Adult orthodontics"],
    education: [
      { degree: "MDS — Orthodontics & Dentofacial Orthopaedics", institution: "Saveetha Dental College, Chennai", year: "2017" },
      { degree: "BDS", institution: "Ragas Dental College, Chennai", year: "2014" },
    ],
    memberships: ["Indian Orthodontic Society", "World Federation of Orthodontists"],
    languages: ["English", "Tamil", "Kannada", "Hindi"],
    availability: "Tue, Thu, Sat",
  },
  {
    slug: "dr-rohan-shetty",
    name: "Dr. Rohan Shetty",
    title: "Paediatric Dentist",
    qualifications: "BDS, MDS (Pedodontics)",
    experienceYears: 8,
    image: images.doctor4,
    imageAlt: "Portrait of Dr. Rohan Shetty, paediatric dentist",
    shortBio: "Dr. Rohan makes dental visits fun for kids with a patient, playful, fear-free approach.",
    bio: [
      "Dr. Rohan Shetty is a paediatric dentist who has spent his career helping children feel safe at the dentist. He uses tell-show-do techniques, distraction and lots of patience.",
      "He also works closely with parents on diet, brushing and habit-breaking for thumb-sucking and grinding.",
    ],
    expertise: ["Kids dentistry", "Fluoride & sealants", "Pulp therapy for baby teeth", "Behaviour management", "Habit-breaking appliances"],
    education: [
      { degree: "MDS — Paediatric & Preventive Dentistry", institution: "A.B. Shetty Memorial Institute, Mangaluru", year: "2018" },
      { degree: "BDS", institution: "Yenepoya Dental College, Mangaluru", year: "2015" },
    ],
    memberships: ["Indian Society of Pedodontics & Preventive Dentistry"],
    languages: ["English", "Kannada", "Tulu", "Hindi"],
    availability: "Mon, Wed, Fri, Sat",
  },
];

export const getDoctor = (slug: string) => doctors.find((d) => d.slug === slug);
export const leadDoctor = doctors.find((d) => d.lead) ?? doctors[0];
