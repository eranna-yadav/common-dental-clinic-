import type { IconName } from "./services";

export const whyChooseUs: { icon: IconName; title: string; description: string }[] = [
  { icon: "heart", title: "Truly painless dentistry", description: "Numbing gel, computer-controlled anaesthesia and an unhurried pace — comfort is built into every visit." },
  { icon: "shield", title: "Hospital-grade sterilisation", description: "Class B autoclaves, sealed instrument pouches and single-use disposables. Every patient, every time." },
  { icon: "cpu", title: "Advanced digital technology", description: "3D CBCT scans, intra-oral cameras, digital X-rays and guided implant surgery for precise results." },
  { icon: "award", title: "Specialist dentists under one roof", description: "Implantologists, endodontists, orthodontists and paediatric dentists — no referrals needed." },
  { icon: "wallet", title: "Transparent pricing & 0% EMI", description: "Written estimates before treatment, no hidden charges, and easy EMI on larger treatments." },
  { icon: "clock", title: "On time, every time", description: "Minimal waiting, evening appointments and same-day emergency care when you need it most." },
];

export const trustItems: { icon: IconName; label: string }[] = [
  { icon: "award", label: "IDA Registered Clinic" },
  { icon: "shield", label: "Sterilised Instruments" },
  { icon: "heart", label: "Painless Treatment" },
  { icon: "siren", label: "Emergency Care" },
  { icon: "wallet", label: "0% EMI Available" },
  { icon: "users", label: "Insurance Accepted" },
];

export const paymentPartners = ["UPI", "Visa", "Mastercard", "RuPay", "Bajaj Finserv EMI", "Star Health", "HDFC ERGO"];

export const processSteps = [
  { title: "Consult", description: "Share your concerns over a relaxed, unhurried first conversation — free of charge." },
  { title: "Diagnosis", description: "Digital X-rays, intra-oral photos and 3D scans give us (and you) the full picture." },
  { title: "Treatment", description: "A clear written plan with costs, then gentle, precise care at a pace that suits you." },
  { title: "Aftercare", description: "Follow-up calls, recall reminders and a team that's always a WhatsApp away." },
];

export const values = [
  { icon: "heart" as IconName, title: "Compassion", description: "We treat every patient the way we'd want our own families treated." },
  { icon: "shield" as IconName, title: "Integrity", description: "Honest diagnoses. We only recommend treatment you genuinely need." },
  { icon: "sparkles" as IconName, title: "Excellence", description: "Continuous training and the best materials, because details matter." },
  { icon: "users" as IconName, title: "Partnership", description: "You're part of every decision — informed, never pressured." },
];

export const technologies = [
  { title: "3D CBCT Imaging", description: "Low-dose cone beam scans for precise implant and root canal planning." },
  { title: "Intra-oral Scanner", description: "Digital impressions — no messy trays, more accurate crowns and aligners." },
  { title: "Dental Operating Microscope", description: "Up to 25× magnification for microscopic root canal treatment." },
  { title: "Soft-tissue Laser", description: "Gentler gum treatments with less bleeding and faster healing." },
  { title: "Class B Autoclave", description: "Hospital-standard sterilisation with logged, verified cycles." },
  { title: "Computer-controlled Anaesthesia", description: "The Wand™ system delivers near-painless injections." },
];

export const sterilisationSteps = [
  "Instruments are cleaned in an ultrasonic bath to remove all debris",
  "Each set is sealed in a dated, colour-indicator sterilisation pouch",
  "Pouches go through a Class B vacuum autoclave cycle at 134°C",
  "Every cycle is tested and logged; pouches are opened only in front of you",
  "Needles, suction tips, gloves and bibs are single-use and disposed of safely",
  "Surfaces and dental chairs are disinfected between every patient",
];

export const offers = [
  { title: "Free first consultation", description: "Examination + personalised treatment plan with a senior dentist.", badge: "Free" },
  { title: "Whitening + cleaning combo", description: "Professional cleaning and in-clinic whitening for a fresh, bright smile.", badge: "Save 20%" },
  { title: "0% EMI on implants & aligners", description: "Spread the cost over 6–12 months with zero interest.", badge: "0% EMI" },
];
