'use client';
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export const Default = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const url = '/api/auth/login';
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const content = {
      email: email,
      password: password,
    };
    axios
      .post(url, content, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        res.data.success
          ? (window.alert('Successfully Logged in!! '), (window.location.href = '/'))
          : window.alert(res.data.data);
      })
      .catch((err) => {
        console.log('fetch error', err);
      });
  };
  return (
    <div className="login-wrapper container font-Poppins">
      <div className="mx-auto mt-48 w-1/2 px-20 py-36 shadow-lg">
        <h1 className="mb-20 text-center text-6xl">Login</h1>
        <form
          className="relative flex flex-col "
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          <div className="relative flex flex-col">
            <input
              type="email"
              className="peer border border-black p-3 text-4xl"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label
              htmlFor="email"
              className={`absolute ${
                email == '' ? 'top-1/2 text-4xl' : 'top-0 text-3xl text-gray-700'
              } ml-5 -translate-y-1/2  bg-white px-1  text-gray-400 transition-all peer-focus-visible:top-0 peer-focus-visible:text-3xl peer-focus-visible:text-gray-700`}
            >
              Email
            </label>
          </div>
          <div className="relative mt-5 flex flex-col">
            <input
              type="password"
              className="peer border border-black p-3"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label
              htmlFor="password"
              className={`absolute ${
                password == '' ? 'top-1/2 text-4xl' : 'top-0 text-3xl text-gray-700'
              } ml-5 -translate-y-1/2  bg-white px-1 text-gray-400 transition-all peer-focus-visible:top-0 peer-focus-visible:text-3xl peer-focus-visible:text-gray-700`}
            >
              Password
            </label>
          </div>
          <p className="mt-5 text-3xl font-light ">
            Don't have an account ?{' '}
            <Link href={'/register'} className="font-medium transition-all hover:text-blue-500">
              Register Now
            </Link>
          </p>
          <input
            type="submit"
            value="Login"
            className="mx-auto mt-5 w-3/12 bg-slate-900 px-3 py-2 text-3xl text-slate-100 hover:bg-slate-950"
          />
        </form>
      </div>
    </div>
  );
};
