import { images } from "./images";

export type Testimonial = {
  name: string;
  location: string;
  treatment: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  image: string;
  date: string;
};

// TODO: Replace with real reviews (with written patient consent).
export const testimonials: Testimonial[] = [
  {
    name: "Priya Nair",
    location: "Indiranagar",
    treatment: "Clear Aligners",
    rating: 5,
    quote: "I put off straightening my teeth for years. Dr. Meera showed me a 3D preview on day one and the aligners were completely invisible at work. Ten months later, I can't stop smiling in photos!",
    image: images.patient1,
    date: "2026-08-12",
  },
  {
    name: "Rahul Verma",
    location: "Koramangala",
    treatment: "Root Canal Treatment",
    rating: 5,
    quote: "I was terrified of root canals after a bad experience elsewhere. Dr. Karthik finished it in one sitting and I honestly felt nothing. The staff even called the next day to check on me.",
    image: images.patient2,
    date: "2026-07-03",
  },
  {
    name: "Lakshmi Krishnan",
    location: "HSR Layout",
    treatment: "Dental Implants",
    rating: 5,
    quote: "At 68 I didn't think implants were an option. The team explained everything patiently, the surgery was comfortable, and now I can eat everything I love again.",
    image: images.patient3,
    date: "2026-05-21",
  },
  {
    name: "Arjun Mehta",
    location: "Whitefield",
    treatment: "Emergency Care",
    rating: 5,
    quote: "Cracked a tooth on a Saturday evening. They saw me within the hour, fixed the pain and had a crown done the following week. Absolutely professional.",
    image: images.patient4,
    date: "2026-09-02",
  },
  {
    name: "Sneha Reddy",
    location: "Domlur",
    treatment: "Teeth Whitening",
    rating: 5,
    quote: "Got whitening done before my wedding — six shades brighter in a single visit with almost no sensitivity. Spotless clinic and so welcoming.",
    image: images.patient5,
    date: "2026-02-14",
  },
  {
    name: "Vikram Joshi",
    location: "Indiranagar",
    treatment: "Kids Dentistry (for my son)",
    rating: 5,
    quote: "Our 5-year-old now looks forward to his dental visits. Dr. Rohan is magic with kids — patient, playful and never rushed.",
    image: images.patient6,
    date: "2026-06-30",
  },
  {
    name: "Ayesha Khan",
    location: "Jeevan Bima Nagar",
    treatment: "Smile Makeover",
    rating: 5,
    quote: "I tried my new smile with a mock-up before any work was done, which gave me so much confidence. The veneers look completely natural.",
    image: images.patient7,
    date: "2026-04-11",
  },
  {
    name: "Deepa Subramanian",
    location: "Ulsoor",
    treatment: "Gum Treatment",
    rating: 4,
    quote: "My gums used to bleed every time I brushed. After deep cleaning and laser therapy they're healthy again. Very transparent about costs, too.",
    image: images.patient8,
    date: "2026-03-08",
  },
];
