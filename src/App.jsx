
import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import LayOut from './Components/LayOut/LayOut';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Products from './Components/Products/Products';
import TokenContextProvider, { tokenContext } from './Context/Token';
import { useContext, useEffect } from 'react';
import Protected from './Components/ProtectedRoutes/Protected';
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CheckOut from './Components/CheckOut/CheckOut';
import MyOrders from './Components/MyOrders/MyOrders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Verify from './Components/Verify/Verify';
import NewPassword from './Components/NewPassword/NewPassword';
import WishList from './Components/WishList/WishList';

function App() {

  let {token,setToken} = useContext(tokenContext);

  const routes = createHashRouter([
    {path : "" , element : < LayOut /> , children : [
      {path : "home" ,element :<Protected><Home /></Protected>},
      {index : true ,element :<ProtectedAuth><Login /></ProtectedAuth>},
      {path : "brands" ,element :<Protected><Brands /></Protected>},
      {path : "categories" ,element :<Protected><Categories /></Protected>},
      {path : "products" ,element :<Protected><Products /></Protected>},
      {path : "wishlist" ,element :<Protected><WishList /></Protected>},
      {path : "cart" ,element :<Protected><Cart /></Protected>},
      {path : "checkout" ,element :<Protected><CheckOut /></Protected>},
      {path : "allorders" ,element :<Protected><MyOrders /></Protected>},
      {path : "details/:id" ,element :<Protected><ProductDetails /></Protected>},
      {path : "login" ,element :<ProtectedAuth><Login /></ProtectedAuth>},
      {path : "forgetpassword" ,element :<ProtectedAuth><ForgetPassword /></ProtectedAuth>},
      {path : "verifycode" ,element :<ProtectedAuth><Verify /></ProtectedAuth> },
       { path : "newpassword" ,element :<ProtectedAuth><NewPassword /></ProtectedAuth> },
      {path : "register" ,element :<ProtectedAuth><Register /></ProtectedAuth>},
      {path : "*" ,element :<NotFound />},

    ]}
  ])

  useEffect (()=>{
    if(localStorage.getItem("userToken")!= null) {
      setToken(localStorage.getItem("userToken"))
    }
  },[])


  return (


<RouterProvider router={routes}></RouterProvider>

  );
}

export default App;
