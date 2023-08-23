'use client';

import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { Product, ProductItem } from './ProductItem';

interface ProductListingProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    data: {
      item: {
        children: {
          results: Product[];
        };
      };
      Categories: {
        children: {
          results: {
            name: string;
          }[];
        };
      };
    };
  };
}

export const Default = (props: ProductListingProps): JSX.Element => {
  console.log(props?.fields);
  //   /*==============================Initializing the states==============================*/
  const initialproducts = 4;
  const productperload = 4;
  const [products, setProducts] = useState<Product[]>([]);
  const [initalProducts, setInitialProducts] = useState(initialproducts);
  const [productPerLoad] = useState(productperload);
  const [category, setCategory] = useState<string | null>(
    typeof window !== 'undefined' ? window.localStorage.getItem('category') : null
  );
  /*==============================Defining the click functions==============================*/
  const handleLoadmore = () => {
    setInitialProducts(initalProducts + productPerLoad);
  };
  const handleCategory = (category: string) => {
    setCategory(category);
    setInitialProducts(initialproducts);
  };
  /*==============================Fetching data from api on page render==============================*/
  useEffect(() => {
    const product = props?.fields?.data?.item?.children?.results;
    setProducts(product);
  }, []);

  /*==============================useEffect for the catergory change==============================*/
  useEffect(() => {
    if (category != null) {
      finalProducts = products?.filter((item) => {
        let flag = false;
        item?.Categories?.jsonValue.forEach((element) => {
          element.name.toLowerCase() == category ? (flag = true) : '';
        });
        return flag;
      });
    }
    localStorage.setItem('category', category || 'null');
  }, [category]);
  let finalProducts = products?.filter((item) => {
    let flag = false;
    item?.Categories?.jsonValue.forEach((element) => {
      element.name.toLowerCase() == category ? (flag = true) : '';
    });
    return flag;
  });
  /*==============================Rendered HTML code==============================*/
  return (
    <div className="container mt-5 font-Poppins">
      <ul className="hidden lg:flex lg:flex-row mt-5 items-baseline  gap-y-5 ">
        <li className="mr-8 px-4 py-2 text-5xl border-r-2">
          <Link href="/categories">
            <BsArrowLeft className="inline text-4xl mr-2" />
            Back
          </Link>
        </li>
        {/*==============================rendering all the categories in the navbar==============================*/}
        {props?.fields?.data?.Categories?.children?.results?.map((item, index: number) => {
          const title = item.name == 'All Categories' ? 'null' : String(item.name).toLowerCase();
          return (
            <li
              className={`mr-16 text-5xl pb-2 relative after:content-[""] after:transition-all after:absolute after:left-0 after:-bottom-1 after:w-0 after:border-b-2 after:border-blue-500 after:hover:w-full after:block ${
                category == title ? 'after:w-full' : ''
              }`}
              key={index}
            >
              <a
                onClick={() => {
                  handleCategory(title);
                }}
                className="text-slate-900 hover:text-slate-900 break-keep"
              >
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
      <select
        value={category || 'null'}
        name="categories"
        id="categories"
        className="lg:hidden text-3xl"
        onChange={(e) => {
          setCategory(e.target.value == 'all categories' ? 'null' : e.target.value);
          typeof window !== undefined
            ? localStorage.setItem(
                'category',
                e.target.value == 'all categories' ? 'null' : e.target.value
              )
            : '';
        }}
      >
        {props?.fields?.data?.Categories?.children?.results?.map((item, i) => (
          <option key={i} value={item?.name.toLowerCase()}>
            {item?.name}
          </option>
        ))}
      </select>
      {/*==============================Rendering all the products according to the category selected==============================*/}

      {category == 'null' ? (
        <div className="mt-5 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-14">
          {products?.slice(0, initalProducts).map((item, index) => (
            <ProductItem
              key={index}
              Price={item?.Price}
              Title={item?.Title}
              image={item?.image}
              link={item?.link}
              Categories={item?.Categories}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-14">
          {finalProducts?.slice(0, initalProducts)?.map((item, index) => (
            <ProductItem
              key={index}
              Price={item?.Price}
              Title={item?.Title}
              image={item?.image}
              link={item?.link}
              Categories={item?.Categories}
            />
          ))}
        </div>
      )}
      {(category != 'null' && finalProducts.length == 0) || products.length == 0 ? (
        <h2 className="text-5xl">This category is empty today! Please visit in the future.</h2>
      ) : (
        ''
      )}
      {/*============================== Rendering Loadmore button for pagination==============================*/}
      <div className="w-full flex justify-center">
        {(category == 'null' && products.length > initalProducts) ||
        (category != 'null' && finalProducts.length > initalProducts) ? (
          <button
            className="text-4xl mt-5 py-3 px-5 bg-slate-950 text-slate-100 rounded-full hover:bg-neutral-700 transition-all"
            onClick={() => {
              handleLoadmore();
            }}
          >
            Load More
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
