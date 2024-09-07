import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The best platform for searching and hiring freelancers in Central India. Explore our freelancers today.",
};

const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto my-10 max-w-6xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-blue-600 sm:text-4xl md:text-5xl mb-4">
        About Us
      </h1>
      <div className="relative mb-6 mt-1 w-48">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
        <div className="rounded-lg border-b-2 border-gray-600"></div>
      </div>
      <h2 className="text-2xl font-semibold text-[#031136] mb-4">
        Welcome to Alanced: Empowering Freelancers Worldwide
      </h2>
      <div className="space-y-6 text-[#031136] text-lg leading-relaxed">
        <p>
          At Alanced, we are committed to revolutionizing the freelance industry by providing one of the best platforms where talent meets opportunity. Whether you&apos;re searching for freelance work or seeking top websites for professional growth, Alanced is your go-to platform. We empower freelancers from all backgrounds by offering diverse projects and resources to help you excel in your career. Explore freelance jobs and discover new possibilities with Alanced—your trusted partner in freelance work.
        </p>
        <p className="font-semibold text-lg">Why Choose Alanced for Remote Jobs?</p>
        <ul className="list-disc list-inside space-y-4">
          <li>
            <span className="font-semibold">Varied Opportunities:</span> Find freelance projects that match your skills and interests across a wide range of industries. Whether you&apos;re a creative professional, tech expert, or business consultant, Alanced has opportunities that let you put your talents to work.
          </li>
          <li>
            <span className="font-semibold">Safe and Simple:</span> We ensure you can work without worry. With a secure payment system and easy-to-use platform, you can focus on your projects while managing your work, communicating with clients, and getting paid—all in one place.
          </li>
          <li>
            <span className="font-semibold">Supportive Community:</span> Join a welcoming community of freelancers where you can collaborate, share knowledge, and build connections. Surround yourself with like-minded professionals who are eager to support each other&apos;s freelance journeys.
          </li>
          <li>
            <span className="font-semibold">Freelancers in Control:</span> Alanced is all about helping freelancers succeed. Whether you&apos;re just starting out or looking to grow your client base, our platform gives you the tools and resources to take control of your freelance career and thrive.
          </li>
        </ul>
        <p className="font-semibold text-lg">Become a Part of the Alanced Community</p>
        <p>
          Join the growing number of freelancers who have unlocked new opportunities with Alanced. Elevate your freelance career by becoming part of a community that values growth, freedom, and success. Sign up today to start your journey toward a brighter future with Alanced, your best remote work portal.
        </p>
        <p className="text-center font-semibold text-lg mt-6">
          Empowerment. Opportunity. Achievement. Welcome to Alanced, where your freelance journey takes off.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
