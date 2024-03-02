import React from 'react';
import styles from './NotFound.module.css';
import notFoundImg from '../../Assets/error.svg';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Not Found</title>
            </Helmet>
      <section className='container my-5 d-flex justify-content-center'>
        <img src={notFoundImg} className='w-50' alt="NotFoundPage" />
      </section>
    </HelmetProvider>

    </>
  )
}
