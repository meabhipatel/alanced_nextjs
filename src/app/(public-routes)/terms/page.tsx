import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description:
    "The best platform for search and hire freelancer in the central india. let's have a tour of freelancers.",
};

const TermsPage: React.FC = () => {
  return (
    <div className="container mt-20 sm:px-5 md:px-10 lg:px-20">
      <div className="font-cardo p-3 text-left text-[24px] font-normal text-blue-600 md:text-[28px] lg:text-[30px]">
        Terms &amp; Conditions
      </div>
      <div className="relative mb-6 mt-1 w-[180px] sm:w-[220px]">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
        <div className="rounded-lg border-b-2 border-gray-600"></div>
      </div>
      <p className="text-sm leading-relaxed sm:text-base lg:text-lg">
        Welcome to Alanced! Please take a moment to review our Terms &amp; Conditions. By continuing
        to use our platform, you agree to comply with these guidelines, which outline your rights
        and responsibilities while using our website and services
      </p>

      <h1 className="font-inter mt-4 text-base font-semibold sm:text-lg md:text-xl">
        User Obligations
      </h1>
      <ul className="mt-2 list-inside list-disc space-y-2">
        <li>You need to be a minimum of 18 years of age to access Alanced</li>
        <li>
          You commit to submitting accurate and honest information when setting up your account.
        </li>
        <li>
          You are accountable for keeping your account credentials secure and for all actions taken
          under your account
        </li>
        <li>
          You commit to adhering to all relevant laws and regulations while utilizing our platform.{" "}
        </li>
      </ul>

      <h2 className="font-inter mt-4 text-base font-semibold sm:text-lg md:text-xl">
        Utilization of Alanced{" "}
      </h2>
      <ul className="mt-2 list-inside list-disc space-y-2">
        <li>
          Alanced offers a platform that facilitates connections between freelancers and clients
          seeking freelance services.
        </li>
        <li>
          You commit to utilizing Alanced exclusively for legal purposes and in compliance with
          these Terms and Conditions.
        </li>
        <li>Using Alanced for any unlawful or unauthorized activities is strictly forbidden.</li>
      </ul>

      <h2 className="font-inter mt-4 text-base font-semibold sm:text-lg md:text-xl">
        Charges and Transactions{" "}
      </h2>
      <ul className="mt-2 list-inside list-disc space-y-2">
        <li>Alanced may impose charges for specific services offered on the platform.</li>
        <li>
          By utilizing our services, you consent to pay any relevant fees as specified on the
          platform.{" "}
        </li>
        <li>All payments are handled securely via our chosen payment methods.</li>
      </ul>

      <h2 className="font-inter mt-4 text-base font-semibold sm:text-lg md:text-xl">
        Ownership of Intellectual Property{" "}
      </h2>
      <ul className="mt-2 list-inside list-disc space-y-2">
        <li>
          The materials found on Alanced, such as logos, trademarks, and other proprietary content,
          are either owned by Alanced or licensed for its use.
        </li>
        <li>
          You acknowledge that you will not use, replicate, distribute, or develop derivative works
          from our intellectual property without obtaining prior written permission.
        </li>
      </ul>

      <h2 className="font-inter mt-4 text-base font-semibold sm:text-lg md:text-xl">Privacy</h2>
      <p className="mt-2 text-sm leading-relaxed sm:text-base lg:text-base">
        We value your privacy greatly. We encourage you to read our Privacy Policy to learn about
        our practices regarding the collection, use, and sharing of your information.
      </p>

      <h2 className="font-inter mt-4 text-base font-semibold sm:text-lg md:text-xl">
        Limitations on Guarantees{" "}
      </h2>
      <p className="mt-2 text-sm leading-relaxed sm:text-base lg:text-base">
        Alanced offers its services on an &quot;as is&quot; and &quot;as available&quot; basis. We
        do not guarantee that our platform will be free from errors, secure, or consistently
        available. Your usage of Alanced is entirely at your own risk.
      </p>

      <h2 className="font-inter mt-4 text-base font-semibold sm:text-lg md:text-xl">
        Limitation of Liability
      </h2>
      <p className="mt-2 text-sm leading-relaxed sm:text-base lg:text-base">
        To the maximum extent allowed by law, Alanced shall not be responsible for any indirect,
        incidental, special, consequential, or punitive damages resulting from or related to your
        use of our platform.
      </p>

      <h2 className="font-inter mt-4 text-base font-semibold sm:text-lg md:text-xl">Termination</h2>
      <p className="mt-2 text-sm leading-relaxed sm:text-base lg:text-base">
        Alanced retains the right to suspend or terminate your access to the platform at any time,
        for any reason or none at all. Once terminated, your rights to utilize Alanced will end
        immediately.
      </p>

      <h2 className="font-inter mt-4 text-base font-semibold sm:text-lg md:text-xl">
        Governing Law
      </h2>
      <p className="mt-2 text-sm leading-relaxed sm:text-base lg:text-base">
        These Terms & Conditions will be governed by and interpreted in accordance with the laws of
        the Government Jurisdiction of India, without considering any conflicting legal principles.
      </p>

      <h2 className="font-inter mt-4 text-base font-semibold sm:text-lg md:text-xl">
        Modifications to Terms & Conditions
      </h2>
      <p className="mt-2 text-sm leading-relaxed sm:text-base lg:text-base">
        Alanced retains the authority to amend or revise these Terms & Conditions at any time. We
        will inform you of any modifications by updating the Terms & Conditions on our website.
      </p>

      <p className="mt-2 text-sm leading-relaxed sm:text-base lg:text-base">
        By accessing Alanced, you confirm that you have read, comprehended, and consent to adhere to
        these Terms & Conditions. If you disagree with any aspect of these terms, we kindly ask that
        you refrain from using our platform.
      </p>

      <p className="mt-2 text-sm leading-relaxed sm:text-base lg:text-base">
        If you have any inquiries about these Terms & Conditions, please feel free to reach out to
        us at{" "}
        <a
          href="mailto:contact@alanced.com"
          className="text-blue-600"
        >
          contact@alanced.com
        </a>
        .
      </p>

      <p className="mt-4 text-center text-base font-semibold sm:text-lg md:text-xl lg:text-2xl">
        We appreciate your choice of Alanced!
      </p>
    </div>
  );
};

export default TermsPage;
