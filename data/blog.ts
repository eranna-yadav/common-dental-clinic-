import { images } from "./images";
import { readingTime } from "@/lib/utils";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "quote"; text: string };

export type BlogCategory = "Treatments" | "Orthodontics" | "Kids" | "Prevention";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  authorSlug: string;
  date: string;
  updated?: string;
  image: string;
  imageAlt: string;
  relatedService?: string;
  content: Block[];
};

const posts: BlogPost[] = [
  {
    slug: "5-signs-you-need-a-root-canal",
    title: "5 Signs You Might Need a Root Canal",
    excerpt: "Lingering sensitivity, night-time throbbing or a pimple on your gum? Here's how to tell when a tooth needs more than a filling — and why a root canal is nothing to fear.",
    category: "Treatments",
    author: "Dr. Karthik Menon",
    authorSlug: "dr-karthik-menon",
    date: "2026-10-28",
    image: images.dentistAtWork,
    imageAlt: "Endodontist reviewing a dental X-ray with a patient",
    relatedService: "root-canal-treatment",
    content: [
      { type: "p", text: "Root canals have an unfair reputation. In reality, a root canal is the treatment that relieves dental pain — and modern techniques make it about as comfortable as a routine filling. The key is catching the problem early, before infection spreads. Here are five signs it's time to see a dentist." },
      { type: "h2", text: "1. A toothache that won't go away" },
      { type: "p", text: "Pain that lingers, throbs, or wakes you at night is the classic sign of an inflamed or infected nerve. Pain when you bite down or a deep ache that radiates to your jaw, ear or other teeth also warrants a check-up." },
      { type: "h2", text: "2. Sensitivity that lingers after hot or cold" },
      { type: "p", text: "A quick twinge from ice cream is usually harmless. But if sensitivity lasts more than 30 seconds after the hot or cold is gone, the nerve inside the tooth may be damaged." },
      { type: "h2", text: "3. Swollen or tender gums" },
      { type: "p", text: "Swelling near a painful tooth — or a small pimple-like bump on the gum (called a sinus tract) — often means pus is draining from an infection at the root tip." },
      { type: "h2", text: "4. A darkening tooth" },
      { type: "p", text: "A tooth that turns grey or darker than its neighbours, especially after a knock or injury, can indicate the nerve has died." },
      { type: "h2", text: "5. A cracked or chipped tooth" },
      { type: "p", text: "Cracks expose the nerve to bacteria. Even if it doesn't hurt yet, a deep crack can lead to infection over time." },
      { type: "quote", text: "\"Most patients are surprised by how easy their root canal was. The pain they had beforehand was the infection — the treatment is what makes it stop.\" — Dr. Karthik Menon" },
      { type: "h2", text: "What happens if you ignore it?" },
      { type: "p", text: "Infection inside a tooth doesn't heal on its own. Antibiotics may calm symptoms temporarily, but the source remains. Left untreated, it can lead to an abscess, bone loss and, eventually, losing the tooth." },
      { type: "h2", text: "The bottom line" },
      { type: "ul", items: ["Don't wait for pain to become unbearable — early treatment is quicker and cheaper.", "Single-sitting root canals are possible in many cases.", "A crown afterwards protects the tooth for decades."] },
      { type: "p", text: "If you're experiencing any of these signs, book a consultation. We'll take a quick X-ray and give you an honest answer — sometimes a simple filling is all you need." },
    ],
  },
  {
    slug: "braces-vs-clear-aligners",
    title: "Braces vs Clear Aligners: Which Is Right for You?",
    excerpt: "Both straighten teeth beautifully — but they differ in look, comfort, cost and lifestyle. An orthodontist breaks down the pros and cons.",
    category: "Orthodontics",
    author: "Dr. Meera Iyer",
    authorSlug: "dr-meera-iyer",
    date: "2026-10-10",
    image: images.aligners,
    imageAlt: "Clear aligner tray beside traditional orthodontic braces",
    relatedService: "braces-clear-aligners",
    content: [
      { type: "p", text: "\"Should I get braces or aligners?\" is the question I hear most often. The honest answer: both work extremely well when planned properly. The right choice depends on your teeth, your lifestyle and your budget." },
      { type: "h2", text: "How they work" },
      { type: "p", text: "Braces use brackets bonded to your teeth and a wire that's adjusted every 4–6 weeks. Clear aligners are a series of custom, removable plastic trays — each one moves your teeth slightly, and you switch to the next set every 1–2 weeks." },
      { type: "h2", text: "Clear aligners: pros and cons" },
      { type: "ul", items: ["Almost invisible — great for working professionals", "Removable for eating, brushing and special occasions", "Fewer clinic visits and no wire emergencies", "Must be worn 20–22 hours a day — discipline matters", "Usually costs more than metal braces"] },
      { type: "h2", text: "Braces: pros and cons" },
      { type: "ul", items: ["Work 24/7 — no reliance on remembering to wear them", "Handle complex bite problems very effectively", "Usually the most affordable option", "Ceramic (tooth-coloured) brackets are far less noticeable", "Some food restrictions and more care while cleaning"] },
      { type: "h2", text: "Which is better for teenagers?" },
      { type: "p", text: "Both can work. If your teen is responsible about wearing aligners, they're a great option. For younger teens or complex cases, braces remove the compliance worry." },
      { type: "h2", text: "How to decide" },
      { type: "ol", items: ["Get a 3D scan and orthodontic assessment.", "See a digital simulation of your result with each option.", "Compare time, cost and lifestyle — then choose what fits you."] },
      { type: "p", text: "Whatever you choose, wearing your retainer afterwards is what keeps your new smile straight for life." },
    ],
  },
  {
    slug: "how-to-keep-kids-teeth-healthy",
    title: "How to Keep Your Kids' Teeth Healthy: A Parent's Guide",
    excerpt: "From the first tooth to the teenage years — practical, dentist-approved tips on brushing, diet, fluoride and making dental visits fun.",
    category: "Kids",
    author: "Dr. Rohan Shetty",
    authorSlug: "dr-rohan-shetty",
    date: "2026-09-18",
    image: images.kids,
    imageAlt: "Happy child brushing teeth with a parent",
    relatedService: "kids-dentistry",
    content: [
      { type: "p", text: "Tooth decay is the most common chronic disease in children — and it's almost entirely preventable. A few simple habits, started early, can give your child a lifetime of healthy smiles." },
      { type: "h2", text: "Start before the first tooth" },
      { type: "p", text: "Wipe your baby's gums with a soft, damp cloth after feeds. Once the first tooth appears, switch to a soft infant toothbrush." },
      { type: "h2", text: "Use the right amount of fluoride toothpaste" },
      { type: "ul", items: ["Under 3 years: a smear the size of a grain of rice", "3–6 years: a pea-sized amount", "Teach them to spit, not rinse — the fluoride keeps working"] },
      { type: "h2", text: "Brush twice a day — and help them do it" },
      { type: "p", text: "Children don't have the dexterity to brush well on their own until about age 7–8. Brush for them (or check their work), especially at night." },
      { type: "h2", text: "Watch the sugar — especially frequency" },
      { type: "p", text: "It's not just how much sugar, but how often. Grazing on biscuits, juice or sweets throughout the day keeps teeth under constant acid attack. Keep sweet treats to mealtimes and offer water between meals." },
      { type: "h3", text: "Hidden sugar culprits" },
      { type: "ul", items: ["Packaged fruit juices and flavoured milk", "Sticky dried fruit and chikki", "Bedtime bottles of milk or juice"] },
      { type: "h2", text: "Ask about sealants and fluoride varnish" },
      { type: "p", text: "Sealants are thin protective coatings painted onto the grooves of back teeth — where most childhood cavities start. Combined with fluoride varnish every six months, they dramatically reduce decay." },
      { type: "h2", text: "Make the dentist a happy place" },
      { type: "p", text: "Schedule the first visit by age one, avoid using the dentist as a threat, and read picture books about dental visits. Our team uses tell-show-do so children know exactly what to expect." },
      { type: "quote", text: "\"Kids who start dental visits early, before there's a problem, grow into adults who aren't afraid of the dentist.\" — Dr. Rohan Shetty" },
    ],
  },
];

const textOf = (blocks: Block[]) =>
  blocks.map((b) => ("text" in b ? b.text : b.items.join(" "))).join(" ");

export const blogPosts = posts
  .map((p) => ({ ...p, readingTime: readingTime(textOf(p.content)) }))
  .sort((a, b) => b.date.localeCompare(a.date));

export type BlogPostWithMeta = (typeof blogPosts)[number];

export const blogCategories = Array.from(new Set(posts.map((p) => p.category)));

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
