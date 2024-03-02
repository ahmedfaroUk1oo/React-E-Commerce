import React, { useEffect, useState } from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Brands() {
  const [brandDetails,setBrandDetails] = useState(null); 
  const[loading,setLoading] = useState(true)


 function GetBrands () {
    return  axios(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  const {data,isLoading} = useQuery("Brands",GetBrands);


  async function GetSpecificBrand (id) {
try {
  const {data} =await axios(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
setBrandDetails(data.data);
setLoading(false);
} catch (error) {
  
}

  }

  return (
    <>
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
            </Helmet>
<div className="container py-5">
  <h1 className='text-center  fw-bold pb-5 text-main'>All Brands</h1>
<div className="row g-3 text-center">
  {isLoading ? <Loader/> : null}
  {data?.data?.data.map(el=> <div className="col-md-3" key={el._id}>
  <button type="button" onClick={()=> GetSpecificBrand(el._id)} className={`btn border border-1 bg-white p-0 btn-light  ${styles.buttoon}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
  <div className="img">
    <img src={el.image} className='w-100 rounded-2' alt={el.name} />
  <p className=' text-center fw-bold  py-2'>{el.name}</p>
  </div>
</button>
  </div>    )}
</div>
</div>

 {brandDetails ? loading ? <Loader/> : <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Brand</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="details d-flex justify-content-between p-3 align-items-center flex-wrap">
          <div className="text">
            <h3 className='text-main'>{brandDetails.name}</h3>
            <p>{brandDetails.name}</p>
          </div>
          <div className="imgForBrand">
            <img src={brandDetails.image} className='w-100' height={100} alt={brandDetails.name} />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div> : <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Brand</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <Loader/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>}
</HelmetProvider>

    </>
  )
}
