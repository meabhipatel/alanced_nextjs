import { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Discover the Premier Platform for Finding and Hiring Freelancers in Central India! Join us as we explore a diverse array of talented freelancers ready to bring your projects to life.",
};

const Cookies = () => {
  return (
    <Fragment>
      <div className="mx-4 mt-20 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12">
        <div className="font-cardo p-3 text-left text-2xl font-semibold text-blue-600 sm:text-3xl md:text-4xl">
          Cookies
        </div>
        <div className="relative mb-6 mt-1 w-36">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
          <div className="rounded-lg border-b-2 border-gray-600"></div>
        </div>
        <div className="my-2 border border-gray-200 border-opacity-30 bg-[#FFFFFF] px-4 py-5 text-left sm:px-6 lg:px-8">
          <p>
            At Alanced, we utilize cookies to enrich your experience and optimize our
            platform&apos;s functionality. This Cookie Policy outlines how we employ cookies and
            related technologies when you access our website.
          </p>

          <h1 className="mt-4 text-lg font-semibold">What are Cookies?</h1>
          <p>
            Cookies are tiny text files placed on your device during your visits to websites. They
            assist in retaining your preferences and improving your overall browsing experience.
          </p>
          <h2 className="mt-4 text-lg font-semibold">Types of Cookies We Use</h2>
          <ul className="ml-4 list-inside list-disc">
            <li>
              <strong>Essential Cookies:</strong> These cookies are crucial for our website&apos;s
              functionality. They support core features like security, network management, and
              accessibility.
            </li>

            <li>
              <strong>Analytics Cookies:</strong> We utilize these cookies to examine how users
              interact with our website, monitor site performance, and collect statistical data
              regarding user behavior.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> These cookies are employed to present
              advertisements tailored to your interests, taking into account your browsing
              activities and preferences.
            </li>
            <li>
              <strong>Functionality Cookies:</strong> Functionality cookies enable us to recall your
              selections and offer improved features along with personalized content.
            </li>
          </ul>
          <h2 className="mt-4 text-lg font-semibold">Managing Cookies</h2>
          <p>
            You have the ability to manage and control cookies via your browser settings. Most
            browsers provide options to block or delete cookies, as well as to set your preferences
            regarding cookie acceptance.
          </p>
          <p>
            Be aware that disabling cookies might affect your experience on our website, as certain
            features may not operate as intended.
          </p>
          <h2 className="mt-4 text-lg font-semibold">Third-Party Cookies</h2>
          <p>
            We may also utilize cookies from third-party service providers to help with analytics,
            advertising, and various functionalities. The use of third-party cookies is governed by
            the privacy policies of those respective providers.
          </p>
          <h2 className="mt-4 text-lg font-semibold">Changes to This Policy</h2>
          <p>
            We may revise this Cookie Policy occasionally to address changes in our practices or for
            other operational, legal, or regulatory reasons. Any updates will be published on our
            website, and we encourage you to review this policy regularly.
          </p>
          <h2 className="mt-4 text-lg font-semibold">Contact Us</h2>
          <p>
            If you have any inquiries or concerns regarding our Cookie Policy or our practices
            related to cookies, please reach out to us at{" "}
            <a
              href="mailto:contact@alanced.com"
              className="text-blue-400 hover:underline"
            >
              contact@alanced.com
            </a>
            .
          </p>
          <p>
            By utilizing Alanced, you agree to our use of cookies as outlined in this Cookie Policy.
            If you disagree with any aspect of this policy, please modify your browser settings
            accordingly or avoid using our platform.
          </p>
          <p>
            Thank you for choosing Alanced. We are committed to delivering a seamless, personalized
            experience while honoring your privacy choices.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Cookies;
