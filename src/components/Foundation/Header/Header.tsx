import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  Image,
  ImageField,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { useRouter } from 'next/router';

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
  // const id = fields.params.RenderingIdentifier;
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
                    className={`nav-link text-black transition-all ${
                      element.url == currentPage ? 'text-4xl font-extrabold' : ''
                    }`}
                  >
                    <Text field={element.fields.Title} />
                  </Link>
                }
              </li>
            );
          })}
          <li className="nav-item ">
            <Link
              href={'/login'}
              className={`border-1 flex cursor-pointer items-center border-slate-600 px-3 py-2 text-2xl transition-all hover:bg-slate-700 hover:text-white ${
                currentPage == '/login' ? 'cursor-default bg-slate-700 text-white' : ''
              }`}
            >
              Login
              <BsArrowRight className="inline-block" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
