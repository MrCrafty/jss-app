import React, { useEffect, useState } from 'react';
import { Field, Image, Text, ImageFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import axios from 'axios';
export interface Product {
  Title: { jsonValue: Field<string> };
  Price: { jsonValue: Field<string> };
  image: { jsonValue: Field<ImageFieldValue> };
  Categories?: {
    jsonValue: {
      name: string;
    }[];
  };
  link: { path: string };
  ProductId: Field<number>;
}

export const ProductItem = ({ Title, image, Price, link, ProductId }: Product) => {
  return (
    <div className="card-container">
      <div className="card-img max-h-min w-full overflow-hidden">
        <Link href={link?.path}>
          <Image field={image?.jsonValue} className="w-full transition-all hover:scale-110" />
        </Link>
      </div>
      <div className="card-body mt-3 flex items-baseline justify-between">
        <div className="product-content">
          <div>
            <Link href={link?.path}>
              <Text
                tag="h3"
                field={Title.jsonValue}
                className="my-2 inline-block text-4xl transition-all hover:text-blue-500"
              />
            </Link>
          </div>
          <div className="product-price">
            $<Text field={Price.jsonValue} />
          </div>
        </div>
        <div className="wishlist-icon text-2xl">
          <button
            onClick={() => {
              axios.post('/api/cart/addtocart', { productId: ProductId.value });
            }}
            className="border-[1px] border-slate-800 px-3 py-1 text-slate-700  transition-all hover:bg-slate-900 hover:text-slate-100"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
