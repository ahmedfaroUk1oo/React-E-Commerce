import React, { useContext, useEffect } from 'react';
import styles from './WishList.module.css';
import { wishListContext } from '../../Context/WishList';
import { Link } from 'react-router-dom';
import { carContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';
import wishList from '../../Assets/images/empty-wishList.png'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function WishList() {
  const {ToggleInWishlist,wishListData,GetWishListItems,isLoading} = useContext(wishListContext);
  const {AddToCart} = useContext(carContext)

  function AddProductFromCart(id) {
    AddToCart(id);
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
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Wish List</title>
            </Helmet>
   
    <div className="container py-5">
    <h2 className='fw-bold text-center text-main'>Your Favourite Items <i className="fa-solid fa-hand-holding-heart"></i></h2>
    <div className="row pt-4 ">
    {(isLoading ) ? <Loader /> : wishListData.length ? wishListData.map((product)=>
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
              <i className={`fa-solid fa-star rating-color`}></i>{" "}
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

      ) : <div className='py-5 text-center text-white fw-bold rounded-1 '>
      <img src={wishList} alt="" className='' />
      <h4  className='text-center text-muted  pb-4'>Your Wish List Is Empty</h4>
      <Link className='btn btn-success d-block w-50 m-auto' to='/home'>Continue Shopping</Link>
    </div>  }
    
      
    </div>
    </div>
    </HelmetProvider>
    </>
  )
}
