"use client"; 

import React, { useState, ChangeEvent } from 'react';

const ContactUsPage = () => {
  const initialUserState = {
    Applicant_Name: '',
    Applicant_Email: '',
    Applicant_Contact: '',
    Message: ''
  };

  const [addUser, setAddUser] = useState(initialUserState);
  const [show, toggleShow] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddUser({
      ...addUser, [e.target.name]: e.target.value
    });
  };

  const AddUserContact = () => {
    toggleShow(true);
  };

  const Loader = () => {
    return (
      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mx-auto"></div>
    );
  };

  return (
    <>
      <div className='mt-20 mx-[9%]'>
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">Contact Us</h1>
        <div className="w-28 mt-1 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
          <div className="border-gray-600 border-b-2 rounded-lg"></div>
        </div>
        <div className="md:flex my-4">
          <div className="flex-1 py-4">
            <input 
              type="text" 
              className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
              placeholder='Your Name' 
              name='Applicant_Name' 
              onChange={onChange} 
              value={addUser.Applicant_Name} 
            />
            <input 
              type="text" 
              className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
              placeholder='Email' 
              name='Applicant_Email' 
              onChange={onChange} 
              value={addUser.Applicant_Email} 
            />
            <input 
              type="text" 
              className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
              placeholder='Phone' 
              name='Applicant_Contact' 
              onChange={onChange} 
              value={addUser.Applicant_Contact} 
            />
            <textarea 
              cols={30} 
              rows={4} 
              className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
              placeholder='Your Message' 
              name='Message' 
              onChange={onChange} 
              value={addUser.Message}
            ></textarea>
            <button 
              onClick={AddUserContact} 
              className="w-full inline-block px-8 py-[10px] mt-4 lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-4 font-semibold text-center text-md"
            >
              {show ? <Loader /> : "Submit"}
            </button>
          </div>
          <div className="flex-1 px-8">
            <h2 className="font-inter text-lg text-[#031136] text-left font-semibold pt-5">Reach Out Directly:</h2>
            <h3 className="font-inter text-md text-[#031136] text-left font-semibold pt-1">
              <i className="bi bi-envelope-at text-blue-600 mr-1"></i>
              Email: <span className='font-normal opacity-40'>contact@alanced.com</span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
