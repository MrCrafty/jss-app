import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BiSolidPhone } from 'react-icons/bi';
import { LuMail } from 'react-icons/lu';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export const Default = (): JSX.Element => {
  const url = '/api/forms/contactform';
  const formik = useFormik({
    initialValues: {
      FirstName: '',
      LastName: '',
      Email: '',
      Message: '',
    },
    onSubmit: (values) => {
      axios
        .post(url, { ...values })
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log('contactform', err);
        });
    },
    validationSchema: Yup.object({
      FirstName: Yup.string()
        .max(20, 'FirstName Should be 20 characters max')
        .min(1, 'FirstName should be atleast 1 character')
        .required('FirstName is Required'),
      LastName: Yup.string()
        .max(20, 'LastName Should be 20 characters max')
        .min(1, 'LastName should be atleast 1 character')
        .required('LastName is Required'),
      Email: Yup.string().email('Invalid Email address').required('Email is required'),
      Message: Yup.string()
        .max(150, 'Message should of 150 character')
        .min(1, 'Please enter Message'),
    }),
  });

  return (
    <div className="contactus-wrapper container mx-auto mt-10 flex font-Poppins">
      <div className="flex w-1/2 flex-col gap-4 border border-slate-300 px-16 py-24">
        <h3 className="text-center text-4xl">Send Us a Message</h3>
        <form onSubmit={formik.handleSubmit} className="my-5 flex flex-col gap-7">
          <div className="relative flex flex-col">
            <input
              type="text"
              name="FirstName"
              min={1}
              max={50}
              className="peer border border-slate-300 p-3 text-3xl"
              onChange={formik.handleChange}
              value={formik.values.FirstName}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="firstName"
              className={`absolute ${
                formik.values.FirstName == ''
                  ? 'top-1/2 text-2xl text-gray-400'
                  : 'top-0 text-xl text-gray-700'
              } ml-5 -translate-y-1/2 bg-white px-1  transition-all after:text-red-500 after:content-["*"] peer-focus-visible:top-0 peer-focus-visible:text-xl peer-focus-visible:text-gray-700`}
            >
              First Name
            </label>
          </div>
          <div className="relative flex flex-col">
            <input
              type="text"
              name="LastName"
              min={1}
              max={50}
              className="peer border border-slate-300 p-3 text-3xl"
              onChange={formik.handleChange}
              value={formik.values.LastName}
            />
            <label
              htmlFor="lastName"
              className={`absolute ${
                formik.values.LastName == ''
                  ? 'top-1/2 text-2xl text-gray-400'
                  : 'top-0 text-xl text-gray-700'
              } ml-5 -translate-y-1/2  bg-white px-1 text-gray-400 transition-all after:text-red-500 after:content-["*"] peer-focus-visible:top-0 peer-focus-visible:text-xl peer-focus-visible:text-gray-700`}
            >
              Last Name
            </label>
          </div>
          <div className="relative flex flex-col">
            <input
              type="email"
              name="Email"
              min={1}
              max={50}
              className="peer border border-slate-300 p-3 text-3xl"
              onChange={formik.handleChange}
              value={formik.values.Email}
            />
            <label
              htmlFor="email"
              className={`absolute ${
                formik.values.Email == ''
                  ? 'top-1/2 text-2xl text-gray-400'
                  : 'top-0 text-xl text-gray-700'
              } ml-5 -translate-y-1/2  bg-white px-1 text-gray-400 transition-all after:text-red-500 after:content-["*"] peer-focus-visible:top-0 peer-focus-visible:text-xl peer-focus-visible:text-gray-700`}
            >
              Email Address
            </label>
          </div>
          <div className="relative mb-4 flex flex-col">
            <textarea
              name="Message"
              className="peer border border-slate-300 p-3 text-3xl"
              onChange={formik.handleChange}
              value={formik.values.Message}
            />
            <label
              htmlFor="message"
              className={`absolute ${
                formik.values.Message == ''
                  ? 'top-1/2 text-2xl text-gray-400'
                  : 'top-0 text-xl text-gray-700'
              } ml-5 -translate-y-1/2  bg-white px-1 text-gray-400 transition-all after:text-red-500 after:content-["*"] peer-focus-visible:top-0 peer-focus-visible:text-xl peer-focus-visible:text-gray-700`}
            >
              How can we help you ?
            </label>
          </div>
          <input
            type="submit"
            value={'SUBMIT'}
            className=" mx-auto w-1/2 min-w-[100px] cursor-pointer rounded-full bg-black py-2 font-medium text-white"
          />
        </form>
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
