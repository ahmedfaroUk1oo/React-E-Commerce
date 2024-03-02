import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CounterProvuder from './Context/Counter';
import TokenContextProvider from './Context/Token';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import CartContextProvider from './Context/CartContext';
import { Offline } from 'react-detect-offline';
import WishListProdvider from './Context/WishList';




const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
<div >
    <Offline>
      <div className='alert alert-danger position-fixed top-0 z-3 '>
       Oops!! Check Your Network
      </div>
    </Offline>
  </div>
<React.StrictMode>
    <TokenContextProvider>
    <CartContextProvider>
  <WishListProdvider>
    <QueryClientProvider client={queryClient}>
   <CounterProvuder >
   <App  />
   </CounterProvuder>
   
    </QueryClientProvider>
    </WishListProdvider>
    </CartContextProvider>
   </TokenContextProvider>
  </React.StrictMode>
</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
