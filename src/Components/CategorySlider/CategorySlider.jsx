import React, { useEffect, useState } from 'react';
import styles from './CategorySlider.module.css';
import axios from 'axios';
import Slider from 'react-slick';
import Loader from '../Loader/Loader';

export default function CategorySlider() {
  let [category,setCategory] = useState([]);
  let [loading,setLoading] = useState(true)

  async function getCategories () {
    const {data} = await axios('https://ecommerce.routemisr.com/api/v1/categories');
    setCategory(data.data);
    setLoading(false)
    
  }
  useEffect (()=>{
    getCategories();
  },[]);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll:4,
    arrows:false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
    slidesToScroll:3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
    slidesToScroll:2,
        }
      }
    ]
  };
 
  return (
    <>
     <div className="container py-5 mt-5">
      <h2>Show Popular Categories ...</h2>
        {loading? <Loader/> : null}
      <Slider className='py-2' {...settings}>
      {category.map( (cat) => <div key={cat?._id} className="item px-2">
        <img src={cat.image} className='w-100' height={200} alt="" />
        <h5 className='text-center'>{cat.name}</h5>
      </div>
     )}
    </Slider>
     </div>
    </>
  )
}
