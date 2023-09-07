import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { useFormik } from 'formik';
import axios from 'axios';
import Input from 'components/Project/Training_Exercise/CustomHOC/Input';
import * as Yup from 'yup';
import Link from 'next/link';

interface RegisterUserProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: RegisterUserProps): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      Password: '',
      ConfirmPassword: '',
      Username: '',
    },
    validationSchema: Yup.object({
      Username: Yup.string()
        .min(1, 'Username should of min 1 character')
        .max(50, 'Username should of max 50 characters')
        .required('Please enter Username'),
      FirstName: Yup.string()
        .min(1, 'Firstname should of min 1 character')
        .max(50, 'Firstname should of max 50 characters')
        .required('Please enter Firstname'),
      LastName: Yup.string()
        .min(1, 'Lastname should of min 1 character')
        .max(50, 'Lastname should of max 50 characters')
        .required('Please enter Lastname'),
      Password: Yup.string()
        .min(8, 'Password should of min 8 character')
        .max(30, 'Password should of max 30 characters')
        .required('Please enter Lastname'),
      EmailAddress: Yup.string()
        .min(1, 'Firstname should of min 1 character')
        .max(50, 'Firstname should of max 50 characters')
        .required('Please enter Firstname')
        .email('Please enter a valid email address'),
    }),
    onSubmit: (values) => {
      if (formik.values.Password != formik.values.ConfirmPassword) {
        alert('The passwords do not match, please enter again');
      } else {
        axios
          .post('/api/auth/register', { ...values })
          .then(() => {
            alert('User Successfully registerd, Please login to continue');
            window.location.href = '/login';
          })
          .catch((err) => {
            console.log('Register::RegisterError', err);
            alert('Error');
          });
      }
    },
  });
  return (
    <div className="container font-Poppins">
      <div className="mx-auto mt-48 w-1/2 px-20 py-36 shadow-lg">
        <h2 className="mb-20 text-center text-7xl">Register</h2>
        <form onSubmit={formik.handleSubmit} className="mt-5 flex flex-col gap-y-5">
          <Input
            handleChange={formik.handleChange}
            label="Username"
            name="Username"
            type="text"
            value={formik.values.Username}
          />
          <Input
            handleChange={formik.handleChange}
            label="First Name"
            name="FirstName"
            type="text"
            value={formik.values.FirstName}
          />
          <Input
            handleChange={formik.handleChange}
            label="Last Name"
            name="LastName"
            type="text"
            value={formik.values.LastName}
          />
          <Input
            handleChange={formik.handleChange}
            label="Email"
            name="EmailAddress"
            type="email"
            value={formik.values.EmailAddress}
          />
          <Input
            handleChange={formik.handleChange}
            label="Password"
            name="Password"
            type="password"
            value={formik.values.Password}
          />
          <Input
            handleChange={formik.handleChange}
            label="Confirm Password"
            name="ConfirmPassword"
            type="password"
            value={formik.values.ConfirmPassword}
          />
          <p className="mt-5 text-3xl font-light">
            Already have an account ?
            <Link href={'/login'} className="ml-2 font-medium transition-all hover:text-blue-500">
              Login Now
            </Link>
          </p>
          <input
            type="submit"
            value={'Sign Up'}
            className="mx-auto w-1/3 rounded-full bg-black px-5 py-3 text-white"
          />
        </form>
      </div>
    </div>
  );
};
