import React from 'react';
import styles from './Loader.module.css';
import {  GridLoader } from 'react-spinners';

export default function Loader() {
  return (
    <>
        <div className="container d-flex justify-content-center">
      <GridLoader color="#46C046"  className='  py-4' />
      </div>
    </>
  )
}
