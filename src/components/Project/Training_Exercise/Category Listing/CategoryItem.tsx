import { Field, Image, ImageFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import { useRouter } from 'next/router';

export default function CategoryItem({
  title,
  image,
}: {
  title: string;
  image: Field<ImageFieldValue>;
}) {
  const router = useRouter();
  const localTitle = String(title).toLowerCase();
  const handleClick = () => {
    if (localTitle == 'all categories') {
      localStorage.setItem('category', 'null');
    } else {
      localStorage.setItem('category', localTitle);
    }

    router.push('/categories/products', undefined, { shallow: false });
  };
  return (
    <div className="category-listing-item relative">
      <div
        onClick={() => {
          handleClick();
        }}
        className="category-item-body [&>h3]:hover:scale-125 [&>h3]:hover:after:w-full [&>img]:hover:grayscale-50 [&>img]:hover:opacity-70 overflow-hidden hover:cursor-pointer"
      >
        <Image field={image} className="transition-all duration-300" />
        <h3
          className="category-title absolute left-1/2 top-1/2 -translate-x-1/2 
            -translate-y-1/2 text-5xl p-4 backdrop-blur-md bg-gray-950 bg-opacity-60 
            text-slate-50 text-center transition-all after:transition-all after:duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:border after:border-b-0 after:w-0 after:border-blue-400 "
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
