// src/app/(app)/terms-of-service/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | AI Nexus',
  description: 'Read the Terms of Service for AI Nexus. Understand the terms and conditions for using our website and services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </header>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the [Your Website URL] website (the "Service") operated by AI Nexus ("us", "we", or "our").</p>

          <h2>1. Agreement to Terms</h2>
          <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>

          <h2>2. Use of Service</h2>
          <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:</p>
          <ul>
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate AI Nexus, an AI Nexus employee, another user, or any other person or entity.</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of AI Nexus and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Your Country] and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of AI Nexus.</p>
          
          <h2>4. User Content</h2>
          <p>Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
          <p>By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.</p>

          <h2>5. SEO Optimization Tool</h2>
          <p>If you use our SEO Optimization Tool, you acknowledge that the suggestions provided are AI-generated and for informational purposes only. AI Nexus is not responsible for any outcomes or decisions made based on these suggestions. The accuracy and effectiveness of the tool may vary.</p>

          <h2>6. Termination</h2>
          <p>We may terminate or suspend your access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>

          <h2>7. Limitation of Liability</h2>
          <p>In no event shall AI Nexus, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
          
          <h2>8. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>

          <h2>9. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>AI Nexus<br/>
          [Your Company Address]<br/>
          Email: legal@ainexus.com</p>

          <p><em>This is a template Terms of Service and should be reviewed and customized by legal counsel to ensure it meets your specific business needs and legal obligations.</em></p>
        </div>
      </div>
    </div>
  );
}
