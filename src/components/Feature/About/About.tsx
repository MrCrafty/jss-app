import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  Image,
  ImageFieldValue,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface AboutProps {
  rendering?: ComponentRendering & { params: ComponentParams };
  params?: ComponentParams;
  fields: {
    IsRight: Field<boolean>;
    Image: Field<ImageFieldValue>;
    Title: Field<string>;
    Content: Field<string>;
  };
}

export const Default = (props: AboutProps): JSX.Element => {
  // const id = props.params.RenderingIdentifier;
  console.log(props?.fields);

  return (
    <div className="container mt-5 mb-28">
      <div
        className={`flex justify-between ${
          props?.fields?.IsRight?.value ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div className="w-full md:w-5/12 lg:w-4/12 relative h-max">
          <div
            className={`hover:[&>img]:scale-110 overflow-hidden
        before:content-[''] before:absolute before:border-2 before:border-black
        before:top-0 before:left-0 before:h-full before:w-full ${
          props?.fields?.IsRight.value ? 'before:-translate-x-5' : 'before:translate-x-5'
        } before:translate-y-5`}
          >
            <Image
              field={props?.fields?.Image}
              className="w-full h-auto relative transition-all duration-300 "
            />
          </div>
        </div>
        <div className="w-full md:col-5/12 lg:w-7/12 break-words">
          <Text tag="h2" field={props?.fields?.Title} className="text-4xl font-semibold mb-3" />
          <Text tag="p" field={props?.fields?.Content} />
        </div>
      </div>
    </div>
  );
};
