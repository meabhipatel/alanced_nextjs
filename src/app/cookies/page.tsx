import React from "react";

const Cookies = () => {
  return (
    <>
      <div className="mx-[9%] mt-20">
        <h1 className="font-cardo p-3 text-left text-[26px] font-normal text-[#031136]">
          Cookie Policy
        </h1>
        <div className="relative mb-6 mt-1 w-48">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
          <div className="rounded-lg border-b-2 border-gray-600"></div>
        </div>
        <div className="my-2 border border-gray-200 border-opacity-30 bg-[#FFFFFF] px-8 py-5 text-left">
          <p>
            At Alanced, we use cookies to enhance your experience and improve the functionality of
            our platform. This Cookie Policy explains how we use cookies and similar technologies
            when you visit our website.
          </p>
          <h2 className="mt-4 text-lg font-semibold">What are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit a website.
            They help websites remember your preferences and enhance your browsing experience.
          </p>
          <h2 className="mt-4 text-lg font-semibold">Types of Cookies We Use</h2>
          <ul className="ml-4 list-inside list-disc">
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary for the operation of
              our website. They enable core functionalities such as security, network management,
              and accessibility.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> We use these cookies to analyze how visitors use
              our website, track site performance, and gather statistical information about user
              behavior.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> These cookies are used to deliver advertisements
              relevant to your interests based on your browsing activities and preferences.
            </li>
            <li>
              <strong>Functionality Cookies:</strong> Functionality cookies allow us to remember
              choices you make and provide enhanced features and personalized content.
            </li>
          </ul>
          <h2 className="mt-4 text-lg font-semibold">Managing Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings. Most browsers allow
            you to block or delete cookies, and you can set preferences for cookie acceptance.
          </p>
          <p>
            Please note that blocking cookies may impact your experience on our website, as some
            features may not function properly.
          </p>
          <h2 className="mt-4 text-lg font-semibold">Third-Party Cookies</h2>
          <p>
            We may also use cookies from third-party service providers to assist with analytics,
            advertising, and other functionalities. Third-party cookies are subject to the
            respective privacy policies of these providers.
          </p>
          <h2 className="mt-4 text-lg font-semibold">Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices
            or for other operational, legal, or regulatory reasons. Any updates will be posted on
            our website, and we encourage you to review this policy periodically.
          </p>
          <h2 className="mt-4 text-lg font-semibold">Contact Us</h2>
          <p>
            If you have any questions or concerns about our Cookie Policy or cookie practices,
            please contact us at{" "}
            <a
              href="mailto:contact@alanced.com"
              className="text-blue-400 hover:underline"
            >
              contact@alanced.com
            </a>
            .
          </p>
          <p>
            By using Alanced, you consent to the use of cookies as described in this Cookie Policy.
            If you do not agree with any part of this policy, please adjust your browser settings
            accordingly or refrain from using our platform.
          </p>
          <p>
            Thank you for choosing Alanced. We strive to provide you with a seamless and
            personalized experience while respecting your privacy preferences.
          </p>
        </div>
      </div>
    </>
  );
};

export default Cookies;
