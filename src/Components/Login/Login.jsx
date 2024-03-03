import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup'
import { tokenContext } from '../../Context/Token';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import toast from 'react-hot-toast';


export default function Login() {
  const[msgError,setMsgError] = useState("");
  const [isLoading,setIsLoading] =useState(false)
  const navigate = useNavigate()
  let {token ,setToken} = useContext(tokenContext)





  const validatationSchema = Yup.object({
      email : Yup.string().email("email not valid please write a correct email").required("email is requierd"),
      password : Yup.string().matches(/^[A-Z][a-z0-9]{5,25}/,"password must first letter capital and minimum letters is 5").required('password is required') ,
  })


async function callLogin (information) {
  setMsgError("")
  setIsLoading(true)
  const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',information)
  .catch((error)=>{
    setIsLoading(false)
    setMsgError(error.response.data.message)})
  if(data.message === "success") {
    localStorage.setItem("userToken",data.token)
    setToken(data.token)
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  }
}

  const forms = useFormik ({
    initialValues : {
      email : "",
      password : "" ,
    },
    validationSchema : validatationSchema ,

    onSubmit : callLogin,
  })


  return (
    <>
    <HelmetProvider>      <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>
      <div className="container min-vh-100 d-flex flex-column justify-content-center ">
      <h2 className='mb-3 text-center fw-bold text-main fs-2'>Login Now</h2>
      <div className="login bg-body-secondary p-3 rounded-2 py-5">
        {msgError ? <div className='alert alert-danger'>{msgError}</div>:null}

       <form action="" onSubmit={forms.handleSubmit}>
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
        <div className="data d-flex justify-content-between align-items-center">
          <Link to={'/forgetpassword'}>
          <button className='btn btn-danger'>Forget Password ?</button>
          </Link>
        <button className={`btn bg-main text-white ms-auto d-block my-3 ${isLoading ? 'disabled' : ''}`} disabled={!(forms.isValid && forms.dirty)}>
          {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Login"}
          </button>
        </div>
       </form>
      </div>
      </div>
      </HelmetProvider>

    </>
  )
}
