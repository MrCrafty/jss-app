import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { Product, ProductItem } from './ProductItem';
import axios from 'axios';

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

  /*==============================useEffect for the category change==============================*/
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
    <div className="container font-Poppins">
      {/*==============================rendering all the categories in the navbar==============================*/}
      <ul className="mb-20 mt-10 hidden items-baseline gap-y-5 lg:flex  lg:flex-row ">
        <li className="mr-8 border-r-2 px-4 py-2 text-5xl">
          <Link href="/categories">
            <BsArrowLeft className="mr-2 inline text-4xl" />
            Back
          </Link>
        </li>
        {props?.fields?.data?.Categories?.children?.results?.map((item, index: number) => {
          const title = item.name == 'All Categories' ? 'null' : String(item.name).toLowerCase();
          return (
            <li
              className={`relative mr-16 pb-2 text-5xl after:absolute after:-bottom-1 after:left-0 after:block after:w-0 after:border-b-2 after:border-blue-500 after:transition-all after:content-[""] after:hover:w-full ${
                category == title ? 'after:w-full' : ''
              }`}
              key={index}
            >
              <a
                onClick={() => {
                  handleCategory(title);
                }}
                className="break-keep text-slate-900 hover:text-slate-900"
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
        className="text-3xl lg:hidden"
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
        <div className="mx-auto grid grid-cols-1 gap-x-7 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {products
            ?.slice(0, initalProducts)
            .map((item, index) => (
              <ProductItem
                key={index}
                Price={item?.Price}
                Title={item?.Title}
                image={item?.image}
                link={item?.link}
                ProductId={item?.ProductId}
                Categories={item?.Categories}
              />
            ))}
        </div>
      ) : (
        <div className="mx-auto grid grid-cols-1 gap-x-7 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {finalProducts
            ?.slice(0, initalProducts)
            ?.map((item, index) => (
              <ProductItem
                key={index}
                Price={item?.Price}
                Title={item?.Title}
                image={item?.image}
                link={item?.link}
                Categories={item?.Categories}
                ProductId={item?.ProductId}
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
      <div className="flex w-full justify-center">
        {(category == 'null' && products.length > initalProducts) ||
        (category != 'null' && finalProducts.length > initalProducts) ? (
          <button
            className="mt-5 rounded-full bg-slate-950 px-5 py-3 text-4xl text-slate-100 transition-all hover:bg-neutral-700"
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
