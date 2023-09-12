import React, { useEffect, useState } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  Image,
  ImageField,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserAccountButtons from './UserAccountButtons';
import { FaXmark } from 'react-icons/fa6';

interface Fields {
  Title: Field<string>;
}

export interface Links {
  displayName: string;
  id: string;
  name: string;
  url: string;
  fields: Fields;
}

export interface HeaderProps {
  rendering?: ComponentRendering & { params: ComponentParams };
  params?: ComponentParams;
  fields: {
    Logo: ImageField;
    NavigationLinks: Links[];
  };
}

export const Default = ({ fields }: HeaderProps): JSX.Element => {
  const router = useRouter();
  const currentPage = router.asPath;
  const [IsLogin, setIsLogin] = useState<boolean>(true);
  const [SideBarOpen, setSideBarOpen] = useState(false);

  const bodyScrollLock = () => {
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
  };
  const bodyScrollUnlock = () => {
    document.body.style.removeProperty('height');
    document.body.style.removeProperty('overflow');
  };

  useEffect(() => {
    SideBarOpen ? bodyScrollLock() : bodyScrollUnlock();
  }, [SideBarOpen]);

  useEffect(() => {
    axios.get('/api/auth/IsLogin').then((data) => {
      setIsLogin(data.data.IsLogin);
    });
  }, []);
  const handleLogout = () => {
    axios.post('/api/auth/logout').then(() => {
      ('');
    });
    window.location.href = '/login';
  };
  return (
    <div className="relative font-Poppins">
      <div className="main-nav relative z-10 bg-zinc-50">
        <nav className="container  mx-auto flex justify-between bg-zinc-50 py-5">
          <div className="my-auto w-auto">
            <Link href={'/'}>
              <Image field={fields.Logo} className="w-full" />
            </Link>
          </div>
          <ul className="flex flex-row items-center gap-5 font-Poppins text-2xl">
            {fields?.NavigationLinks?.map((element, index) => {
              return (
                <li className="nav-item" key={index}>
                  {
                    <Link
                      href={element.url}
                      className={` text-black transition-all ${
                        element.url == currentPage
                          ? 'cursor-default text-4xl font-extrabold hover:text-black'
                          : 'hover:text-blue-500'
                      }`}
                    >
                      <Text field={element.fields.Title} />
                    </Link>
                  }
                </li>
              );
            })}
            {
              <UserAccountButtons
                handleLogout={handleLogout}
                IsLogin={IsLogin}
                currentPage={currentPage}
                SideBarOpen={SideBarOpen}
                setSideBarOpen={setSideBarOpen}
              />
            }
          </ul>
        </nav>
      </div>
      <div
        onClick={() => {
          setSideBarOpen(!SideBarOpen);
        }}
        className={`sidebar absolute left-0 top-0 z-20 ${
          SideBarOpen ? 'w-full' : 'hidden'
        } h-screen bg-black opacity-60`}
      ></div>
      <div
        className={`sidebar absolute right-0 top-0 z-20 overflow-hidden transition-all ${
          SideBarOpen ? 'w-3/12 ' : 'w-0'
        } h-screen bg-black`}
      >
        <div className="sidebar-head flex justify-end p-5">
          <FaXmark
            className="cursor-pointer text-5xl text-white"
            onClick={() => {
              setSideBarOpen(!SideBarOpen);
            }}
          />
        </div>
        <div className="sidebar-body text-white">
          <h3 className="mx-auto w-10/12 border-b-[1px] pb-3 text-6xl">Cart</h3>
        </div>
      </div>
    </div>
  );
};
