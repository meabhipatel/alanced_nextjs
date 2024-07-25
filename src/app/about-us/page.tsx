import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="mx-[5%] mt-20 lg:mx-[9%]">
      <h1 className="font-cardo p-3 text-left text-2xl font-semibold text-blue-600 sm:text-3xl md:text-4xl">
        About Us
      </h1>
      <div className="relative mb-6 mt-1 w-48">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
        <div className="rounded-lg border-b-2 border-gray-600"></div>
      </div>
      <h2 className="font-inter mb-4 text-left text-lg font-semibold text-[#031136] md:text-xl">
        Welcome to Alanced: Empowering Freelancers Worldwide
      </h2>
      <div className="font-inter text-md space-y-6 text-left text-[#031136] md:text-lg">
        <p>
          At Alanced, we are dedicated to revolutionizing the freelance industry by providing a
          robust platform where talent meets opportunity. Our mission is to empower freelancers of
          all backgrounds to thrive in their careers, offering a diverse range of projects and
          resources to support their professional growth.
        </p>
        <p className="font-semibold">Why Choose Alanced?</p>
        <ul className="list-inside list-disc space-y-4">
          <li>
            <span className="font-semibold">Diverse Opportunities:</span> Explore a wide array of
            freelance projects across various industries and skill sets. Whether you specialize in
            creative arts, technology, business consulting, or any other field, you&apos;ll find
            exciting opportunities to showcase your expertise.
          </li>
          <li>
            <span className="font-semibold">Secure and Efficient:</span> We prioritize your security
            and convenience with a seamless payment system and user-friendly interface. Manage your
            projects effortlessly, communicate with clients, and receive payments securely—all
            within the Alanced platform.
          </li>
          <li>
            <span className="font-semibold">Community Support:</span> Join a vibrant community of
            freelancers where collaboration and learning thrive. Connect with like-minded
            professionals, share insights, and build valuable relationships that enhance your
            freelance journey.
          </li>
          <li>
            <span className="font-semibold">Empowering Freelancers:</span> At Alanced, we believe in
            empowering freelancers to take control of their careers. Whether you&apos;re starting
            your freelance journey or looking to expand your client base, our platform provides the
            tools and support you need to succeed.
          </li>
        </ul>
        <p className="font-semibold">Join the Alanced Community</p>
        <p>
          Join thousands of freelancers who have already discovered the benefits of Alanced. Take
          the next step in your freelance career and experience the freedom and opportunities that
          await you. Sign up today and embark on a journey of growth and success with Alanced.
        </p>
        <p className="text-center font-semibold">
          Empowerment. Opportunity. Success. Welcome to Alanced, where your freelance future begins.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
