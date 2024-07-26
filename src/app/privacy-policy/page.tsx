"use client";

import React, { useState } from "react";

interface PrivacyPolicyContentProps {
  selectedSection: string;
}

const InformationWeCollectContent: React.FC = () => (
  <>
    <h1 className="font-inter pt-2 text-left text-lg font-semibold text-[#031136]">
      Information We Collect
    </h1>
    <div className="relative mb-6 mt-1 w-48">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.1</span> Account Information
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      When you sign up for an Alanced account, we collect personal information such as your name,
      email address, username, and password. You may also choose to provide additional details in
      your profile, such as your location, skills, and a profile picture.
    </h1>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.2</span> Payment Information
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      If you use our platform to make or receive payments, we will collect payment information, such
      as your billing address, credit card number, or other financial details. Please note that we
      do not store your payment card information on our servers; it is securely processed by our
      trusted payment processors.
    </h1>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.3</span> Communications
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may collect and store communications between you and other users, such as messages, chat
      history, and emails sent through our platform.
    </h1>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.4</span> Usage Data
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We automatically collect information about your interactions with Alanced, including your IP
      address, browser type, device information, and the pages you visit. We may also use cookies
      and similar tracking technologies to gather this data.
    </h1>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.5</span> User Content
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      Any content you create or upload to our platform, including portfolio items, project
      descriptions, reviews, and messages, is stored on our servers.
    </h1>
  </>
);

const HowWeUseYourInformationContent: React.FC = () => (
  <>
    <h1 className="font-inter pt-2 text-left text-lg font-semibold text-[#031136]">
      How We Use Your Information
    </h1>
    <div className="relative mb-6 mt-1 w-64">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">2.1</span> Providing Services
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We use your information to facilitate your use of Alanced, including matching freelancers with
      clients, processing payments, and facilitating communications between users.
    </h1>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">2.2</span> Improving Services
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We use your data to analyze and improve our services, personalize your experience, and develop
      new features and functionality.
    </h1>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">2.3</span> Communication
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may send you notifications, updates, promotional materials, and other communications
      related to your use of Alanced, as well as for marketing purposes. You can opt out of these
      communications at any time through your account settings.
    </h1>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">2.4</span> Compliance and Legal Obligations
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may use your information to comply with legal obligations, resolve disputes, and enforce
      our Terms of Service.
    </h1>
  </>
);

const SharingYourInformation: React.FC = () => (
  <>
    <h1 className="font-inter pt-2 text-left text-lg font-semibold text-[#031136]">
      Sharing Your Information
    </h1>
    <div className="relative mb-6 mt-1 w-52">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">3.1</span> Service Providers
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may share your information with third-party service providers who assist us in delivering
      our services, such as payment processors, customer support providers, and data analytics
      services.
    </h1>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">3.2</span> Legal and Safety
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may disclose your information in response to legal requests, to protect the rights and
      safety of Alanced, our users, or others, or to comply with applicable laws and regulations.
    </h1>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">3.3</span> Business Transfers
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      In the event of a merger, acquisition, or sale of assets, your information may be transferred
      as part of the transaction. We will notify you of any such transfer and any changes to this
      Privacy Policy.
    </h1>
  </>
);

const YourChoices: React.FC = () => (
  <>
    <h1 className="font-inter pt-2 text-left text-lg font-semibold text-[#031136]">Your Choices</h1>
    <div className="relative mb-6 mt-1 w-28">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">4.1</span> Access and Update
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      You can access and update your account information at any time through your Alanced account
      settings.
    </h1>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">4.2</span> Deletion
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      You can request the deletion of your Alanced account and personal information by contacting us
      at [email address]. Please note that certain information may be retained for legal or
      legitimate business purposes.
    </h1>
    <h1 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">4.3</span> Marketing Communications
    </h1>
    <h1 className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      You can opt out of receiving marketing communications from us by following the unsubscribe
      instructions in our emails or adjusting your account settings.
    </h1>
  </>
);

const CookiesAndTrackingTechnologies: React.FC = () => (
  <>
    <h1 className="font-inter pt-2 text-left text-lg font-semibold text-[#031136]">
      Cookies and Tracking Technologies
    </h1>
    <div className="relative mb-6 mt-1 w-64">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>
    <h1 className="font-inter text-md text-left font-normal text-[#031136] opacity-40">
      Alanced uses cookies and similar tracking technologies to enhance your experience, analyze
      usage, and deliver personalized content and advertisements. You can control cookies through
      your browser settings and other tools. By using our platform, you consent to the use of
      cookies and tracking technologies as described in our Cookie Policy.
    </h1>
  </>
);

const PrivacyPolicyContent: React.FC<PrivacyPolicyContentProps> = ({ selectedSection }) => {
  switch (selectedSection) {
    case "InformationWeCollect":
      return <InformationWeCollectContent />;
    case "HowWeUseYourInformation":
      return <HowWeUseYourInformationContent />;
    case "SharingYourInformation":
      return <SharingYourInformation />;
    case "YourChoices":
      return <YourChoices />;
    case "CookiesAndTrackingTechnologies":
      return <CookiesAndTrackingTechnologies />;
    default:
      return null;
  }
};



const PrivacyPolicy: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>("");

  // Handle section click
  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
  };

  // Handle keyboard interaction
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, section: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSectionClick(section);
    }
  };

  return (
    <div>
      <div className="flex h-full w-full justify-center bg-[#FAFAFA]">
        <div className="container">
          <div className="mx-auto mt-10 flex flex-col items-center px-4 py-8 lg:py-16">
            <h1 className="font-inter pb-2 pt-5 text-left text-xl font-semibold text-blue-700">
              Privacy Policy
            </h1>
            <div className="relative mb-6 mt-1 w-36">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
              <div className="rounded-lg border-b-2 border-gray-600"></div>
            </div>
            <p className="font-inter pt-3 text-left text-sm font-normal text-[#031136] opacity-40">
              Effective date: July 25, 2024
            </p>
            <h1 className="font-inter text-md pt-3 text-left font-normal text-[#031136] opacity-40">
              Alanced (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, and share your personal information when you use
              our services, website, and platform (&quot;Alanced&quot;).
            </h1>
            <div className="w-full py-8 lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col lg:flex-row lg:space-x-8">
                <button
                  className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600 bg-transparent border-none"
                  onClick={() => handleSectionClick("InformationWeCollect")}
                  onKeyDown={(event) => handleKeyDown(event, "InformationWeCollect")}
                >
                  <span className="text-[#031136] opacity-50">1.</span> Information We Collect
                </button>
                <button
                  className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600 bg-transparent border-none"
                  onClick={() => handleSectionClick("HowWeUseYourInformation")}
                  onKeyDown={(event) => handleKeyDown(event, "HowWeUseYourInformation")}
                >
                  <span className="text-[#031136] opacity-50">2.</span> How We Use Your Information
                </button>
                <button
                  className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600 bg-transparent border-none"
                  onClick={() => handleSectionClick("SharingYourInformation")}
                  onKeyDown={(event) => handleKeyDown(event, "SharingYourInformation")}
                >
                  <span className="text-[#031136] opacity-50">3.</span> Sharing Your Information
                </button>
                <button
                  className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600 bg-transparent border-none"
                  onClick={() => handleSectionClick("YourChoices")}
                  onKeyDown={(event) => handleKeyDown(event, "YourChoices")}
                >
                  <span className="text-[#031136] opacity-50">4.</span> Your Choices
                </button>
                <button
                  className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600 bg-transparent border-none"
                  onClick={() => handleSectionClick("CookiesAndTrackingTechnologies")}
                  onKeyDown={(event) => handleKeyDown(event, "CookiesAndTrackingTechnologies")}
                >
                  <span className="text-[#031136] opacity-50">5.</span> Cookies and Tracking
                  Technologies
                </button>
              </div>
              <div>
                <PrivacyPolicyContent selectedSection={selectedSection} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PrivacyPolicy;