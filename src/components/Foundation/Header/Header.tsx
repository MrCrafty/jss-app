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

  useEffect(() => {
    axios.get('/api/auth/IsLogin').then((data) => {
      setIsLogin(data.data.IsLogin);
    });
  }, []);
  console.log('IsLogin', IsLogin);
  const handleLogout = () => {
    axios.post('/api/auth/logout').then(() => {
      ('');
    });
    window.location.href = '/login';
  };

  return (
    <div className="bg-zinc-50">
      <nav className="container mx-auto flex justify-between py-5">
        <div className="my-auto w-auto">
          <Link href={'/'}>
            <Image field={fields.Logo} className="w-full" />
          </Link>
        </div>
        <ul className="flex flex-row items-center font-Poppins text-2xl [&>li]:ml-5">
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
            />
          }
        </ul>
      </nav>
    </div>
  );
};
