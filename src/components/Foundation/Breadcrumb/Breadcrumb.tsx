import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

export interface BreadcrumbProps {
  rendering?: ComponentRendering & { params: ComponentParams };
  params?: ComponentParams;
  fields: {
    data: {
      item: {
        field: {
          Title: Field<string>;
        };
        path: string;
        ancestors: {
          field: {
            Title: Field<string>;
          };
          path: string;
        }[];
      };
      rootPath: {
        siteInfo: {
          rootPath: string;
        };
      };
    };
  };
}

export const Default = ({ fields }: BreadcrumbProps): JSX.Element | false => {
  return (
    fields?.data?.item?.field?.Title.value != 'Home' && (
      <div className="container mx-auto mt-5">
        <ul className="flex flex-row [&>li]:text-3xl uppercase">
          {fields?.data?.item?.ancestors?.reverse().map((item, index: number) => {
            if (Object.keys(item).length > 0) {
              return (
                <li key={index} className="after:content-['/'] after:mx-2">
                  <Link
                    href={item?.path?.replace(
                      `${fields?.data?.rootPath?.siteInfo?.rootPath}/Home`,
                      ''
                    )}
                    className="hover:text-blue-500 transition-all"
                  >
                    {<Text field={item?.field?.Title} />}
                  </Link>
                </li>
              );
            }
          })}
          <li>
            {
              <Link
                href={fields?.data?.item?.path.replace(
                  `${fields?.data?.rootPath?.siteInfo?.rootPath}/Home`,
                  ''
                )}
                className="pointer-events-none font-bold"
              >
                <Text field={fields?.data?.item?.field?.Title} />
              </Link>
            }
          </li>
        </ul>
      </div>
    )
  );
};
