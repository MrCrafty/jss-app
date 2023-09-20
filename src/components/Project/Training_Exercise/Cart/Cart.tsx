import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface CartProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Cart = (props: CartProps): JSX.Element => {
  return (
    <div className="component-content">
      <p>Cart Component</p>
    </div>
  );
};
