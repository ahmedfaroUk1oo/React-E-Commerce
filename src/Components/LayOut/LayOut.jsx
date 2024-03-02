import React from 'react';
import styles from './LayOut.module.css';
import NavBar from './../NavBar/NavBar';

import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export default function LayOut() {
  return (
    <>
      <NavBar />
      <Outlet  />
      <Toaster/>
      
    </>
  )
}
