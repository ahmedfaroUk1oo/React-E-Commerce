import React, { useState } from 'react';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet,HelmetProvider } from 'react-helmet-async';


export default function Register() {


  const[msgError,setMsgError] = useState("");
  const [isLoading,setIsLoading] =useState(false)
  const navigate = useNavigate()

  const validatationSchema = Yup.object({
    name : Yup.string().min(3 ,"name is too short").max(15).required("name is required"),
      email : Yup.string().email("email not valid please write a correct email").required("email is requierd"),
      password : Yup.string().matches(/^[A-Z][a-z0-9]{5,25}/,"password must first letter capital and minimum letters is 5").required('password is required') ,
      rePassword: Yup.string().oneOf([Yup.ref('password')],"password and repassword not match") ,
      phone : Yup.string().matches(/^01[0125][0-9]{8}/,"please write a valid phone").required("phone is required")
  })

  

async function callRegister (information) {
  setMsgError("")
  setIsLoading(true)
  const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',information)
  .catch((error)=>{
    setIsLoading(false)
    setMsgError(error.response.data.message)})
  if(data.message === "success") {
    navigate('/login');
  }
}

  const forms = useFormik ({
    initialValues : {
      name : "ahmed",
      email : "",
      password : "" ,
      rePassword: "" ,
      phone : ""
    },
    validationSchema : validatationSchema ,

    onSubmit : callRegister,
  })


  return (
    <>
    <HelmetProvider>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>
      <div className="container d-flex flex-column min-vh-100 justify-content-center ">
        <h3 className='my-3 text-center text-main fs-2 fw-bold '>Register Now</h3>

       <div className="register bg-body-secondary p-3 rounded-2 ">
        {msgError ? <div className='alert alert-danger'>{msgError}</div>:null}
       <form action="" onSubmit={forms.handleSubmit}>
       <div className="form-section">
          <label htmlFor="fullName" className='my-2'>FullName :</label>
          <input type="text" className='form-control mb-2' name='name' value={forms.values.name} id='fullName' onChange={forms.handleChange} onBlur={forms.handleBlur}  />
          {forms.errors.name && forms.touched.name ? <div className='alert alert-danger'>{forms.errors.name}</div> : null}
        </div>
        <div className="form-section">
          <label htmlFor="email" className='my-2'>Email :</label>
          <input type="email" className='form-control mb-2' name='email' value={forms.values.email} id='email' onChange={forms.handleChange} onBlur={forms.handleBlur}/>
          {forms.errors.email && forms.touched.email ? <div className='alert alert-danger'>{forms.errors.email}</div> : null}
        </div>
        <div className="form-section">
          <label htmlFor="password" className='my-2'>Password :</label>
          <input type="password" className='form-control mb-2' name='password' value={forms.values.password} id='password'  onChange={forms.handleChange} onBlur={forms.handleBlur} />
          {forms.errors.password  && forms.touched.password ? <div className='alert alert-danger'>{forms.errors.password}</div> : null}
        </div>
        <div className="form-section">
          <label htmlFor="rePassword" className='my-2'>Re Password :</label>
          <input type="password" className='form-control mb-2' name='rePassword' value={forms.values.rePassword} id='rePassword'  onChange={forms.handleChange} onBlur={forms.handleBlur} />
          {forms.errors.rePassword  && forms.touched.rePassword ? <div className='alert alert-danger'>{forms.errors.rePassword}</div> : null}
        </div>
        <div className="form-section">
          <label htmlFor="phone" className='my-2'>Phone :</label>
          <input type="tel" className='form-control mb-2' name='phone' value={forms.values.phone} id='phone' onChange={forms.handleChange} onBlur={forms.handleBlur} />
          {forms.errors.phone && forms.touched.phone ? <div className='alert alert-danger'>{forms.errors.phone}</div> : null}
        </div>
        <button className={`btn bg-main text-white ms-auto d-block my-3 ${isLoading ? 'disabled' : ''}`} disabled={!(forms.isValid && forms.dirty)}>
          {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Register"}
          </button>
       </form>
       </div>
      </div>
      </HelmetProvider>
    </>
  )
}
