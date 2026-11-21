import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({ title: "Terms of Use", description: `Terms governing the use of the ${site.name} website and online appointment requests.`, path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updated="1 November 2026">
      <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Medical information disclaimer</h2>
      <p>Content on this website is for general information only and does not replace a professional dental examination, diagnosis or treatment. Always seek the advice of a qualified dentist about your specific condition.</p>
      <h2>Appointments</h2>
      <p>Online booking submits an appointment <strong>request</strong>. An appointment is confirmed only when our team contacts you. Please give at least 24 hours&apos; notice to cancel or reschedule.</p>
      <h2>Pricing</h2>
      <p>Prices displayed are indicative starting prices. The final cost is confirmed in a written treatment plan after clinical examination.</p>
      <h2>Results</h2>
      <p>Before-and-after images and testimonials reflect individual experiences. Results vary between patients and are not guaranteed.</p>
      <h2>Intellectual property</h2>
      <p>All content on this site is owned by or licensed to {site.name} and may not be reproduced without permission.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, with exclusive jurisdiction of the courts of {site.address.city}, {site.address.region}.</p>
    </LegalPage>
  );
}
