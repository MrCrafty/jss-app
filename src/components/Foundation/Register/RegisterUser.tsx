import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface RegisterUserProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: RegisterUserProps): JSX.Element => {
  console.log('props', props);
  return <div></div>;
};
