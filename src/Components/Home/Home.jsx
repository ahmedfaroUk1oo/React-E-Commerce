import React, { useContext, useEffect } from 'react';
import styles from './Home.module.css';
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';



export default function Home() {


 
  return (
    <>
    <HelmetProvider>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
            </Helmet>
      <MainSlider />
      <CategorySlider />
     <FeaturedProducts />
     </HelmetProvider>
    </>
  )
}
