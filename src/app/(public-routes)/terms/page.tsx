import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description:
    "The best platform for search and hire freelancer in the central india. let's have a tour of freelancers.",
};

const TermsPage: React.FC = () => {
  return (
    <div className="mx-[5%] mt-20 lg:mx-[1%] xl:mx-0">
      <div className="my-2 border border-gray-200 border-opacity-30 bg-[#FFFFFF] px-8 py-5 text-left">
        <h1 className="font-cardo p-3 text-left text-[26px] font-normal text-blue-600">
          Terms &amp; Conditions
        </h1>
        <div className="relative mb-6 mt-1 w-[220px]">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
          <div className="rounded-lg border-b-2 border-gray-600"></div>
        </div>
        <p>
          Welcome to Alanced! Before using our platform, please read these Terms &amp; Conditions
          carefully. By accessing or using Alanced, you agree to be bound by these terms, which
          govern your use of our website and services.
        </p>

        <h2 className="font-inter mt-4 text-lg font-semibold md:text-xl">User Responsibilities</h2>
        <ul className="mt-2 list-inside list-disc space-y-2">
          <li>You must be at least 18 years old to use Alanced.</li>
          <li>
            You agree to provide accurate and truthful information when creating your account.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your account credentials and
            for all activities that occur under your account.
          </li>
          <li>
            You agree to comply with all applicable laws and regulations when using our platform.
          </li>
        </ul>

        <h2 className="font-inter mt-4 text-lg font-semibold md:text-xl">Use of Alanced</h2>
        <ul className="mt-2 list-inside list-disc space-y-2">
          <li>
            Alanced provides a platform where freelancers and clients can connect for freelance
            services.
          </li>
          <li>
            You agree to use Alanced solely for lawful purposes and in accordance with these Terms
            &amp; Conditions.
          </li>
          <li>You are prohibited from using Alanced for any illegal or unauthorized purpose.</li>
        </ul>

        <h2 className="font-inter mt-4 text-lg font-semibold md:text-xl">Payment and Fees</h2>
        <ul className="mt-2 list-inside list-disc space-y-2">
          <li>Alanced may charge fees for certain services provided on the platform.</li>
          <li>
            By using our services, you agree to pay any applicable fees as outlined on the platform.
          </li>
          <li>Payments are processed securely through our designated payment methods.</li>
        </ul>

        <h2 className="font-inter mt-4 text-lg font-semibold md:text-xl">Intellectual Property</h2>
        <ul className="mt-2 list-inside list-disc space-y-2">
          <li>
            The content on Alanced, including logos, trademarks, and other proprietary materials, is
            owned by or licensed to Alanced.
          </li>
          <li>
            You agree not to use, reproduce, distribute, or create derivative works based on our
            intellectual property without prior written consent.
          </li>
        </ul>

        <h2 className="font-inter mt-4 text-lg font-semibold md:text-xl">Privacy</h2>
        <p>
          Your privacy is important to us. Please review our Privacy Policy to understand how we
          collect, use, and disclose your information.
        </p>

        <h2 className="font-inter mt-4 text-lg font-semibold md:text-xl">
          Disclaimer of Warranties
        </h2>
        <p>
          Alanced provides its services on an &quot;as is&quot; and &quot;as available&quot; basis.
          We do not warrant that our platform will be error-free, secure, or uninterrupted. Your use
          of Alanced is at your own risk.
        </p>

        <h2 className="font-inter mt-4 text-lg font-semibold md:text-xl">
          Limitation of Liability
        </h2>
        <p>
          To the extent permitted by law, Alanced shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages arising out of or in connection with your use
          of our platform.
        </p>

        <h2 className="font-inter mt-4 text-lg font-semibold md:text-xl">Termination</h2>
        <p>
          Alanced reserves the right to suspend or terminate your access to the platform at any
          time, with or without cause. Upon termination, your rights to use Alanced will cease
          immediately.
        </p>

        <h2 className="font-inter mt-4 text-lg font-semibold md:text-xl">Governing Law</h2>
        <p>
          These Terms &amp; Conditions shall be governed by and construed in accordance with the
          laws of the Government Jurisdiction of India, without regard to its conflict of law
          provisions.
        </p>

        <h2 className="font-inter mt-4 text-lg font-semibold md:text-xl">
          Changes to Terms &amp; Conditions
        </h2>
        <p>
          Alanced reserves the right to modify or update these Terms &amp; Conditions at any time.
          We will notify you of any changes by posting the revised Terms &amp; Conditions on our
          website.
        </p>

        <p>
          By using Alanced, you acknowledge that you have read, understood, and agree to be bound by
          these Terms &amp; Conditions. If you do not agree with any part of these terms, please do
          not use our platform.
        </p>

        <p>
          For any questions regarding these Terms &amp; Conditions, please contact us at{" "}
          <a
            href="mailto:contact@alanced.com"
            className="text-blue-600"
          >
            contact@alanced.com
          </a>
          .
        </p>

        <p className="mt-4">Thank you for choosing Alanced!</p>
      </div>
    </div>
  );
};

export default TermsPage;
