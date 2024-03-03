import React, { useContext, useEffect, useState } from 'react';
import styles from './CheckOut.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { carContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet';

export default function CheckOut() {
const {cartId,GetUserCart,setCountItem} = useContext(carContext);
const headers = {token :localStorage.getItem("userToken")};
const [isOnlinePayment,setIsOnlinePayment] = useState(false);
const location = Location.host;
const endPoint = isOnlinePayment ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?${location}`
 : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

const navigate = useNavigate();
useEffect(()=>{
  GetUserCart()
},[])

  const validatationSchema = Yup.object({
    phone : Yup.string().matches(/^01[0125][0-9]{8}/,"please write a valid phone").required("phone is required"),
    city : Yup.string().matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,"please write a valid city").required("city is requierd"),
    details : Yup.string().required("details is required")
  })

  let initialValues = {
    phone: "",
    city: "",
    details: ""
  }


  let forms = useFormik({
    initialValues ,
    onSubmit : (values)=>{HandlePayment(values)},
    validationSchema : validatationSchema ,
  })

  async function HandlePayment(values) {
    const {data} = await axios.post(`${endPoint}` , {
      shippingAddress : values
    }, {headers});
    if(data?.status == 'success') {
      toast.success('Order Successfully Placed');
      if(isOnlinePayment) {
        window.location.href=data.session.url;
      }else {
        setCountItem(0);
      setTimeout(() => {
        navigate('/allorders');
      }, 2000);
      }
    }
  }
  return (
    <>
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <title>CheckOut</title>
            </Helmet>
      <section className='py-5  d-flex justify-content-center flex-column min-vh-100'>
        <div className="container">
          <h2 className='fw-bold'>CheckOut...</h2>
          <div className="checkOut">
          <form onSubmit={forms.handleSubmit}>
            <div className="phone form-group py-2">
              <label htmlFor="phone" className='py-2'>Phone Number</label>
              <input type="tel" id='phone' name='phone' value={forms.values.phone} placeholder='Phone Number...' className='form-control' onChange={forms.handleChange}  onBlur={forms.handleBlur}/>
              {forms.errors.phone && forms.touched.phone ? <div className='alert alert-danger'>{forms.errors.phone}</div> : null}
            </div>
            <div className="city form-group py-2">
              <label htmlFor="city" className='py-2'>City</label>
              <input type="text" id='city' name='city' value={forms.values.city} placeholder='City...' className='form-control' onChange={forms.handleChange} onBlur={forms.handleBlur} />
              {forms.errors.city && forms.touched.city ? <div className='alert alert-danger'>{forms.errors.city}</div> : null}
            </div>
            <div className="details form-group py-2">
              <label htmlFor="details" className='py-2'>Details</label>
              <textarea rows={3} type="tel" id='details' name='details' value={forms.values.details} placeholder='Details...' className='form-control resize' onChange={forms.handleChange} onBlur={forms.handleBlur} />
              {forms.errors.details && forms.touched.details ? <div className='alert alert-danger'>{forms.errors.details}</div> : null}
            </div>
            <div className="payment d-flex py-3 fs-4 px-2 ">
              <input type="checkbox" name="online" id="online" className='form-check rounded-2 scalling me-4' onChange={()=>{setIsOnlinePayment(!isOnlinePayment)}} />Online Payment
            </div>
           {isOnlinePayment ?  <button type='submit' className='btn btn-success bg-main'disabled={!(forms.isValid && forms.dirty)}>Online Payment</button> 
           : <button type='submit' className='btn btn-success bg-main'disabled={!(forms.isValid && forms.dirty)}>Cash Payment</button>}
          </form>
          </div>
        </div>
      </section>
    </HelmetProvider>

    </>
  )
}
