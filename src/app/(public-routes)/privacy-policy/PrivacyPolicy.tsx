"use client";
import { Fragment, useState } from "react";

const InformationWeCollectContent = () => (
  <Fragment>
    <h1 className="font-inter pt-2 text-left text-lg font-semibold text-[#031136]">
      Information We Collect
    </h1>
    <div className="relative mb-6 mt-1 w-48">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.1</span> Account Information
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      When you register for an Alanced account, we collect personal data including your name, email
      address, username, and password. You may also choose to provide additional profile details,
      such as your location, skills, and profile picture.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.2</span> Payment Information
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      If you use our platform for transactions, we collect payment details, including your billing
      address, credit card number, or other financial information. Please note that we do not store
      your payment card information on our servers; all transactions are securely handled by our
      trusted payment processors.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.3</span> Communications
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may collect and retain communications between you and other users, including messages, chat
      history, and emails exchanged through our platform.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.4</span> Usage Data
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We automatically gather information about your interactions with Alanced, including your IP
      address, browser type, device details, and the pages you visit. Additionally, we may use
      cookies and similar tracking technologies to collect this data.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.5</span> User Content
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      All content you create or upload on our platform, including portfolio items, project
      descriptions, reviews, and messages, is securely stored on our servers.
    </p>
  </Fragment>
);

const HowWeUseYourInformationContent = () => (
  <Fragment>
    <h2 className="font-inter pt-2 text-left text-lg font-semibold text-[#031136]">
      How We Use Your Information
    </h2>
    <div className="relative mb-6 mt-1 w-64">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">2.1</span> Providing Services
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We use your information to enhance your experience on Alanced, including connecting
      freelancers with clients, processing payments, and enabling communication between users.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">2.2</span> Improving Services
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We leverage your data to assess and improve our services, customize your experience, and
      innovate new features and capabilities.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">2.3</span> Communication
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may provide you with notifications, updates, promotional materials, and other
      communications related to your use of Alanced, including for marketing purposes. You have the
      option to opt out of these communications at any time through your account settings.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">2.4</span> Compliance and Legal Obligations
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may process your information to adhere to legal obligations, settle disputes, and ensure
      compliance with our Terms of Service.
    </p>
  </Fragment>
);

const SharingYourInformation = () => (
  <Fragment>
    <h2 className="font-inter pt-2 text-left text-lg font-semibold text-[#031136]">
      Sharing Your Information
    </h2>
    <div className="relative mb-6 mt-1 w-52">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">3.1</span> Service Providers
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may disclose your information to third-party service providers that facilitate the
      provision of our services, such as payment processors, customer support entities, and data
      analytics firms.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">3.2</span> Legal and Safety
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may reveal your information in response to legal inquiries, to safeguard the rights and
      safety of Alanced, our users, or others, or to adhere to relevant laws and regulations.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">3.3</span> Business Transfers
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      In the event of a merger, acquisition, or disposition of assets, your information may be
      transferred as part of the transaction. We will notify you of any such transfer and any
      amendments to this Privacy Policy.
    </p>
  </Fragment>
);

const YourChoices = () => (
  <Fragment>
    <h2 className="font-inter pt-2 text-left text-lg font-semibold text-[#031136]">Your Choices</h2>
    <div className="relative mb-6 mt-1 w-48">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">4.1</span> Access and Update Information
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      You can access and modify your personal information by logging into your account and updating
      your profile. If you require assistance, please reach out to our support team.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">4.2</span> Communication Preferences
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      You can adjust your communication preferences by changing your settings in your account or by
      opting out of marketing emails. Please note that, regardless of your choice to unsubscribe
      from promotional emails, we may continue to send you important updates related to your
      account.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">4.3</span> Cookies and Tracking Technologies
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      You can adjust your cookie preferences via your browser settings. However, please be aware
      that disabling cookies may impact your ability to utilize certain features of our platform.
    </p>
  </Fragment>
);

const PrivacyPolicy = () => {
  const [selectedSection, setSelectedSection] = useState<string>("InformationWeCollect");

  const renderContent = () => {
    switch (selectedSection) {
      case "InformationWeCollect":
        return <InformationWeCollectContent />;
      case "HowWeUseYourInformation":
        return <HowWeUseYourInformationContent />;
      case "SharingYourInformation":
        return <SharingYourInformation />;
      case "YourChoices":
        return <YourChoices />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          <button
            className={`font-inter text-md w-full px-4 py-2 text-left font-semibold ${
              selectedSection === "InformationWeCollect" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setSelectedSection("InformationWeCollect")}
          >
            Information We Collect
          </button>
          <button
            className={`font-inter text-md w-full px-4 py-2 text-left font-semibold ${
              selectedSection === "HowWeUseYourInformation" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setSelectedSection("HowWeUseYourInformation")}
          >
            How We Use Your Information
          </button>
          <button
            className={`font-inter text-md w-full px-4 py-2 text-left font-semibold ${
              selectedSection === "SharingYourInformation" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setSelectedSection("SharingYourInformation")}
          >
            Sharing Your Information
          </button>
          <button
            className={`font-inter text-md w-full px-4 py-2 text-left font-semibold ${
              selectedSection === "YourChoices" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setSelectedSection("YourChoices")}
          >
            Your Choices
          </button>
        </div>
        <div className="w-full md:w-3/4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
