import React from 'react';
import {
  Field,
  // ComponentParams,
  // ComponentRendering,
  Image,
  ImageFieldValue,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

export type BannerProps = {
  fields: {
    data: {
      PageData: {
        Title: { jsonValue: Field<string> };
      };
      CurrentData: {
        Image: { jsonValue: Field<ImageFieldValue> };
      };
    };
  };
};

export const Default = ({ fields }: BannerProps): JSX.Element => {
  return fields?.data?.PageData?.Title?.jsonValue?.value != 'Home' ? (
    <div className=" relative">
      <Image
        field={fields?.data?.CurrentData?.Image?.jsonValue}
        className="w-full min-h-[80px] grayscale-50"
      />
      <Text
        tag="h2"
        field={fields?.data?.PageData?.Title?.jsonValue}
        className="text-5xl md:text-6xl lg:text-8xl font-Poppins font-extralight  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
      />
    </div>
  ) : (
    <></>
  );
};
