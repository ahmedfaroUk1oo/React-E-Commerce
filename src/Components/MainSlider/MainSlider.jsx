import React from 'react';
import styles from './MainSlider.module.css';
import img1 from '../../Assets/images/How-to-handle-data-for-e-commerce-today.webp'
import img2 from '../../Assets/images/e-commerce-1170x675.jpeg'
import img3 from '../../Assets/images/1620914834813.png'
import Slider from 'react-slick';


export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return (
    <>
      <div className="slider   my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            <Slider {...settings}>
      <img src={img1} className='w-100 rounded-2' height={400} alt="" />
      <img src={img2} className='w-100 rounded-2' height={400} alt="" />
      <img src={img3} className='w-100 rounded-2' height={400} alt="" />
    </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
