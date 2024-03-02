import React, { useContext } from 'react';
import styles from './Products.module.css';

import FeaturedProducts from './../FeaturedProducts/FeaturedProducts';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Products() {

 
  return (
    <>
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
            </Helmet>
  <FeaturedProducts />
    </HelmetProvider>
   </>
  )
}
