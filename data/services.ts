import { images } from "./images";

export type IconName =
  | "tooth" | "stethoscope" | "crown" | "smile" | "sparkles" | "gem" | "layers" | "scissors"
  | "baby" | "droplets" | "activity" | "siren" | "shield" | "armchair" | "cpu" | "award" | "heart" | "wallet" | "users" | "clock";

export type ServiceCategory = "General" | "Restorative" | "Cosmetic" | "Orthodontics" | "Surgical" | "Kids" | "Emergency";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  icon: IconName;
  /** One-line card description */
  summary: string;
  /** "What it is" paragraph(s) */
  intro: string[];
  whoFor: string[];
  benefits: string[];
  steps: { title: string; description: string }[];
  recovery: string;
  duration: string;
  visits: string;
  priceFrom: number;
  priceTo: number;
  priceUnit?: string;
  faqs: { question: string; answer: string }[];
  image: string;
  imageAlt: string;
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "dental-checkup-cleaning",
    title: "General Check-up & Cleaning",
    category: "General",
    icon: "stethoscope",
    summary: "Thorough examinations, digital X-rays and gentle scaling & polishing to keep problems from starting.",
    intro: [
      "A routine dental check-up is the single most effective thing you can do for your long-term oral health. We examine your teeth, gums, bite and soft tissues, take low-dose digital X-rays when needed, and screen for early signs of decay, gum disease and oral cancer.",
      "Our hygienists then remove plaque and hardened tartar with an ultrasonic scaler and finish with a polish that leaves teeth feeling smooth and fresh — gently, and with numbing gel available if you have sensitive gums.",
    ],
    whoFor: [
      "Everyone — adults and children — every 6 months",
      "Anyone with bleeding gums, bad breath or sensitivity",
      "Patients who haven't seen a dentist in over a year",
      "Expectant mothers (gum health matters during pregnancy)",
    ],
    benefits: [
      "Catch cavities while they are small and inexpensive to fix",
      "Fresher breath and a brighter, polished smile",
      "Lower risk of gum disease and tooth loss",
      "Personalised home-care advice from our hygienist",
    ],
    steps: [
      { title: "Medical history & concerns", description: "We listen first — any pain, sensitivity or cosmetic goals you have." },
      { title: "Comprehensive examination", description: "Visual exam, intra-oral camera photos and digital X-rays if required." },
      { title: "Scaling & polishing", description: "Ultrasonic cleaning removes tartar above and just below the gumline." },
      { title: "Plan & prevention", description: "We explain findings in plain language and agree a plan together." },
    ],
    recovery: "No downtime. Gums may feel slightly tender for a day after a deep clean; a warm salt-water rinse helps.",
    duration: "45–60 minutes",
    visits: "1 visit",
    priceFrom: 500,
    priceTo: 2500,
    faqs: [
      { question: "Does scaling damage enamel?", answer: "No. Professional scaling only removes tartar and stains that sit on the tooth — it doesn't remove or weaken enamel. Teeth can feel briefly sensitive because the tartar that covered them is gone." },
      { question: "How often should I get a cleaning?", answer: "Every 6 months for most people. If you have gum disease, diabetes or braces we may recommend every 3–4 months." },
      { question: "Are dental X-rays safe?", answer: "Yes. We use digital sensors that need up to 80% less radiation than film — a typical bitewing set is roughly what you'd receive from a day of natural background radiation." },
    ],
    image: images.consultation,
    imageAlt: "Dentist gently examining a relaxed patient during a routine check-up",
    keywords: ["dental check-up Bengaluru", "teeth cleaning Indiranagar", "scaling and polishing"],
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    category: "Restorative",
    icon: "tooth",
    summary: "Painless, single-sitting rotary root canals that save your natural tooth and stop the ache for good.",
    intro: [
      "When decay or a crack reaches the soft pulp inside a tooth, the nerve can become infected and very painful. A root canal removes that infected tissue, disinfects the canals and seals them — saving your natural tooth instead of extracting it.",
      "With modern rotary instruments, apex locators and effective local anaesthesia, today's root canal feels much like having a filling. Many cases are completed in a single sitting.",
    ],
    whoFor: [
      "Severe or throbbing toothache, especially at night",
      "Lingering sensitivity to hot or cold",
      "A swollen gum, pimple or abscess near a tooth",
      "A darkened tooth or deep cavity seen on X-ray",
    ],
    benefits: [
      "Relieves pain quickly and permanently",
      "Keeps your natural tooth — nothing feels or chews quite like it",
      "Prevents infection spreading to the jaw",
      "More affordable long-term than extraction plus an implant",
    ],
    steps: [
      { title: "Diagnosis & X-ray", description: "We confirm the tooth needs treatment and map the root canals." },
      { title: "Comfortable numbing", description: "Profound local anaesthesia so you feel pressure, not pain." },
      { title: "Cleaning & shaping", description: "Rotary files remove infected pulp; canals are disinfected thoroughly." },
      { title: "Sealing & crown", description: "Canals are sealed and the tooth is protected with a crown for strength." },
    ],
    recovery: "Mild tenderness for 2–3 days is normal and settles with over-the-counter pain relief. Avoid chewing hard foods on the tooth until the crown is fitted.",
    duration: "60–90 minutes per sitting",
    visits: "1–2 visits + crown",
    priceFrom: 4500,
    priceTo: 12000,
    priceUnit: "per tooth",
    faqs: [
      { question: "Is a root canal painful?", answer: "With modern anaesthesia, most patients say it feels no worse than a filling. The pain you feel before treatment is from the infection — the root canal is what relieves it." },
      { question: "Do I need a crown after a root canal?", answer: "Back teeth almost always need a crown because a root-treated tooth becomes more brittle. Front teeth sometimes only need a filling — we'll advise based on how much tooth remains." },
      { question: "How long does a root canal last?", answer: "With a good crown and regular check-ups, a root-canal-treated tooth can last a lifetime." },
    ],
    image: images.dentistAtWork,
    imageAlt: "Dentist performing a precise, painless root canal procedure",
    keywords: ["painless root canal Bengaluru", "single sitting RCT", "root canal cost Indiranagar"],
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    category: "Restorative",
    icon: "shield",
    summary: "Permanent, natural-looking replacements for missing teeth — planned digitally with 3D CBCT scans.",
    intro: [
      "A dental implant is a small titanium post placed in the jawbone that acts as a new tooth root. Once it fuses with the bone, it supports a custom crown, bridge or denture that looks, feels and functions like a natural tooth.",
      "We plan every implant with a 3D CBCT scan and guided surgery for precise, minimally invasive placement — which means less discomfort and faster healing.",
    ],
    whoFor: [
      "One, several or all teeth missing",
      "Loose or uncomfortable dentures",
      "Adults with healthy gums and adequate bone (or suitable for bone grafting)",
      "Anyone wanting a fixed, long-term solution",
    ],
    benefits: [
      "Looks and feels like a natural tooth",
      "Preserves jawbone and facial structure",
      "No need to grind down neighbouring teeth",
      "Can last 20+ years with good care",
    ],
    steps: [
      { title: "3D scan & planning", description: "CBCT imaging and digital planning of implant position." },
      { title: "Implant placement", description: "A gentle, guided procedure under local anaesthesia." },
      { title: "Healing (osseointegration)", description: "8–12 weeks for the implant to bond with the bone." },
      { title: "Custom crown", description: "A shade-matched zirconia or ceramic crown is fitted." },
    ],
    recovery: "Most patients return to work the next day. Expect mild swelling for 2–3 days; soft foods are recommended for the first week.",
    duration: "60–90 minutes per implant",
    visits: "3–4 visits over 3 months",
    priceFrom: 25000,
    priceTo: 60000,
    priceUnit: "per implant with crown",
    faqs: [
      { question: "Am I too old for implants?", answer: "There's no upper age limit. What matters is general health and bone quality — we've placed implants for patients in their 80s." },
      { question: "Does implant surgery hurt?", answer: "The procedure is done under local anaesthesia and most patients are surprised by how comfortable it is. Post-operative discomfort is usually managed with simple painkillers." },
      { question: "What if I don't have enough bone?", answer: "Bone grafting or sinus lift procedures can rebuild bone. In some cases, shorter or angled implants avoid the need for grafting." },
    ],
    image: images.technology,
    imageAlt: "Digital 3D scan used to plan precise dental implant placement",
    keywords: ["dental implants Bengaluru", "implant cost India", "missing tooth replacement"],
  },
  {
    slug: "braces-clear-aligners",
    title: "Braces & Clear Aligners",
    category: "Orthodontics",
    icon: "smile",
    summary: "Straighten teeth with metal, ceramic or virtually invisible clear aligners — for teens and adults.",
    intro: [
      "Crooked, crowded or gapped teeth are harder to clean and can affect your bite and confidence. Orthodontic treatment gradually moves teeth into ideal alignment using gentle, controlled forces.",
      "Choose from traditional metal braces, tooth-coloured ceramic braces, or removable clear aligners that are almost invisible. We'll show you a digital preview of your final smile before you start.",
    ],
    whoFor: [
      "Crowded, crooked or overlapping teeth",
      "Gaps between teeth",
      "Overbite, underbite, crossbite or open bite",
      "Teens and adults — it's never too late",
    ],
    benefits: [
      "A straighter, more confident smile",
      "Easier cleaning and lower risk of decay",
      "Better bite and less wear on teeth",
      "Digital smile preview before you commit",
    ],
    steps: [
      { title: "Orthodontic consultation", description: "Photos, X-rays and a 3D intra-oral scan of your teeth." },
      { title: "Digital treatment plan", description: "See your projected result and choose braces or aligners." },
      { title: "Active treatment", description: "Adjustments every 4–6 weeks, or a new aligner set every 1–2 weeks." },
      { title: "Retention", description: "Retainers keep your new smile in place for life." },
    ],
    recovery: "Teeth feel tight for 2–3 days after each adjustment or new aligner. Soft foods and orthodontic wax help.",
    duration: "6–24 months depending on complexity",
    visits: "Every 4–8 weeks",
    priceFrom: 35000,
    priceTo: 250000,
    priceUnit: "full treatment",
    faqs: [
      { question: "Are clear aligners as effective as braces?", answer: "For mild to moderate cases, yes. Complex bite problems may still be best treated with braces. We'll give you an honest recommendation after your scan." },
      { question: "How many hours a day do I wear aligners?", answer: "20–22 hours a day. Remove them only to eat, drink anything other than water, and brush." },
      { question: "What's the best age for braces?", answer: "An orthodontic check around age 7–8 is ideal, and most treatment starts between 11–14 — but adults of any age can straighten their teeth." },
    ],
    image: images.aligners,
    imageAlt: "Transparent clear aligner held up beside a confident smile",
    keywords: ["clear aligners Bengaluru", "braces cost Indiranagar", "invisible braces"],
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    category: "Cosmetic",
    icon: "sparkles",
    summary: "Safe, dentist-supervised whitening that brightens your smile by several shades in a single visit.",
    intro: [
      "Coffee, tea, smoking and age can leave teeth dull or yellow. Professional whitening uses a carefully controlled bleaching gel to lift deep stains safely — far more effective than whitening toothpastes.",
      "Choose in-clinic laser-activated whitening for instant results in about an hour, or custom take-home trays for gradual whitening at your own pace.",
    ],
    whoFor: [
      "Yellow or stained natural teeth",
      "Preparing for a wedding, event or photos",
      "Adults with healthy teeth and gums",
      "Not suitable for crowns/veneers (they don't change colour)",
    ],
    benefits: [
      "Visibly whiter teeth in one session",
      "Professional gel with protective gum barrier",
      "Longer-lasting than over-the-counter products",
      "Low sensitivity protocol",
    ],
    steps: [
      { title: "Shade check", description: "We record your starting shade and check for cavities first." },
      { title: "Gum protection", description: "A protective barrier is applied to shield gums." },
      { title: "Whitening sessions", description: "Professional gel is applied and light-activated in 15-minute cycles." },
      { title: "Desensitising & care", description: "Fluoride treatment and a 48-hour 'white diet' guide." },
    ],
    recovery: "Temporary sensitivity for 24–48 hours is common. Avoid coffee, tea, red wine and turmeric-heavy foods for 48 hours.",
    duration: "60–90 minutes",
    visits: "1 visit",
    priceFrom: 6000,
    priceTo: 18000,
    faqs: [
      { question: "Is whitening safe for enamel?", answer: "Yes, when supervised by a dentist. Professional gels don't damage enamel; any sensitivity is temporary." },
      { question: "How long do results last?", answer: "Typically 1–3 years, depending on diet and habits. Occasional touch-ups keep your smile bright." },
    ],
    image: images.smilingPatient,
    imageAlt: "Smiling patient showing bright, naturally white teeth after whitening",
    keywords: ["teeth whitening Bengaluru", "laser whitening cost", "professional whitening"],
  },
  {
    slug: "smile-makeover-veneers",
    title: "Smile Makeover & Veneers",
    category: "Cosmetic",
    icon: "gem",
    summary: "Custom porcelain veneers and digital smile design to transform chipped, stained or uneven teeth.",
    intro: [
      "Veneers are wafer-thin shells of porcelain or composite bonded to the front of teeth. They can correct colour, shape, size, small gaps and chips — often in just two visits.",
      "With Digital Smile Design (DSD), we plan your new smile around your face, lips and personality, and let you 'test drive' it with a trial smile before anything is made.",
    ],
    whoFor: [
      "Chipped, worn or uneven teeth",
      "Deep stains that whitening can't remove",
      "Small gaps or mildly crooked front teeth",
      "Anyone wanting a complete smile transformation",
    ],
    benefits: [
      "Natural, stain-resistant porcelain",
      "Preview your smile before treatment",
      "Minimal tooth preparation",
      "Results in 2–3 visits",
    ],
    steps: [
      { title: "Smile design consultation", description: "Photos, video and a 3D scan to design your ideal smile." },
      { title: "Trial smile (mock-up)", description: "See and feel your new smile before committing." },
      { title: "Preparation", description: "Minimal enamel shaping and digital impressions." },
      { title: "Bonding", description: "Your custom veneers are bonded and polished." },
    ],
    recovery: "Mild sensitivity for a few days. Avoid biting very hard foods (like nuts or ice) directly with veneered teeth.",
    duration: "2 × 90-minute visits",
    visits: "2–3 visits",
    priceFrom: 8000,
    priceTo: 25000,
    priceUnit: "per tooth",
    faqs: [
      { question: "Composite or porcelain veneers?", answer: "Composite veneers are quicker and more affordable but stain and chip more easily. Porcelain lasts 10–15+ years and looks the most natural." },
      { question: "Will veneers look fake?", answer: "Not when designed properly. We match shape, translucency and shade to your face so they look like the best version of your own teeth." },
    ],
    image: images.dentalChair,
    imageAlt: "Modern cosmetic dentistry suite used for smile makeovers",
    keywords: ["veneers Bengaluru", "smile makeover cost", "digital smile design"],
  },
  {
    slug: "crowns-bridges",
    title: "Crowns & Bridges",
    category: "Restorative",
    icon: "crown",
    summary: "Strong, metal-free zirconia and ceramic crowns and bridges that restore broken or missing teeth.",
    intro: [
      "A crown is a custom cap that covers a damaged, root-treated or heavily filled tooth, restoring its strength and appearance. A bridge replaces one or more missing teeth by anchoring false teeth to neighbouring crowns.",
      "We use metal-free zirconia and E.max ceramics for natural translucency and no grey line at the gum.",
    ],
    whoFor: [
      "Cracked, broken or heavily filled teeth",
      "Teeth after root canal treatment",
      "One or two missing teeth (bridge)",
      "Discoloured or misshapen teeth",
    ],
    benefits: [
      "Restores full chewing strength",
      "Metal-free, natural-looking materials",
      "Protects weak teeth from fracture",
      "Long-lasting: 10–15+ years",
    ],
    steps: [
      { title: "Tooth preparation", description: "The tooth is gently shaped under local anaesthesia." },
      { title: "Digital impression", description: "A quick 3D scan — no messy impression trays." },
      { title: "Temporary crown", description: "Protects your tooth while the lab crafts your crown." },
      { title: "Final fit", description: "Your permanent crown is checked, adjusted and cemented." },
    ],
    recovery: "Slight sensitivity for a few days. Avoid sticky foods on the temporary crown.",
    duration: "60 minutes per visit",
    visits: "2 visits",
    priceFrom: 4000,
    priceTo: 22000,
    priceUnit: "per unit",
    faqs: [
      { question: "Which crown material is best?", answer: "Zirconia is extremely strong and ideal for back teeth; E.max offers the best aesthetics for front teeth. PFM (metal-ceramic) is a budget-friendly option." },
      { question: "Can a crown get a cavity?", answer: "The crown itself can't decay, but the tooth underneath can at the edges — so keep brushing, flossing and attending check-ups." },
    ],
    image: images.clinicInterior,
    imageAlt: "Bright treatment room where crowns and bridges are fitted",
    keywords: ["zirconia crown cost Bengaluru", "dental bridge", "tooth cap"],
  },
  {
    slug: "tooth-extraction-wisdom-teeth",
    title: "Tooth Extraction & Wisdom Teeth",
    category: "Surgical",
    icon: "scissors",
    summary: "Gentle, atraumatic extractions and surgical wisdom tooth removal with fast, comfortable healing.",
    intro: [
      "We always try to save teeth first — but when a tooth is severely broken, infected beyond repair, or a wisdom tooth is impacted, removal is the healthiest option.",
      "Using atraumatic techniques, piezo-surgery where appropriate and excellent anaesthesia, extractions today are far more comfortable than most people expect.",
    ],
    whoFor: [
      "Impacted or painful wisdom teeth",
      "Teeth broken beyond repair",
      "Severe gum disease with loose teeth",
      "Orthodontic extractions",
    ],
    benefits: [
      "Ends recurring pain and infection",
      "Protects neighbouring teeth",
      "Minimally invasive techniques for faster healing",
      "Clear aftercare instructions and follow-up",
    ],
    steps: [
      { title: "X-ray assessment", description: "OPG or CBCT to assess roots and nearby nerves." },
      { title: "Anaesthesia", description: "Local anaesthesia; sedation available for anxious patients." },
      { title: "Gentle removal", description: "Atraumatic technique preserves surrounding bone." },
      { title: "Aftercare", description: "Stitches if needed, written instructions and a review." },
    ],
    recovery: "Simple extractions heal in 3–5 days. Wisdom tooth surgery may cause swelling for 3–5 days. Avoid spitting, straws and smoking for 48 hours.",
    duration: "20–60 minutes",
    visits: "1 visit + review",
    priceFrom: 800,
    priceTo: 8000,
    priceUnit: "per tooth",
    faqs: [
      { question: "Do all wisdom teeth need to come out?", answer: "No. Only those that are impacted, decayed, causing pain or damaging the tooth in front. Healthy, well-positioned wisdom teeth can stay." },
      { question: "What is a dry socket?", answer: "A painful condition where the blood clot dislodges. Following our aftercare (no smoking, spitting or straws) greatly reduces the risk." },
    ],
    image: images.sterilisation,
    imageAlt: "Sterile surgical setup prepared for a gentle tooth extraction",
    keywords: ["wisdom tooth removal Bengaluru", "tooth extraction cost", "impacted wisdom tooth"],
  },
  {
    slug: "kids-dentistry",
    title: "Kids Dentistry",
    category: "Kids",
    icon: "baby",
    summary: "Fun, fear-free dental visits for little ones — from first tooth to teenage years.",
    intro: [
      "Children aren't just small adults — they need a calm, playful and patient approach. Our paediatric dental care builds positive habits and a lifetime of confident dental visits.",
      "From the first check-up (by age one) to fluoride, sealants, tooth-coloured fillings and habit counselling, we keep growing smiles healthy.",
    ],
    whoFor: [
      "Babies from their first tooth",
      "Children with cavities or dental anxiety",
      "Kids who suck their thumb or grind their teeth",
      "Early orthodontic screening (age 7+)",
    ],
    benefits: [
      "Child-friendly, tell-show-do approach",
      "Preventive fluoride and fissure sealants",
      "Tooth-coloured fillings and pulp therapy",
      "Parents can stay with their child",
    ],
    steps: [
      { title: "Happy visit", description: "A relaxed first visit to meet the team and explore the chair." },
      { title: "Gentle check-up", description: "Counting teeth, a clean and a fluoride varnish." },
      { title: "Treatment if needed", description: "Explained in kid-friendly words, at their pace." },
      { title: "Home care coaching", description: "Brushing, diet and habit tips for parents." },
    ],
    recovery: "Usually none. After fillings, avoid chewing while numb to prevent cheek or lip biting.",
    duration: "30–45 minutes",
    visits: "Every 6 months",
    priceFrom: 500,
    priceTo: 4000,
    faqs: [
      { question: "When should my child first see a dentist?", answer: "By their first birthday or within six months of the first tooth appearing." },
      { question: "Do baby teeth really need fillings?", answer: "Yes. Baby teeth hold space for adult teeth and decay can cause pain and infection. Some molars stay until age 12." },
    ],
    image: images.kids,
    imageAlt: "Cheerful child smiling in the dental chair during a check-up",
    keywords: ["kids dentist Bengaluru", "paediatric dentist Indiranagar", "children dental care"],
  },
  {
    slug: "gum-treatment",
    title: "Gum Treatment",
    category: "General",
    icon: "droplets",
    summary: "Treat bleeding gums, gum disease and recession with deep cleaning, laser therapy and gum surgery.",
    intro: [
      "Gum (periodontal) disease is the leading cause of tooth loss in adults — yet it's often painless until advanced. Bleeding while brushing is the most common early sign.",
      "We offer deep cleaning (scaling and root planing), laser-assisted gum therapy, flap surgery and gum grafting for receding gums.",
    ],
    whoFor: [
      "Bleeding, red or swollen gums",
      "Persistent bad breath",
      "Loose teeth or receding gums",
      "Diabetics and smokers (higher risk)",
    ],
    benefits: [
      "Stops bleeding and inflammation",
      "Prevents tooth loss",
      "Fresher breath",
      "Linked to better heart and diabetic health",
    ],
    steps: [
      { title: "Gum charting", description: "Measuring pocket depths around every tooth." },
      { title: "Deep cleaning", description: "Scaling and root planing under local anaesthesia." },
      { title: "Advanced therapy", description: "Laser or surgical treatment for deeper pockets." },
      { title: "Maintenance", description: "Cleanings every 3–4 months to keep gums stable." },
    ],
    recovery: "Gums may be tender for 2–3 days. Use the prescribed mouthwash and a soft brush.",
    duration: "45–90 minutes",
    visits: "2–4 visits",
    priceFrom: 2500,
    priceTo: 15000,
    priceUnit: "per quadrant/area",
    faqs: [
      { question: "Is gum disease reversible?", answer: "Early gum disease (gingivitis) is fully reversible. Advanced periodontitis can be controlled and stabilised, though lost bone doesn't fully regrow without regenerative procedures." },
    ],
    image: images.toothbrush,
    imageAlt: "Soft-bristled toothbrush recommended for healthy gums",
    keywords: ["gum treatment Bengaluru", "bleeding gums", "periodontist Indiranagar"],
  },
  {
    slug: "dentures",
    title: "Dentures",
    category: "Restorative",
    icon: "layers",
    summary: "Comfortable, natural-looking complete and partial dentures — including implant-supported options.",
    intro: [
      "Modern dentures are lighter, better-fitting and far more natural-looking than older designs. We offer complete dentures, flexible partial dentures and implant-supported overdentures that click securely into place.",
    ],
    whoFor: [
      "Patients missing several or all teeth",
      "Those with ill-fitting old dentures",
      "Patients wanting an affordable alternative to multiple implants",
    ],
    benefits: [
      "Restores chewing and clear speech",
      "Supports lips and cheeks for a fuller look",
      "Implant-retained options eliminate slipping",
      "Custom-shaded for a natural smile",
    ],
    steps: [
      { title: "Impressions", description: "Precise moulds of your gums and bite." },
      { title: "Bite registration", description: "Recording jaw relationships for comfort." },
      { title: "Try-in", description: "Check fit, look and speech before finishing." },
      { title: "Delivery & adjustment", description: "Fitting and follow-up tweaks for comfort." },
    ],
    recovery: "An adjustment period of 2–4 weeks is normal while you get used to speaking and eating.",
    duration: "45–60 minutes per visit",
    visits: "4–5 visits",
    priceFrom: 12000,
    priceTo: 80000,
    priceUnit: "per arch",
    faqs: [
      { question: "Should I sleep with dentures in?", answer: "We recommend removing them at night to let your gums rest, and soaking them in a cleaning solution." },
    ],
    image: images.clinicReception,
    imageAlt: "Calm, welcoming clinic reception area",
    keywords: ["dentures Bengaluru", "implant supported dentures", "false teeth cost"],
  },
  {
    slug: "emergency-dental-care",
    title: "Emergency Dental Care",
    category: "Emergency",
    icon: "siren",
    summary: "Same-day relief for severe toothache, swelling, broken or knocked-out teeth.",
    intro: [
      "Dental emergencies rarely happen at a convenient time. We keep slots open every day for urgent cases and have an emergency line for after-hours advice.",
      "Our priority is to get you out of pain quickly, then plan definitive treatment once things have settled.",
    ],
    whoFor: [
      "Severe toothache or swelling",
      "Broken, chipped or knocked-out tooth",
      "Lost filling or crown",
      "Bleeding after an extraction or injury",
    ],
    benefits: [
      "Same-day appointments",
      "Immediate pain relief",
      "After-hours phone advice",
      "Clear plan for follow-up care",
    ],
    steps: [
      { title: "Call us", description: "Describe the problem — we'll advise and fit you in today." },
      { title: "Rapid assessment", description: "Examination and X-ray to find the cause." },
      { title: "Pain relief", description: "Treatment to relieve pain and control infection." },
      { title: "Follow-up plan", description: "Definitive treatment options and costs explained." },
    ],
    recovery: "Depends on the treatment — we'll give you clear written instructions before you leave.",
    duration: "30–60 minutes",
    visits: "Same day",
    priceFrom: 800,
    priceTo: 3000,
    priceUnit: "emergency consultation & first aid",
    faqs: [
      { question: "What should I do if a tooth is knocked out?", answer: "Pick it up by the crown (not the root), rinse gently without scrubbing, and try to place it back in the socket. If you can't, keep it in milk and see us within 60 minutes." },
      { question: "Should I go to a hospital for dental swelling?", answer: "If swelling affects breathing, swallowing or your eye, go to a hospital emergency department immediately. Otherwise call us for a same-day appointment." },
    ],
    image: images.dentistAtWork,
    imageAlt: "Dentist ready to provide urgent same-day emergency care",
    keywords: ["emergency dentist Bengaluru", "toothache relief", "24/7 dental emergency"],
  },
];

export const serviceCategories = Array.from(new Set(services.map((s) => s.category)));

export const getService = (slug: string) => services.find((s) => s.slug === slug);
