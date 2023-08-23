import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ComponentParams, ComponentRendering, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

interface CarouselProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="z-10 absolute top-50 right-10 md:right-20 lg:right-32 cursor-pointer"
      onClick={onClick}
    >
      <SlArrowRight className="md:text-4xl lg:text-6xl text-black" />
    </div>
  );
};
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="z-10 absolute top-50 left-10 md:left-20 lg:left-32 cursor-pointer"
      onClick={onClick}
    >
      <SlArrowLeft className="md:text-4xl lg:text-6xl text-black" />
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
