import React, { useState } from 'react';
import { Field, Image, Text, ImageFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
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
}

export const ProductItem = ({ Title, image, Price, link }: Product) => {
  const [wishlist, setwishlist] = useState(false);

  return (
    <div className="card-container">
      <div className="card-img w-full overflow-hidden max-h-min">
        <Link href={link?.path}>
          <Image field={image?.jsonValue} className="w-full hover:scale-110 transition-all" />
        </Link>
      </div>
      <div className="card-body flex justify-between items-baseline">
        <div className="product-content">
          <div>
            <Link href={link?.path}>
              <Text
                tag="h3"
                field={Title.jsonValue}
                className="text-4xl my-2 hover:text-blue-500 inline-block transition-all"
              />
            </Link>
          </div>
          <div className="product-price">
            $<Text field={Price.jsonValue} />
          </div>
        </div>
        <div className="wishlist-icon">
          <button
            onClick={() => {
              setwishlist(!wishlist);
            }}
            className="[&>*]:text-3xl"
          >
            {wishlist ? <AiFillHeart className="text-red-400" /> : <AiOutlineHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};
