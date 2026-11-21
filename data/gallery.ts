export type SmileVariant = "stained" | "crowded" | "gap" | "chipped" | "missing" | "worn" | "ideal";

export type SmileCase = {
  id: string;
  title: string;
  treatment: string;
  serviceSlug: string;
  duration: string;
  description: string;
  before: SmileVariant;
  after: SmileVariant;
  /** Optional real photos — when set, they replace the illustrations. */
  beforeImage?: string;
  afterImage?: string;
};

/**
 * Before/after cases. The site ships with illustrated smiles so it never shows
 * misleading stock photos as "results".
 * TODO: Add real, consented patient photos via `beforeImage` / `afterImage`.
 */
export const smileCases: SmileCase[] = [
  { id: "whitening-1", title: "Coffee stains lifted", treatment: "Teeth Whitening", serviceSlug: "teeth-whitening", duration: "1 visit", description: "Years of tea and coffee staining reversed with in-clinic whitening — six shades brighter.", before: "stained", after: "ideal" },
  { id: "aligners-1", title: "Crowding corrected", treatment: "Clear Aligners", serviceSlug: "braces-clear-aligners", duration: "11 months", description: "Overlapping lower and upper front teeth aligned with 22 sets of clear aligners.", before: "crowded", after: "ideal" },
  { id: "veneers-1", title: "Front gap closed", treatment: "Composite Veneers", serviceSlug: "smile-makeover-veneers", duration: "2 visits", description: "A noticeable gap between the front teeth closed with minimally invasive bonding.", before: "gap", after: "ideal" },
  { id: "crowns-1", title: "Chipped teeth restored", treatment: "E.max Crowns", serviceSlug: "crowns-bridges", duration: "2 visits", description: "Two fractured front teeth rebuilt with natural-looking ceramic crowns.", before: "chipped", after: "ideal" },
  { id: "implant-1", title: "Missing tooth replaced", treatment: "Dental Implant", serviceSlug: "dental-implants", duration: "3 months", description: "A single missing tooth replaced with an implant and zirconia crown.", before: "missing", after: "ideal" },
  { id: "makeover-1", title: "Worn smile rejuvenated", treatment: "Smile Makeover", serviceSlug: "smile-makeover-veneers", duration: "3 visits", description: "Worn, short teeth lengthened with porcelain veneers for a fresher, younger smile.", before: "worn", after: "ideal" },
];
