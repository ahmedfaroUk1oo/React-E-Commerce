import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { carContext } from '../../Context/CartContext';
import emptyCart from '../../Assets/images/empty_cart.png'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function Cart() {
  const {GetUserCart,countItem,RemoveSpecificItem,setCountItem,UpdateQty,ClearCart,isLoading,setIsLoading} = useContext(carContext)
  const [cartData,setCartData] = useState(null);


 async function GetDataCart () {
  const data = await  GetUserCart();
  if(data?.status == 'success') {
    setCartData(data);
    if(data.numOfCartItems === 0) {
setCartData(null);
setCountItem(0);
    }
   
    setIsLoading(false)
  }else {
    setCartData(null)
  }
}


  useEffect(()=>{
    if(countItem){
      setIsLoading(true);
    }
   GetDataCart() ;
  },[])

  async function RemoveItem (id) {
const data = await RemoveSpecificItem(id);
if(data.status === "success") {
  setCartData(data)
setCountItem(data.numOfCartItems);
if(data.numOfCartItems == 0) {
  setCartData(null);
  setCountItem(0)
}
}
  }


  async function UpdateQuantity(id,count) {
    const data = await UpdateQty(id,count);
    if(data.status === "success") {
      setCartData(data)
    setCountItem(data.numOfCartItems);
    }
    if(count === 0 ) {
      RemoveItem(id);
    }
  }

  async function ClearedCartData() {
    const data = await ClearCart();
  
      setCartData(null);
      setCountItem(0)
    
  }


 
  return (
    
    <>
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>
     <div className="container py-2  d-flex min-vh-100 justify-content-center flex-column">
    <h2 className='fw-bold py-3 text-center text-main fs-2 fw-bold mt-5'>Shopping Cart</h2>
   <div className="cart">
   { isLoading? <Loader/> :  cartData ?   <section className="   bg-main-light py-4 rounded-2 px-2 ">
      <div className="summary d-flex justify-content-between align-items-center py-3">
      <p className='fs-3 fw-bold m-0'>Total Price : <span className='text-main'>{cartData?.data?.totalCartPrice}</span></p>
      <button className='btn fs-5 fw-bold btn-danger' onClick={ClearedCartData}><i className="fa-solid fa-eraser"></i> Clear Cart</button>
      </div>
     {cartData?.data?.products.map((el)=>  <div className="row g-3 border-bottom py-3" key={el._id}>

        
            <div className="col-md-1">
              <div className="img  ">
              <img src={el.product.imageCover} alt="" className='w-100'    />
            </div>
            </div>
            
            <div className="col-md-8  align-self-center  ">
              <h3 className='fw-bold'>{el.product.title}</h3>
              <p className='text-main m-0 mb-2 fs-5'>price : {el.price}</p>
              <button className='btn m-0 p-0 fs-4' onClick={()=> RemoveItem(el.product.id)} ><i className="fa-solid fa-trash-can text-main"  ></i> remove</button>
            </div>

       <div className="col-md-3 text-end align-self-center  "> 
                <button className='btn btn-success fw-bold me-2' onClick={()=>UpdateQuantity(el.product.id,el.count+1)} ><i className="fa-solid fa-plus"></i></button>
                <p className='btn m-0 p-0 fs-2 fw-bold me-2'>{el.count}</p>
                <button className='btn btn-danger' onClick={()=>UpdateQuantity(el.product.id,el.count-1)}><i className="fa-solid fa-minus"></i></button>
       </div>


 </div>

)}
 <Link to='/checkout' className='btn btn-success mt-4 w-75 mx-auto p-2 fs-4 fw-bold d-block '>Checkout</Link>
 </section>
    
    : <div className='py-5 text-center text-white fw-bold rounded-1 '>
    <img src={emptyCart} alt="" className='' />
    <Link className='btn btn-success d-block w-50 m-auto' to='/home'>Continue Shopping</Link>
  </div>  }
   </div>
      </div>
      </HelmetProvider>
  
    </>

  )
}
