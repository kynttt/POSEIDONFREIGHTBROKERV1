// PrivacyPolicy.tsx
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex justify-center py-8">
      <div className="w-[8.5in] h-[11in] bg-white shadow-md p-8 rounded-lg border border-gray-300">
        <h1 className="text-center text-xl font-bold mb-2">Poseidon Freight Privacy Policy</h1>
        <p className="text-center italic text-sm mb-6">Last Updated: October 28, 2024</p>

        <p className="text-sm mb-4 leading-relaxed">
          Poseidon Freight ("we," "us," or "our") respects your privacy and knows that you care about protecting your personal information.
          This privacy policy identifies what information we collect from you when you use poseidonopc.com (the "Site," including all subdomains) and
          the services made available on it (the "Services") and explains how we may use or share that information. We will only use and share your
          information as described in this privacy policy.
        </p>

        <p className="text-sm mb-4 leading-relaxed">
          This Site primarily operates as a(n) for-profit business website. This privacy policy applies to information we collect from you on the Site;
          through the Services; in email, text, and other electronic correspondence; and through any mobile or desktop application through which we
          may communicate. This privacy policy does not apply to information we collect offline or that any third party collects from you after you
          follow links on the Site, including any advertising and affiliate links.
        </p>

        <p className="text-sm font-bold uppercase mb-4">Please Read This Privacy Policy and Our Terms of Use Carefully</p>

        <p className="text-sm mb-4 leading-relaxed">
          The terms stated in this privacy policy constitute a binding legal agreement between you and Poseidon Freight. By using this Site and the
          related services, you unconditionally agree to be bound by the terms stated in this privacy policy and our terms of use, including all
          exclusions and limitations of liability, and warrant that you have full authority and capacity, legal and otherwise, to use the services.
          You may not access or use this Site or the services if you do not agree to any part of these terms. We reserve the right to periodically
          make updates to this privacy policy as our practices change. Your continued use of the Site after such changes constitutes your acceptance
          of the changes, so please check back periodically for updates.
        </p>

        <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
        <p className="text-sm leading-relaxed mb-4">
          We may collect and use the following types of information from those who use the Site and the Services:
        </p>
        <ul className="list-disc list-inside text-sm leading-relaxed">
          <li>
            Information by which you may be personally identified, such as your name, address, email address, phone number, billing and credit card
            information, and other information that may not be publicly available (<strong>“personal information”</strong>).
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
