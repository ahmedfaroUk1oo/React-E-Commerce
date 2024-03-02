import React, { useContext, useState } from 'react';
import styles from './NewPassword.module.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import toast from 'react-hot-toast';
import { tokenContext } from '../../Context/Token';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function NewPassword() {
  const[msgError,setMsgError] = useState("");
  const [isLoading,setIsLoading] =useState(false);
  const navigate = useNavigate();
  let {token ,setToken} = useContext(tokenContext)


  const validatationSchema = Yup.object({
    email : Yup.string().email("email not valid please write a correct email").required("email is requierd"),
    newPassword : Yup.string().matches(/^[A-Z][a-z0-9]{5,25}/,"password must first letter capital and minimum letters is 5").required('password is required') ,
})

async function CallResetPassword(information) {
setIsLoading(true);
setMsgError("");
try {
  const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',information);
    
      setIsLoading(false);
    toast.success('Password Successfully Updated')
      localStorage.setItem("userToken",data.token)
      setToken(data.token)
      setTimeout(() => {
        navigate('/home')
      }, 2000);

} catch (error) {
  setMsgError(error.response.data.message);
  setIsLoading(false);
}


}

  const initialValues = {
      email : "",
      newPassword : "" ,
  };

  
  const forms = useFormik({
    initialValues : initialValues ,
    validationSchema:validatationSchema,
    onSubmit : CallResetPassword

  })
  return (
    <>
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <title>New Password</title>
            </Helmet>
         <div className="container d-flex justify-content-center flex-column min-vh-100">
        <h3 className='text-center py-4 fw-bold text-main'>Reset New Password</h3>
       <div className="reset bg-body-secondary p-3 rounded-2">
       {msgError ? <div className='alert alert-danger'>{msgError}</div>:null}
        <form className='py-5' onSubmit={forms.handleSubmit}>
        <div className={`email mb-4 `}>
        <label htmlFor='email' className={`fw-bold py-2 fs-4   `}>Your Email...</label>
          <input type="email" id='email' name='email' onChange={forms.handleChange} className='form-control p-2 '   value={forms.values.email} onBlur={forms.handleBlur}  />
          {forms.errors.email && forms.touched.email ? <div className='alert alert-danger'>{forms.errors.email}</div> : null}
        </div>
        <div className={`password   mb-4`}>
        <label htmlFor='pass' className={`fw-bold py-2 fs-4  `}>Enter Your New Password</label>
          <input type="password" id='pass' name='newPassword' onChange={forms.handleChange} className='form-control p-2 '   value={forms.values.newPassword} onBlur={forms.handleBlur}  />
          {forms.errors.newPassword  && forms.touched.newPassword ? <div className='alert alert-danger'>{forms.errors.newPassword}</div> : null}
        </div>
        <button type='submit' className={`btn bg-main text-white w-50  m-auto d-block my-3 fw-bold fs-4 ${isLoading ? 'disabled' : ''} `} disabled={!(forms.isValid && forms.dirty)} >
        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Reset"}
</button>
        </form>
       </div>
      </div>
    </HelmetProvider>

    </>
  )
}
