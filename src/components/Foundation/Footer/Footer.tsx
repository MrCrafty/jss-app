import React from 'react';
import { AiOutlineInstagram, AiOutlineFacebook } from 'react-icons/ai';

export const Default = (): JSX.Element => {
  return (
    <div className="bg-neutral-900 py-14 font-Poppins">
      <div className="container mx-auto flex flex-row gap-6">
        <div className="w-1/4">
          <h3 className="mb-14 text-3xl uppercase text-white">Categories</h3>
          <ul className="flex flex-col gap-6 [&>li]:cursor-pointer [&>li]:transition-all">
            <li className="block text-xl text-neutral-400 hover:text-indigo-300">Accessories</li>
            <li className="text-xl text-neutral-400 hover:text-indigo-300">Men</li>
            <li className="text-xl text-neutral-400 hover:text-indigo-300">Kids</li>
            <li className="text-xl text-neutral-400 hover:text-indigo-300">Women</li>
          </ul>
        </div>
        <div className="w-1/4">
          <h3 className="mb-14 text-3xl uppercase text-white">Help</h3>
          <ul className="flex flex-col gap-6 [&>li]:cursor-pointer [&>li]:transition-all">
            <li className="text-xl text-neutral-400 hover:text-indigo-300">FAQs</li>
            <li className="text-xl text-neutral-400 hover:text-indigo-300">Returns</li>
            <li className="text-xl text-neutral-400 hover:text-indigo-300">Shipping</li>
            <li className="text-xl text-neutral-400 hover:text-indigo-300">Track Order</li>
          </ul>
        </div>
        <div className="w-1/4">
          <h3 className="mb-14 text-3xl uppercase text-white">Get in touch</h3>
          <ul className="flex flex-col gap-6">
            <li className="text-xl leading-loose text-neutral-400">
              Any ? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us
              on (+1) 96 716 6879
            </li>
            <li className="text-xl text-neutral-400">
              <ul className="flex gap-4 text-4xl">
                <li>
                  <AiOutlineInstagram className="cursor-pointer transition-all hover:text-indigo-400" />
                </li>
                <li>
                  <AiOutlineFacebook className="cursor-pointer transition-all hover:text-indigo-400" />
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="w-1/4">
          <h3 className="mb-14 text-3xl uppercase text-white">Newsletter</h3>
          <ul className="flex flex-col gap-6">
            <li>
              <input
                type="text"
                className="w-full border-b-2 border-neutral-600 bg-transparent px-2 pb-2 text-2xl text-white "
                placeholder="email@example.com"
              />
            </li>
            <li>
              <button className="w-max-[200px] rounded-full bg-indigo-500 px-16 py-3 text-2xl uppercase text-white transition-all hover:bg-white hover:text-indigo-500">
                subscribe
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div></div>
    </div>
  );
};
