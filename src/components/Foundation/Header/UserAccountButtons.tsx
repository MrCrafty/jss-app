import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

const UserAccountButtons = (props: {
  IsLogin: boolean;
  handleLogout: () => void;
  currentPage: string;
}): JSX.Element => {
  const [UserLogin, setUserLogin] = useState(props.IsLogin);
  useEffect(() => {
    setUserLogin(props.IsLogin);
  }, [props.IsLogin]);
  return UserLogin ? (
    <li>
      <button
        onClick={() => {
          props.handleLogout();
        }}
        className={`flex cursor-pointer items-center border-[1px] border-slate-600 px-3 py-2 text-2xl transition-all hover:bg-slate-700 hover:text-white `}
      >
        Logout
        <BsArrowRight className="inline-block" />
      </button>
    </li>
  ) : (
    <li>
      <Link
        href={'/login'}
        className={`flex cursor-pointer items-center border-[1px] border-slate-600 px-3 py-2 text-2xl transition-all hover:bg-slate-700 hover:text-white ${
          props.currentPage == '/login' ? 'cursor-default bg-slate-700 text-white' : ''
        }`}
      >
        Login
        <BsArrowRight className="inline-block" />
      </Link>
    </li>
  );
};
export default UserAccountButtons;
