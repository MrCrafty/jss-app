import { Field, Image, ImageFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import axios from 'axios';
import React, { Dispatch, SetStateAction } from 'react';

const CartProductItem = ({
  title,
  price,
  image,
  handleDelete,
  quantity,
  productId,
  setCart,
}: {
  title: string;
  productId: string;
  price: string;
  handleDelete: () => void;
  quantity: number;
  image: Field<ImageFieldValue>;
  setCart: Dispatch<SetStateAction<Object>>;
}) => {
  return (
    <div className="my-10 flex justify-evenly">
      <div className=" w-4/12">
        <Image field={image} className="w-full" />
      </div>
      <div className="w-5/12">
        <div className="flex flex-col gap-5">
          <h2 className="text-5xl">{title}</h2>
          <h3 className="text-3xl">${price}</h3>
        </div>
        <div className="mt-10 flex w-full flex-row justify-between">
          <div className="flex  border-slate-500 [&>button]:w-10 [&>button]:border-[1px] [&>button]:transition-all">
            <button
              className="hover:bg-white hover:text-black"
              onClick={() => {
                axios.post('/api/cart/deletefromcart', { productId: productId });
                axios.get('/api/cart/getcart').then((data) => {
                  if (typeof data.data.data == 'object') {
                    setCart(data.data.data);
                  }
                });
              }}
            >
              -
            </button>
            <p className="px-3 text-2xl">{quantity}</p>
            <button
              className="hover:bg-white hover:text-black"
              onClick={() => {
                axios.post('/api/cart/addtocart', { productId: productId });
                axios.get('/api/cart/getcart').then((data) => {
                  if (typeof data.data.data == 'object') {
                    setCart(data.data.data);
                  }
                });
              }}
            >
              +
            </button>
          </div>
          <button
            onClick={() => {
              handleDelete();
            }}
            className="border-[1px] border-red-500 px-5 text-red-500 transition-all hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
