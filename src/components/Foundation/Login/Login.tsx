'use client';
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useFormik } from 'formik';
import Input from 'components/Project/Training_Exercise/CustomHOC/Input';

export const Default = (): JSX.Element => {
  const url = '/api/auth/login';
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      axios
        .post(
          url,
          { ...values },
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        )
        .then((res) => {
          res.data.success
            ? (window.alert('Successfully Logged in!! '), (window.location.href = '/'))
            : window.alert(res.data.data);
        })
        .catch((err) => {
          console.log('fetch error', err);
        });
    },
  });
  return (
    <div className="login-wrapper container font-Poppins">
      <div className="mx-auto mt-48 w-1/2 px-20 py-36 shadow-lg">
        <h1 className="mb-20 text-center text-7xl">Login</h1>
        <form className="relative flex flex-col " onSubmit={formik.handleSubmit}>
          <Input
            handleChange={formik.handleChange}
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
          />
          <Input
            handleChange={formik.handleChange}
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            className="mt-5"
          />
          <p className="mt-5 text-3xl font-light">
            Don't have an account ?
            <Link
              href={'/register'}
              className="ml-2 font-medium transition-all hover:text-blue-500"
            >
              Sign Up Now
            </Link>
          </p>
          <input
            type="submit"
            value="Login"
            className="mx-auto mt-5 w-1/3 cursor-pointer rounded-full bg-slate-900 px-3 py-2 text-3xl text-slate-100 hover:bg-slate-950"
          />
        </form>
      </div>
    </div>
  );
};
