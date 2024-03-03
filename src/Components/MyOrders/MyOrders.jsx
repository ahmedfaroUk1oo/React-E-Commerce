import React, { useContext, useEffect, useState } from 'react';
import styles from './MyOrders.module.css';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import reportWebVitals from './../../reportWebVitals';
import Loader from '../Loader/Loader';
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function MyOrders() {

const {id}=jwtDecode(localStorage.getItem("userToken"));
const [isLoading,setIsLoading] = useState(true);
const [userOrders,setUserOrders] = useState([]);


async function GetUserOrders (userId) {
  const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  setUserOrders(data)
  setIsLoading(false);
}
useEffect(()=>{
 GetUserOrders(id);
},[])


  return (
    <>
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <title>My Orders</title>
            </Helmet>
      <div className="container py-5 mt-5">
        <h1 className='pb-3 fw-bold text-center text-main '>Orders Summary</h1>
        <h3>
          Number Of Orders :
          <span className="btn btn-success fs-5 fw-bold mx-2">
            {userOrders.length}
          </span>
        </h3>
        {isLoading ? <Loader/> : 
        userOrders.map((order) => (
          <div key={order.id} className="row  g-3 py-4 m-auto ">
            <div className="col-md-12   ">
              <div className="summary bg-main-light rounded-2 p-3 d-flex justify-content-between flex-wrap align-items-center">
                <div className="details">
                  <p className="fw-bold fs-4 py-1 m-0">
                    Cart Items :{" "}
                    <span className="text-success fs-5 fw-bold">
                      {order.cartItems.length}
                    </span>{" "}
                  </p>
                  <p className="fw-bold fs-4 py-1  m-0">
                    Time :{" "}
                    <span className="text-success fs-5 fw-bold">
                      {order.createdAt.split("T")[0]}{" "}
                      {order.createdAt.split("T")[1].split(".")[0]}
                    </span>
                  </p>
                  <p className="fw-bold fs-4 py-1  m-0">
                    Order Id :{" "}
                    <span className="text-success fs-5 fw-bold">
                      {order.id}
                    </span>{" "}
                  </p>
                  <p className="fw-bold fs-4 py-1  m-0">
                    Total Price :{" "}
                    <span className="text-success fs-5 fw-bold">
                      {order.totalOrderPrice}
                    </span>{" "}
                  </p>
                </div>
                <div className="address ">
                  <p className="fw-bold fs-4 py-1 m-0">
                    city :{" "}
                    <span className="text-success fs-5 fw-bold">
                      {order.shippingAddress.city}
                    </span>{" "}
                  </p>
                  <p className="fw-bold fs-4 py-1  m-0">
                    Address :{" "}
                    <span className="text-success fs-5 fw-bold">
                      {order.shippingAddress.details}
                    </span>
                  </p>
                  <p className="fw-bold fs-4 py-1  m-0">
                    Phone :{" "}
                    <span className="text-success fs-5 fw-bold">
                      {order.shippingAddress.phone}
                    </span>{" "}
                  </p>
                  <p className="fw-bold fs-4 py-1  m-0">
                    Payment Method:{" "}
                    <span className="text-success fs-5 fw-bold">
                      {order.paymentMethodType}
                    </span>{" "}
                  </p>
                </div>
              </div>
              <i className="fa-solid fa-chevron-down fw-bold fs-3 d-block text-center"></i>
            </div>
            {order.cartItems.map((el) => (
              <div key={el._id} className={`row g-3 border-bottom py-3 m-auto `}>
                <div className="col-md-1">
                  <div className="img  ">
                    <img src={el.product.imageCover} alt="" className="w-100" />
                  </div>
                </div>

                <div className="col-md-8  align-self-center  ">
                  <h3 className="fw-bold">{el.product.title}</h3>
                  <p className="text-main m-0 mb-2 fs-5">price : {el.price} </p>
                </div>

                <div className="col-md-3 text-end align-self-center  ">
                  <p className="btn m-0 p-0 fs-2 fw-bold me-2">
                    Item Count : <span className="p text-main">{el.count}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </HelmetProvider>

    </>
  );
}
