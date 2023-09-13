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
  const imageURL = String(image?.value?.src)?.replace(
    'https://sc-jss-playgroundsc.dev.local/',
    'https://square-termite-set.ngrok-free.app/'
  );
  let imageField = { ...image?.value, src: imageURL };
  return (
    <div className="category-listing-item relative">
      <div
        onClick={() => {
          handleClick();
        }}
        className="category-item-body overflow-hidden hover:cursor-pointer [&>h3]:hover:scale-125 [&>h3]:hover:after:w-full [&>img]:hover:opacity-70 [&>img]:hover:grayscale-50"
      >
        <Image field={imageField} className="transition-all duration-300" />
        <h3
          className="category-title absolute left-1/2 top-1/2 -translate-x-1/2 
            -translate-y-1/2 bg-gray-950 bg-opacity-60 p-4 text-center text-5xl 
            text-slate-50 backdrop-blur-md transition-all after:absolute after:bottom-0 after:left-0 after:w-0 after:border after:border-b-0 after:border-blue-400 after:transition-all after:duration-300 after:content-[''] "
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
