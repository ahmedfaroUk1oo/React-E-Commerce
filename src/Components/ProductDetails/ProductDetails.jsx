import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import Loader from '../Loader/Loader';
import { carContext } from '../../Context/CartContext';
import {Helmet, HelmetProvider } from 'react-helmet-async';
import { tokenContext } from '../../Context/Token';
import { wishListContext } from '../../Context/WishList';

export default function ProductDetails() {
  
  let {AddToCart} = useContext(carContext);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  const {id} = useParams();
  const [productDetails,setProductDetails] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const {token}= useContext(tokenContext);
  const {wishListData,ToggleInWishlist,GetWishListItems} = useContext(wishListContext);

  async function getSpecificProduct() {
    const {data} = await axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setProductDetails(data.data)
    setIsLoading(false)
  }


  function GetWishList() {
    GetWishListItems()
  }


  useEffect (()=>{
    getSpecificProduct();
    GetWishList();
  },[]);

   function AddProductFromCart(id) {
    AddToCart(id);
   }

   function AddAndRemoveWishlist(id) {
    ToggleInWishlist(id)
   }

  return (
    
    <>
    <HelmetProvider>
     <Helmet>
                <meta charSet="utf-8" />
                <title>{productDetails?.title}</title>
            <meta name="keywords" content={productDetails?.slug} />
            </Helmet>
      <div className="container py-5">
        <div className="row">
            {isLoading ? <Loader/> : <>
            <div className="col-md-4 py-3">
          <div className="images">
          <Slider {...settings}>
      {productDetails?.images.map((el)=> <img src={el} key={el} className='w-100' height={400} alt=''></img> )}
    </Slider>
          </div>
          </div>
          <div className="col-md-8 py-3 px-5 align-self-center ">
            <div className="details">
              <h3>{productDetails?.slug}</h3>
              <p className='text-muted py-3'>{productDetails?.description}</p>
              <span className='py-2'>{productDetails?.category?.name}</span>
              <div className="rating d-flex justify-content-between py-3">
                    <p className="fw-bold">{productDetails?.price}EGP</p>
                    <p className="fw-bold">
                      <i className={`fa-solid fa-star rating-color`}></i>{" "}
                      {productDetails?.ratingsAverage}
                    </p>
                  </div>
            </div>
        
            <div className={`wishList  d-flex`}>
                  
                  <button className='btn bg-main text-white w-75 d-block m-auto fw-bold fs-3' onClick={()=>AddProductFromCart(productDetails?.id)}>Add To Cart</button>
                  <button  className='btn text-white ms-auto fs-3  '>
                  <i className={`  fa-heart  ${wishListData.length ? ((wishListData.find(el => (el.id === productDetails.id)))  !== undefined) ? 'fa-solid text-danger' : 'fa-regular' : "fa-regular" }` } onClick={()=>AddAndRemoveWishlist(productDetails?.id)}></i>

                    </button>
   </div>
           
          </div>
            </>}
          
        </div>
      </div>
      </HelmetProvider>

    </>
  )
}
