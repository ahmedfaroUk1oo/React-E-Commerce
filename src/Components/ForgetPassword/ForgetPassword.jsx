import React, { useContext, useState } from 'react';
import styles from './ForgetPassword.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Context/Token';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function ForgetPassword() {
  const[msgError,setMsgError] = useState("");
  const [isLoading,setIsLoading] =useState(false);
  const navigate = useNavigate();
  


  const validatationSchema = Yup.object({
    email : Yup.string().email("email not valid please write a correct email").required("email is requierd"),
})

  const initialValues = {
    email : ""
  }

  async function ForgetPass (information) {
  
   
    
    setMsgError("");
    setIsLoading(true)
    try {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',information)
      if(data.statusMsg == 'success') {
        setIsLoading(false);
        toast.success('Reset code sent to your email');
        setTimeout(() => {
          navigate('/verifycode');
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false)
      setMsgError('Email Does Not Exist !!')
    }
  
  }


  const forms = useFormik({
    initialValues ,
    validationSchema :validatationSchema ,
    onSubmit : ForgetPass

  })



  return (
    <>
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Forget Password</title>
            </Helmet>
      <div className="container d-flex flex-column justify-content-center min-vh-100 ">
        <h3 className='text-center py-4 fw-bold text-main'>Reset Password</h3>
       <div className="forget bg-body-secondary p-3 rounded-2">
       {msgError ? <div className='alert alert-danger'>{msgError}</div>:null}
        <form onSubmit={forms.handleSubmit} className='py-5'>
        <div className="email-Address">
        <label htmlFor='email' className=' fw-bold pb-3'>Plaese Insert Your Email...</label>
          <input type="email" id='email' name='email' placeholder='Email Address' className='form-control p-3' value={forms.values.email} onChange={forms.handleChange} onBlur={forms.handleBlur}  />
          {forms.errors.email && forms.touched.email ? <div className='alert alert-danger'>{forms.errors.email}</div> : null}
        </div>
        <button type='submit' className={`btn bg-main text-white w-50  m-auto d-block my-3 fw-bold fs-4 ${isLoading ? 'disabled' : ''}`} disabled={!(forms.isValid && forms.dirty)}>
          {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Continue"}
</button>
        </form>
       </div>
      </div>
    </HelmetProvider>

    </>
  )
}
