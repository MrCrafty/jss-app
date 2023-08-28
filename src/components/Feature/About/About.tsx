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

  return (
    <div className="container mb-28 mt-5">
      <div
        className={`flex justify-between ${
          props?.fields?.IsRight?.value ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div className="relative h-max w-full md:w-5/12 lg:w-4/12">
          <div
            className={`overflow-hidden before:absolute
        before:left-0 before:top-0 before:h-full before:w-full
        before:border-2 before:border-black before:content-[''] hover:[&>img]:scale-110 ${
          props?.fields?.IsRight.value ? 'before:-translate-x-5' : 'before:translate-x-5'
        } before:translate-y-5`}
          >
            <Image
              field={props?.fields?.Image}
              className="relative h-auto w-full transition-all duration-300 "
            />
          </div>
        </div>
        <div className="md:col-5/12 w-full break-words lg:w-7/12">
          <Text tag="h2" field={props?.fields?.Title} className="mb-3 text-4xl font-semibold" />
          <Text tag="p" field={props?.fields?.Content} />
        </div>
      </div>
    </div>
  );
};
