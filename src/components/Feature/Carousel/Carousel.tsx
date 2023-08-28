import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  Image,
  ImageFieldValue,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

interface CarouselProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    data: {
      item: {
        children: {
          results: {
            Image: { src: Field<ImageFieldValue> };
          }[];
        };
      };
    };
  };
}

const NextArrow = (props: { onClick?: React.MouseEventHandler }) => {
  const { onClick } = props;
  return (
    <div
      className="top-50 absolute right-10 z-10 cursor-pointer md:right-20 lg:right-32"
      onClick={onClick}
    >
      <SlArrowRight className="text-black md:text-4xl lg:text-6xl" />
    </div>
  );
};
const PrevArrow = (props: { onClick?: React.MouseEventHandler }) => {
  const { onClick } = props;
  return (
    <div
      className="top-50 absolute left-10 z-10 cursor-pointer md:left-20 lg:left-32"
      onClick={onClick}
    >
      <SlArrowLeft className="text-black md:text-4xl lg:text-6xl" />
    </div>
  );
};

const settings = {
  arrow: true,
  sliderToShow: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};
export const Default = ({ fields }: CarouselProps): JSX.Element => {
  return (
    <div className="relative">
      <Slider {...settings}>
        {fields?.data?.item?.children?.results?.map((item, index) => (
          <Image key={index} field={item?.Image?.src} />
        ))}
      </Slider>
    </div>
  );
};
