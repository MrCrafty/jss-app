import Link from 'next/link';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

const UserAccountButtons = (props: {
  IsLogin: boolean;
  handleLogout: () => void;
  currentPage: string;
  SideBarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const [UserLogin, setUserLogin] = useState(props.IsLogin);
  useEffect(() => {
    setUserLogin(props.IsLogin);
  }, [props.IsLogin]);
  return UserLogin ? (
    <ul className="flex gap-3 [&>li]:text-2xl">
      <li>
        <button
          onClick={() => {
            props.handleLogout();
          }}
          className={`flex cursor-pointer items-center border-[1px] border-slate-600 px-3 py-2  transition-all hover:bg-slate-700 hover:text-white `}
        >
          Logout
          <BsArrowRight className="inline-block" />
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            props.setSideBarOpen(!props.SideBarOpen);
          }}
          className={`flex cursor-pointer items-center border-[1px] border-slate-600 px-3 py-2  transition-all hover:bg-slate-700 hover:text-white `}
        >
          Cart
        </button>
      </li>
    </ul>
  ) : (
    <ul className="flex gap-5">
      <li>
        <Link
          href={'/login'}
          className={`flex cursor-pointer items-center border-[1px] border-slate-600 px-3 py-2  transition-all hover:bg-slate-700 hover:text-white ${
            props.currentPage == '/login' ? 'cursor-default bg-slate-700 text-white' : ''
          }`}
        >
          Login
          <BsArrowRight className="inline-block" />
        </Link>
      </li>
      <li>
        <Link
          href={'/register'}
          className={`flex cursor-pointer items-center border-[1px] border-slate-600 px-3 py-2  transition-all hover:bg-slate-700 hover:text-white ${
            props.currentPage == '/register' ? 'cursor-default bg-slate-700 text-white' : ''
          }`}
        >
          Register
          <BsArrowRight className="inline-block" />
        </Link>
      </li>
    </ul>
  );
};
export default UserAccountButtons;
