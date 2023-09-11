import React, { useEffect, useState } from 'react';
import { Field, Image, Text, ImageFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
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
  const [wishlist, setwishlist] = useState(false);
  useEffect(() => {
    axios.get('/api/cart/getcart').then((cart) => {
      console.log('cart', cart.data.data);
      Object.keys(cart.data.data).forEach((ele) => {
        console.log('products', ele);
        if (ele === ProductId.value.toString()) {
          setwishlist(true);
        }
      });
    });
  }, []);
  return (
    <div className="card-container">
      <div className="card-img max-h-min w-full overflow-hidden">
        <Link href={link?.path}>
          <Image field={image?.jsonValue} className="w-full transition-all hover:scale-110" />
        </Link>
      </div>
      <div className="card-body flex items-baseline justify-between">
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
        <div className="wishlist-icon">
          <button
            onClick={async () => {
              !wishlist
                ? axios.post('/api/cart/addtocart', { productId: ProductId.value }).then(() => {
                    setwishlist(!wishlist);
                  })
                : axios
                    .post('/api/cart/deletefromcart', { productId: ProductId.value })
                    .then(() => {
                      setwishlist(!wishlist);
                    });
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
