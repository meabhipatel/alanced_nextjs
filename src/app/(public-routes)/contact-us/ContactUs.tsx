"use client";

import React, { useState, ChangeEvent } from "react";

const ContactUs = () => {
  const initialUserState = {
    Applicant_Name: "",
    Applicant_Email: "",
    Applicant_Contact: "",
    Message: "",
  };

  const [addUser, setAddUser] = useState(initialUserState);
  const [show, toggleShow] = useState(false);
  const [error, setError] = useState(""); // State to manage validation errors

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddUser({
      ...addUser,
      [e.target.name]: e.target.value,
    });
  };

  const AddUserContact = () => {
    // Basic validation
    if (
      !addUser.Applicant_Name ||
      !addUser.Applicant_Email ||
      !addUser.Applicant_Contact ||
      !addUser.Message
    ) {
      setError("Please fill out all fields.");
      return;
    }

    // Simulate form submission
    toggleShow(true);
    setError(""); // Clear previous errors

    setTimeout(() => {
      alert("Your data has been submitted successfully!");
      setAddUser(initialUserState); // Clear the form
      toggleShow(false); // Hide loader
    }, 2000); // Simulate a delay for form submission
  };

  const Loader = () => {
    return (
      <div className="mx-auto h-4 w-4 animate-spin rounded-full border-t-2 border-white"></div>
    );
  };

  return (
    <div className="container mt-20 sm:px-5 md:px-10 lg:px-20">
      <div className="font-cardo p-3 text-left text-[28px] font-normal text-blue-600">
        Contact Us
      </div>
      <div className="relative mt-1 w-40">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
        <div className="rounded-lg border-b-2 border-gray-600"></div>
      </div>
      <div className="my-4 md:flex md:justify-between">
        <div className="flex-1 py-4">
          {error && <div className="mb-4 rounded-md bg-red-100 p-3 text-red-800">{error}</div>}
          <input
            type="text"
            className="my-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Your Name"
            name="Applicant_Name"
            onChange={onChange}
            value={addUser.Applicant_Name}
          />
          <input
            type="text"
            className="my-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Email"
            name="Applicant_Email"
            onChange={onChange}
            value={addUser.Applicant_Email}
          />
          <input
            type="text"
            className="my-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Phone"
            name="Applicant_Contact"
            onChange={onChange}
            value={addUser.Applicant_Contact}
          />
          <textarea
            cols={30}
            rows={4}
            className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Your Message"
            name="Message"
            onChange={onChange}
            value={addUser.Message}
          ></textarea>
          <button
            onClick={AddUserContact}
            className="text-md mr-4 mt-4 inline-block w-full rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-8 py-[10px] text-center font-semibold text-white lg:mt-0"
          >
            {show ? <Loader /> : "Submit"}
          </button>
        </div>
        <div className="flex-1 px-8">
          <div className="font-inter pt-5 text-left text-lg font-semibold text-[#031136]">
            Reach Out Directly:
          </div>
          <h1 className="font-inter text-md pt-1 text-left font-semibold text-[#031136]">
            <i className="bi bi-envelope-at mr-1 text-blue-600"></i>
            Email: <span className="font-normal opacity-80">contact@alanced.com</span>
          </h1>
          <h2 className="font-inter text-md pt-1 text-left font-semibold text-[#031136]">
            <i className="bi bi-telephone mr-1 text-blue-600"></i>
            Phone: <span className="font-normal opacity-80">0731-4100910</span>
          </h2>
          <h3 className="font-inter text-md pt-1 text-left font-semibold text-[#031136]">
            <i className="bi bi-geo-alt mr-1 text-blue-600"></i>
            Address:{" "}
            <span className="font-normal opacity-80">
              202, Krishna Classic, Phadnis Colony Above AXIS Bank, AB Road Indore M P, 452001,
              India
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
