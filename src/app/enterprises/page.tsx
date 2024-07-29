"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import girlimg from '@/assets/images/enterprisesgirl.png';
import menImage from '@/assets/images/enterprisesman.png';
import womenTalk from '@/assets/images/WomanTalk.png';


const Enterprises = () => {
  return (
    <>
      <div className="px-5 lg:px-32 mt-10">
        <div className="flex flex-col-reverse md:flex-row border border-gray-200 rounded-lg border-opacity-50 bg-[#dcf7ea]">
          <div className="basis-6/12 md:mt-8 p-3 md:pl-8 text-left">
            <h1 className="font-bold text-[22px] text-blue-700">Alanced</h1>
            <div className="w-20 mt-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
              <div className="border-gray-600 border-b-2 rounded-lg"></div>
            </div>
            <h1 className="text-[35px] mt-5 font-semibold text-blue-600">Your Trusted</h1>
            <h1 className="text-[28px] font-semibold text-blue-600">Partner For Design And</h1>
            <h1 className="text-[28px] font-semibold text-blue-600">Web Development.</h1>
            <p className="font-normal text-[16px] mt-8 opacity-50">
              Count on us for ongoing maintenance and support, <br />
              ensuring your website stays secure.
            </p>
            <Link href="/signup" onClick={() => window.scroll(0, 0)}>
              <span className="inline-block text-sm px-4 py-[10px] mt-8 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-2 font-semibold ml-8">
              Let&apos;s Connect
              </span>
            </Link>
          </div>
          <div className="basis-6/12">
          <Image
              src={girlimg}
              alt="girl-image"
              layout="responsive"
              className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg md:rounded-tl-none md:rounded-br-lg"
            />
          </div>
        </div>

        <div>
        <div className="flex justify-center">
        <h1 className="text-[30px] font-semibold mt-5">Key Features</h1>
        </div>
          <div className="w-24 mt-1 relative mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
            <div className="border-gray-600 border-b-2 rounded-lg"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-10">
            <div className="basis-3/12 border border-blue-200 rounded-lg border-opacity-50 p-3 shadow-md bg-[#daf6f8]">
              <div className="text-left text-2xl">
                <i className="bi bi-boxes"></i>
              </div>
              <h1 className="text-[26px] text-left mt-2">Talent</h1>
              <p className="text-[18px] text-left mt-3">
                Unleash our exceptional talent to fuel your project&apos;s success.
              </p>
              <div className="text-left mt-3">
                <Link href="/search-freelancer" onClick={() => window.scroll(0, 0)}>
                  <span className="inline-block text-sm px-4 py-[10px] mt-4 lg:mt-0 bg-[#84d6fc] border rounded border-none text-white mr-2 font-semibold">
                    View Features
                  </span>
                </Link>
              </div>
            </div>
            <div className="basis-3/12 border border-blue-200 rounded-lg border-opacity-50 p-3 shadow-md bg-[#e6ebfc]">
              <div className="text-left text-2xl">
                <i className="bi bi-shield-lock"></i>
              </div>
              <h1 className="text-[26px] text-left mt-2">Security</h1>
              <p className="text-[18px] text-left mt-3">
                Protecting your digital assets with state-of-the-art security solutions.
              </p>
              <div className="text-left mt-3">
                <Link href="/safety-security" onClick={() => window.scroll(0, 0)}>
                  <span className="inline-block text-sm px-4 py-[10px] mt-4 lg:mt-0 bg-[#c2b4fc] border rounded border-none text-white mr-2 font-semibold">
                    View Features
                  </span>
                </Link>
              </div>
            </div>
            <div className="basis-3/12 border border-blue-200 rounded-lg border-opacity-50 p-3 shadow-md bg-[#e3f7e9]">
              <div className="text-left text-2xl">
                <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
              </div>
              <h1 className="text-[26px] text-left mt-2">Work</h1>
              <p className="text-[18px] text-left mt-3">
                Your go-to partner for exceptional web development and design.
              </p>
              <div className="text-left mt-3">
                <Link href="/about-us" onClick={() => window.scroll(0, 0)}>
                  <span className="inline-block text-sm px-4 py-[10px] mt-4 lg:mt-0 bg-[#96dbb7] border rounded border-none text-white mr-2 font-semibold">
                    View Features
                  </span>
                </Link>
              </div>
            </div>
            <div className="basis-3/12 border border-blue-200 rounded-lg border-opacity-50 p-3 shadow-md bg-[#f5f5f4]">
              <div className="text-left text-2xl">
                <i className="bi bi-geo-alt"></i>
              </div>
              <h1 className="text-[26px] text-left mt-2">Centralized Hub</h1>
              <p className="text-[18px] text-left mt-3">
                A centralized hub is a single point of control or coordination.
              </p>
              <div className="text-left mt-3">
                <Link href="/" onClick={() => window.scroll(0, 0)}>
                  <span className="inline-block text-sm px-4 py-[10px] mt-4 lg:mt-0 bg-[#cacab9] border rounded border-none text-white mr-2 font-semibold">
                    View Features
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-8 md:mt-16 border border-gray-200 rounded-lg border-opacity-50">
          <div className="basis-6/12">
          <Image
            src={menImage}
            alt="men-image"
            layout="responsive"
            className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg"
          />
          </div>
          <div className="basis-6/12 md:mt-8 p-3 md:pl-8 text-left">
            <h1 className="text-[30px] font-semibold">How It Works</h1>
            <div className="w-20 mt-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
              <div className="border-gray-600 border-b-2 rounded-lg"></div>
            </div>
            <h1 className="text-[25px] mt-5 font-semibold">Client</h1>
            <p className="font-normal text-[16px] mt-4 opacity-50">
              The client uses the web-based user interface of the system to enter the required data.
            </p>
            <h1 className="text-[25px] mt-4 font-semibold">System</h1>
            <p className="font-normal text-[16px] mt-4 opacity-50">
              The system processes the entered data, performs necessary calculations or checks, and stores the results.
            </p>
            <h1 className="text-[25px] mt-4 font-semibold">Output</h1>
            <p className="font-normal text-[16px] mt-4 opacity-50">
              The system provides feedback to the client through the web-based user interface, showing the results of the processed data.
            </p>
            <Link href="/signup" onClick={() => window.scroll(0, 0)}>
              <span className="inline-block text-sm px-4 py-[10px] mt-8 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-2 font-semibold ml-8">
                Let&apos;s Connect
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-16 border border-gray-200 rounded-lg border-opacity-50 bg-[#e9e7f9]">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="basis-6/12 md:mt-8 p-3 md:pl-8 text-left">
              <h1 className="font-semibold text-[25px] text-blue-700">What are you waiting for?</h1>
              <div className="w-20 mt-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
                <div className="border-gray-600 border-b-2 rounded-lg"></div>
              </div>
              <h1 className="text-[30px] mt-5 font-semibold text-blue-600">Take the first step</h1>
              <h1 className="text-[30px] font-semibold text-blue-600">towards a brighter future</h1>
              <p className="font-normal text-[16px] mt-8 opacity-50">
                Don&apos;t delay, take the first step towards a brighter future by joining our platform and discovering endless possibilities for your projects.
              </p>
              <Link href="/signup" onClick={() => window.scroll(0, 0)}>
                <span className="inline-block text-sm px-4 py-[10px] mt-8 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-2 font-semibold ml-8">
                  Let&apos;s Connect
                </span>
              </Link>
            </div>
            <div className="basis-6/12">
            <Image
            src={womenTalk}
            alt="women-talk"
            layout="responsive"
            className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enterprises;
