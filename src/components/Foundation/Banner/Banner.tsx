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
  const imageURL = String(fields?.data?.CurrentData?.Image?.jsonValue?.value?.src)?.replace(
    'https://sc-jss-playgroundsc.dev.local/',
    'https://square-termite-set.ngrok-free.app/'
  );
  let imageField = { ...fields?.data?.CurrentData?.Image?.jsonValue?.value, src: imageURL };
  return fields?.data?.PageData?.Title?.jsonValue?.value != 'Home' ? (
    <div className=" relative">
      <Image field={imageField} className="min-h-[80px] w-full grayscale-50" />
      <Text
        tag="h2"
        field={fields?.data?.PageData?.Title?.jsonValue}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  font-Poppins text-5xl font-extralight text-white md:text-6xl lg:text-8xl"
      />
    </div>
  ) : (
    <></>
  );
};
