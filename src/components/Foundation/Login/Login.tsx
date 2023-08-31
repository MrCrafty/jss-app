'use client';
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Default = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const content = JSON.stringify({
      email: email,
      password: password,
    });
    const res = await fetch('https://square-termite-set.ngrok-free.app/api/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': content.length.toString(),
        'access-control-allow-origin': '*',
      },
      body: content,
    });
    const data = await res.json();
    console.log('data', await res.json());
    data.success ? router.push('/') : window.alert(data.message);
  };
  return (
    <div className="login-wrapper container">
      <div className="mx-auto mt-5 w-1/2 p-5 shadow-lg">
        <form
          className="relative flex flex-col"
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
                email == '' ? 'top-1/2 text-4xl' : 'top-0 text-3xl'
              } ml-5 -translate-y-1/2  bg-white px-1 transition-all peer-focus-visible:top-0 peer-focus-visible:text-3xl`}
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
                password == '' ? 'top-1/2 text-4xl' : 'top-0 text-3xl'
              } ml-5 -translate-y-1/2  bg-white px-1 transition-all peer-focus-visible:top-0 peer-focus-visible:text-3xl`}
            >
              Password
            </label>
          </div>
          <p className="mt-5 text-3xl font-light transition-all">
            Don't have an account ?{' '}
            <Link href={'/register'} className="font-medium hover:text-blue-500">
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
