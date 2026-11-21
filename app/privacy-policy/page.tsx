import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({ title: "Privacy Policy", description: `How ${site.name} collects, uses and protects your personal and health information.`, path: "/privacy-policy" });

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="1 November 2026">
      <p>{site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains how we handle personal data collected through this website, in line with India&apos;s Digital Personal Data Protection Act, 2023 and applicable rules.</p>
      <h2>Information we collect</h2>
      <ul>
        <li><strong>Information you give us:</strong> name, phone number, email, preferred appointment time, treatment of interest and any message you send via our forms or WhatsApp.</li>
        <li><strong>Usage information:</strong> anonymous, aggregated analytics (pages visited, device type). Google Analytics cookies are only set if you accept them.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to enquiries and schedule or confirm appointments</li>
        <li>To send reminders and, if you subscribe, our monthly newsletter</li>
        <li>To improve our website and services</li>
      </ul>
      <p>We never sell your data. We do not use website form data for automated decision-making.</p>
      <h2>Health information</h2>
      <p>Clinical records created during treatment are stored securely at the clinic and handled under medical confidentiality. Please avoid sending detailed medical history through website forms — we&apos;ll collect it privately at your visit.</p>
      <h2>Sharing</h2>
      <p>We share data only with service providers that help us operate (e.g. email delivery, hosting), under confidentiality obligations, or where required by law.</p>
      <h2>Retention &amp; security</h2>
      <p>Enquiry data is kept only as long as needed to serve you or as required by law. We use encryption in transit (HTTPS) and access controls to protect it.</p>
      <h2>Your rights</h2>
      <p>You may request access to, correction or deletion of your personal data, or withdraw consent at any time by emailing <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <h2>Contact</h2>
      <p>{site.name}, {fullAddress}. Phone: {site.phone.display}.</p>
    </LegalPage>
  );
}
