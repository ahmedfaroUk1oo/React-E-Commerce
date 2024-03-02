import React, { useContext, useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { carContext } from '../../Context/CartContext';

import { wishListContext } from '../../Context/WishList';



export default function FeaturedProducts() {

  let {AddToCart} = useContext(carContext);
  const [filtered,setFiltered] = useState(null);
  const {ToggleInWishlist,wishListData,GetWishListItems} = useContext(wishListContext);
 


  function getProducts() {
    return axios('https://ecommerce.routemisr.com/api/v1/products')
  }

   function AddProductFromCart(id) {
  AddToCart(id);
  }

  
  
  const {data,isLoading} = useQuery("FaeturedProducts", getProducts);


  function FilteringProduct(event) {
  const filterProduct = data?.data?.data.filter(ele=> ((ele.title.toLowerCase()).includes(event.target.value) ));
  setFiltered(filterProduct);

}





function AddAndRemoveWishlist(id) {
  ToggleInWishlist(id)
}

 function GetWishList() {
  
  GetWishListItems()
 
 }

 useEffect(()=>{
  GetWishList();
 },[])

 


  return (
    <>
      <div className="container py-5">
        <div className="search pb-5">
          <input type="text" className='form-control ' placeholder='Search For Product' onKeyUp={ FilteringProduct}  />
        </div>
        <div className="row g-4">
          {isLoading ? <Loader /> : null}
          {filtered ? filtered.map((product) => (
            <div className="col-md-3" key={product.id}>
              <div className="section">
              <Link className='list-unstyled unstyled ' to={`/details/`+product.id}>
              <img
                  src={product.imageCover}
                  alt=""
                  height={300}
                  className="w-100"
                />
                <div className="details px-4 py-2">
                  <span className="my-1 text-success">
                    {product.category.name}
                  </span>
                  <h5 className="fw-bold">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h5>
                  <div className="rating d-flex justify-content-between ">
                    <p className="fw-bold">{product.price}EGP</p>
                    <p className="fw-bold">
                      <i className={`fa-solid fa-star ${styles.icon}`}></i>{" "}
                      {product.ratingsAverage}
                    </p>
                  </div>
                </div>
              </Link>
              <div className={`wishList  d-flex `}>
   <button onClick={()=>AddProductFromCart(product?.id)} className='btn bg-main text-white m-auto d-block'>Add To Cart</button>
                  <button  className='btn text-white ms-auto fs-3  '>
                   <i className={`  fa-heart  ${wishListData.length ? ((wishListData.find(el => (el.id === product.id)))  !== undefined) ? 'fa-solid text-danger' : 'fa-regular' : "fa-regular" }` } onClick={()=>AddAndRemoveWishlist(product?.id)}></i>
                    </button>
   </div>
              
              </div>
            </div>
          )): data?.data?.data.map((product) => (
            <div className="col-md-3" key={product.id}>
              <div className="section">
              <Link className='list-unstyled unstyled ' to={`/details/`+product.id}>
              <img
                  src={product.imageCover}
                  alt=""
                  height={300}
                  className="w-100"
                />
                <div className="details px-4 py-2">
                  <span className="my-1 text-success">
                    {product.category.name}
                  </span>
                  <h5 className="fw-bold">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h5>
                  <div className="rating d-flex justify-content-between ">
                    <p className="fw-bold">{product.price}EGP</p>
                    <p className="fw-bold">
                      <i className={`fa-solid fa-star ${styles.icon}`}></i>{" "}
                      {product.ratingsAverage}
                    </p>
                  </div>
                </div>
              </Link>
              <div className={`wishList  d-flex `}>
   <button onClick={()=>AddProductFromCart(product?.id)} className='btn bg-main text-white m-auto d-block'>Add To Cart</button>
                  <button  className='btn text-white ms-auto fs-3  '>
                   <i className={`  fa-heart  ${wishListData.length ? ((wishListData.find(el => (el.id === product.id)))  !== undefined) ? 'fa-solid text-danger' : 'fa-regular' : "fa-regular" }` } onClick={()=>AddAndRemoveWishlist(product?.id)}></i>
                    </button>
   </div>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
