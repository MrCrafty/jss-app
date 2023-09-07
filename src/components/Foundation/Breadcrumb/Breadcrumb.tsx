import React, { useEffect, useState } from 'react';
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

export const Default = ({ fields }: BreadcrumbProps): JSX.Element => {
  const [isClient, setIsClient] = useState(false);
  console.log(fields);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <></>;
  }
  return (
    <div
      className={`container mx-auto mt-10 ${
        fields?.data?.item?.field?.Title.value == 'Home' ? 'hidden' : ''
      }`}
    >
      <ul className="flex flex-row uppercase [&>li]:text-3xl">
        {fields?.data?.item?.ancestors.reverse().map((item, index: number) => {
          if (Object.keys(item).length > 0) {
            return (
              <li key={index} className="after:mx-2 after:content-['/']">
                <Link
                  href={item?.path?.replace(
                    `${fields?.data?.rootPath?.siteInfo?.rootPath}/Home`,
                    ''
                  )}
                  className="transition-all hover:text-blue-500"
                >
                  {<Text field={item?.field?.Title} />}
                </Link>
              </li>
            );
          } else return <></>;
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
  );
};
