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

export const Header = ({ fields }: HeaderProps): JSX.Element => {
  // const id = fields.params.RenderingIdentifier;
  return (
    <div className="bg-zinc-50">
      <nav className="container mx-auto flex justify-between py-5">
        <div className="my-auto w-auto">
          <Link href={'/'}>
            <Image field={fields.Logo} className="w-full" />
          </Link>
        </div>
        <ul className="flex flex-row items-center text-2xl [&>li]:ml-5">
          {fields?.NavigationLinks?.map((element, index) => {
            return (
              <li className="nav-item" key={index}>
                {
                  <Link href={element.url} className="nav-link text-black">
                    <Text field={element.fields.Title} />
                  </Link>
                }
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
