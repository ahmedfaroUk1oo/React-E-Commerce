import React, { useState } from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Categories() {
const [catData,setCatData] = useState([]);
const [loading,setLoading] = useState(true);
const [expand,setexpand] = useState(false);
const [nameOfCat,setNameOfCat] = useState("");


  function GetCategories(){
    return axios(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  const {data,isLoading} = useQuery('Categories',GetCategories);


async function GetSpecificCat(id,name) {
  try {
    const {data} = await axios(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
  setCatData(data.data);
  toast.success("Scroll Down To See SubCategories")
  setNameOfCat(name)
  setLoading(false);
  setexpand(true)
  } catch (error) {
    
  }
}


  return (
    <>
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
            </Helmet>
      <div className="container py-5 m-auto">
        <h2 className='text-center  fw-bold pb-5 text-main'>All Categories</h2>
        <div className="row g-3 text-center">
        {isLoading ? <Loader/> : null}
        {data?.data?.data.map((el)=> <div className={`col-md-3 `} key={el._id} onClick={()=> GetSpecificCat(el._id,el.name)}>
  
  <div className={`img bg-white rounded-2  ${styles.category}`}>
    <img src={el.image} className='w-100 rounded-2' height={300} alt={el.name} />
  <p className=' text-center fw-bold  py-2'>{el.name}</p>
  </div>

  </div>   )}
        </div>
        

        {expand ?  <div className="row mt-5 g-3 text-center justify-content-center">
            <h2 className='text-main'>SubCategory Of {nameOfCat}</h2>
          
          {loading ? <Loader /> : catData.length ? catData.map(el=><div key={el.name} className="col-md-3 "> <div  className={`section p-3 text-center border border-1 border-secondary rounded-2 bg-white ${styles.category}`}>
<p className='p-0 m-0 fw-bold'>{el.name}</p>
</div></div>) : <h3>No SubCategories For This Product</h3>}
          
        </div> : null}
      </div>
    </HelmetProvider>

    </>
  )
}
