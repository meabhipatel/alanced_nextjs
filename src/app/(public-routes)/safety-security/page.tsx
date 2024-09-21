import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety and Security at Alanced",
  description:
    "The best platform for search and hire freelancer in the central india. let's have a tour of freelancers.",
};

const SafetySecurityPage: React.FC = () => {
  return (
    <div className="mx-[5%] mt-20 lg:mx-[9%]">
      <h1 className="font-cardo p-3 text-left text-2xl font-semibold text-blue-600 sm:text-3xl md:text-4xl">
        Safety and Security 
      </h1>
      <div className="relative mb-6 mt-1 w-48">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
      <div className="rounded-lg border-b-2 border-gray-600"></div>
    </div>

      <div className="font-inter sm:text-md space-y-4 text-left text-sm text-[#031136] md:text-lg">
        <p>
        At Alanced, we place the utmost importance on ensuring the safety and security of our users. Our mission is to provide a reliable platform where freelancers and clients can collaborate with confidence. 
        <br />Here are the key measures we implement to prioritize your security :
        </p>
        <h3 className="font-semibold">Secure Payment Systems:</h3>
        <p>
        We employ advanced encryption protocols and trusted payment gateways to protect your financial transactions. Your payment details are safeguarded at every stage of the process.
        </p>
        <h3 className="font-semibold">Data Privacy and Protection:</h3>
        <p>
        Your personal information is handled with the highest level of confidentiality. We adhere to stringent data protection regulations to ensure your information is secure from unauthorized access and misuse.
        </p>
        <h3 className="font-semibold">Verified User Base:</h3>
        <p>
        To maintain the integrity of our platform, we verify the identity of all users. This fosters a trusted community of professionals, ensuring a reliable and professional experience for freelancers and clients alike.
        </p>
        <h3 className="font-semibold">Dispute Resolution Mechanisms:</h3>
        <p>
        In the event of a dispute, our dedicated support team is available to facilitate a fair and transparent resolution process, ensuring equitable outcomes for all parties involved.
        </p>
        <h3 className="font-semibold">Continuous Security Monitoring:</h3>
        <p>
        Our platform undergoes constant monitoring and updates to proactively address potential security risks. This ongoing vigilance ensures a safe and secure environment for all users.
        </p>
        <p>
        At Alanced, we are committed to providing a secure and trustworthy platform so you can focus on what truly matters—building your freelance career or finding the right talent for your project
        </p>
        <p>Explore Alanced, one of the top freelance websites, for secure and professional freelance work opportunities.</p>
        <p className="font-semibold text-center text-lg">
        Alanced—where trust, integrity, and security come first.
        </p>
      </div>
    </div>
  );
};

export default SafetySecurityPage;
