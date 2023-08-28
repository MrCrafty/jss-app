import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageFieldValue,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CategoryItem from './CategoryItem';

interface CategoryListingProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    data: {
      item: {
        children: {
          results: CategoryDataProps[];
        };
      };
    };
  };
}

interface CategoryDataProps {
  name: string;
  Image: {
    jsonValue: Field<ImageFieldValue>;
  };
}

export const Default = (props: CategoryListingProps): JSX.Element => {
  // const id = props.params.RenderingIdentifier;
  return (
    <div className="container mt-5">
      <div className="category-listing-container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {props?.fields?.data?.item?.children?.results?.map((item, index) => {
          return <CategoryItem title={item?.name} image={item?.Image?.jsonValue} key={index} />;
        })}
      </div>
    </div>
  );
};
