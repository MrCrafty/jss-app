import React, { useState } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BiSolidPhone } from 'react-icons/bi';
import { LuMail } from 'react-icons/lu';

interface ContactUsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ContactUsProps): JSX.Element => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  function handleFormSubmit() {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="contactus-wrapper container mx-auto mt-5 flex font-Poppins">
      <div className="flex w-1/2 flex-col gap-4 border border-slate-300 px-16 py-24">
        <h3 className="text-center text-4xl">Send Us a Message</h3>
        <div className="my-5 flex flex-col gap-4">
          <div className="relative flex flex-col">
            <input
              type="text"
              name="firstName"
              min={1}
              max={50}
              className="peer border border-slate-300 p-3 text-3xl"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <label
              htmlFor="firstName"
              className={`absolute ${
                firstName == '' ? 'top-1/2 text-2xl text-gray-400' : 'top-0 text-2xl text-gray-700'
              } ml-5 -translate-y-1/2 bg-white px-1  transition-all peer-focus-visible:top-0 peer-focus-visible:text-2xl peer-focus-visible:text-gray-700`}
            >
              First Name
            </label>
          </div>
          <div className="relative flex flex-col">
            <input
              type="text"
              name="lastName"
              min={1}
              max={50}
              className="peer border border-slate-300 p-3 text-3xl"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <label
              htmlFor="lastName"
              className={`absolute ${
                lastName == '' ? 'top-1/2 text-2xl text-gray-400' : 'top-0 text-2xl text-gray-700'
              } ml-5 -translate-y-1/2  bg-white px-1 text-gray-400 transition-all peer-focus-visible:top-0 peer-focus-visible:text-2xl peer-focus-visible:text-gray-700`}
            >
              Last Name
            </label>
          </div>
          <div className="relative flex flex-col">
            <input
              type="email"
              name="email"
              min={1}
              max={50}
              className="peer border border-slate-300 p-3 text-3xl"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label
              htmlFor="email"
              className={`absolute ${
                email == '' ? 'top-1/2 text-2xl text-gray-400' : 'top-0 text-2xl text-gray-700'
              } ml-5 -translate-y-1/2  bg-white px-1 text-gray-400 transition-all peer-focus-visible:top-0 peer-focus-visible:text-2xl peer-focus-visible:text-gray-700`}
            >
              Email Address
            </label>
          </div>
          <div className="relative mb-4 flex flex-col">
            <textarea
              name="message"
              className="peer border border-slate-300 p-3 text-3xl"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <label
              htmlFor="message"
              className={`absolute ${
                message == '' ? 'top-1/2 text-2xl text-gray-400' : 'top-0 text-2xl text-gray-700'
              } ml-5 -translate-y-1/2  bg-white px-1 text-gray-400 transition-all peer-focus-visible:top-0 peer-focus-visible:text-2xl peer-focus-visible:text-gray-700`}
            >
              How can we help you ?
            </label>
          </div>
          <input
            type="submit"
            value={'SUBMIT'}
            className=" mx-auto w-1/2 min-w-[100px] rounded-full bg-black py-2 font-medium text-white"
            onClick={() => {
              handleFormSubmit();
            }}
          />
        </div>
      </div>
      <div className="flex w-1/2 flex-col justify-center gap-20 border border-slate-300 pl-32 pr-44">
        <div className="flex">
          <div className="mr-5">
            <FaMapMarkerAlt className="text-3xl" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-3xl">Address</div>
            <div className="mt-3 text-2xl text-slate-400">
              Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="mr-5">
            <BiSolidPhone className="text-3xl" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-3xl">Lets Talk</div>
            <div className="mt-3 text-2xl text-slate-400">+1 800 1236879</div>
          </div>
        </div>
        <div className="flex">
          <div className="mr-5">
            <LuMail className="text-3xl" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-3xl">Sale Support</div>
            <div className="mt-3 text-2xl text-slate-400">contact@example.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};
