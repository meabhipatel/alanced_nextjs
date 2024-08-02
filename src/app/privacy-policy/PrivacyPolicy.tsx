import { useState } from "react";

const InformationWeCollectContent = () => (
  <>
    <h2 className="font-inter pt-2 text-left text-lg font-semibold text-[#031136]">
      Information We Collect
    </h2>
    <div className="relative mb-6 mt-1 w-48">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.1</span> Account Information
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      When you sign up for an Alanced account, we collect personal information such as your name,
      email address, username, and password. You may also choose to provide additional details in
      your profile, such as your location, skills, and a profile picture.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.2</span> Payment Information
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      If you use our platform to make or receive payments, we will collect payment information, such
      as your billing address, credit card number, or other financial details. Please note that we
      do not store your payment card information on our servers; it is securely processed by our
      trusted payment processors.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.3</span> Communications
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may collect and store communications between you and other users, such as messages, chat
      history, and emails sent through our platform.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.4</span> Usage Data
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We automatically collect information about your interactions with Alanced, including your IP
      address, browser type, device information, and the pages you visit. We may also use cookies
      and similar tracking technologies to gather this data.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">1.5</span> User Content
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      Any content you create or upload to our platform, including portfolio items, project
      descriptions, reviews, and messages, is stored on our servers.
    </p>
  </>
);

const HowWeUseYourInformationContent = () => (
  <>
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
      We use your information to facilitate your use of Alanced, including matching freelancers with
      clients, processing payments, and facilitating communications between users.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">2.2</span> Improving Services
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We use your data to analyze and improve our services, personalize your experience, and develop
      new features and functionality.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">2.3</span> Communication
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may send you notifications, updates, promotional materials, and other communications
      related to your use of Alanced, as well as for marketing purposes. You can opt out of these
      communications at any time through your account settings.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">2.4</span> Compliance and Legal Obligations
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may use your information to comply with legal obligations, resolve disputes, and enforce
      our Terms of Service.
    </p>
  </>
);

const SharingYourInformation = () => (
  <>
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
      We may share your information with third-party service providers who assist us in delivering
      our services, such as payment processors, customer support providers, and data analytics
      services.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">3.2</span> Legal and Safety
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      We may disclose your information in response to legal requests, to protect the rights and
      safety of Alanced, our users, or others, or to comply with applicable laws and regulations.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">3.3</span> Business Transfers
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      In the event of a merger, acquisition, or sale of assets, your information may be transferred
      as part of the transaction. We will notify you of any such transfer and any changes to this
      Privacy Policy.
    </p>
  </>
);

const YourChoices = () => (
  <>
    <h2 className="font-inter pt-2 text-left text-lg font-semibold text-[#031136]">Your Choices</h2>
    <div className="relative mb-6 mt-1 w-48">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">4.1</span> Access and Update Information
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      You can access and update your personal information by logging into your account and editing
      your profile. If you need assistance, please contact our support team.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">4.2</span> Communication Preferences
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      You can manage your communication preferences by adjusting your settings in your account or
      unsubscribing from marketing emails. Note that even if you opt out of promotional emails, we
      may still send you important updates related to your account.
    </p>
    <h2 className="font-inter text-md cursor-pointer pt-5 text-left font-semibold text-blue-600">
      <span className="text-[#031136] opacity-50">4.3</span> Cookies and Tracking Technologies
    </h2>
    <p className="font-inter text-md pt-2 text-left font-normal text-[#031136] opacity-40">
      You can manage your cookie preferences through your browser settings. However, disabling
      cookies may affect your ability to use certain features of our platform.
    </p>
  </>
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
    <div className="mt-8">
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
