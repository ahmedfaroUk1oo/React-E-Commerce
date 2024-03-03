import React, { useState } from 'react';
import styles from './Verify.module.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Verify() {
  const[msgError,setMsgError] = useState("");
  const [isLoading,setIsLoading] =useState(false);
  const navigate = useNavigate();

  const initialValues = {
    resetCode : ""
  }


  async function CallResetCode(code) {
   setIsLoading(true);
   setMsgError("");
   try {
    const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , code);
    if(data.status === 'Success') {
     toast.success("Verified");
     setIsLoading(false);
     setTimeout(() => {
      navigate('/newpassword')
     }, 2000);
    }
   } catch (error) {
    setIsLoading(false)
    setMsgError(error.response.data.message)
   }
  }

  const forms = useFormik({
    initialValues : initialValues ,
    onSubmit : CallResetCode

  })

  return (
    <>
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Verify code</title>
            </Helmet>
          <div className="container d-flex flex-column justify-content-center min-vh-100 ">
        <h3 className='text-center py-4 fw-bold'>Verify Code</h3>
    
       <div className="verify bg-body-secondary p-3 rounded-2">
       <form className='py-5' onSubmit={forms.handleSubmit}>
        <div className={`verify ${styles.floating} floating-label-group `}>
          <input type="text" id='code' name='resetCode' onChange={forms.handleChange} className='form-control p-3'   value={forms.values.resetCode} required />
        <label htmlFor='code' className={`fw-bold  ${styles.label}`}>Verification Code</label>
            {msgError ? <div className='alert alert-danger'>{msgError}</div>:null}
        </div>
        <button type='submit' className={`btn bg-main text-white w-50  m-auto d-block my-3 fw-bold fs-4 ${isLoading ? 'disabled' : ''} `} disabled={!(forms.isValid && forms.dirty)} >
        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Verify"}
</button>
        </form>
       </div>
      </div>
    </HelmetProvider>

    </>
  )
}
