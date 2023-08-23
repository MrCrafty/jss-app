import React from 'react';
import { ComponentParams, ComponentRendering, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface TitleAndDescriptionProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = ({ fields: { data } }: TitleAndDescriptionProps): JSX.Element => {
  console.log(data);
  // const id = params.RenderingIdentifier;

  return (
    <div
      className={`component`}
      // id={id ? id : undefined}>
    >
      <div className="component-content bg-orange-600">
        <Text field={data.PageData.field.PageTitle} />
      </div>
    </div>
  );
};
