import axios from "axios";
import { createContext, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';






export let carContext = createContext();

export default function CartContextProvider(props) {
  
  const [countItem, setCountItem] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [isLoading,setIsLoading] = useState(false)
  const headers = {token :localStorage.getItem("userToken")};


   



async function AddToCart(id) {
  try {
    const {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:id},{headers})
    setCountItem(data.numOfCartItems);
    toast.success("Product Added SuccessFully");
    setIsLoading(true)
    return data
  } catch (error) {
    toast.error("something went wrong");

    
  }
}

async function GetUserCart(){
  try {
    const {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers});
setCountItem(data.numOfCartItems);
setCartId(data.data._id)
return data;

  } catch (error) {
  
  }

}

async function RemoveSpecificItem (id) {
  try {
    const {data} =await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers});
    toast.success("Product SuccessFully Deleted");
    return data
  } catch (error) {
    toast.error("Something Went Wrong!");
  }
}

async function UpdateQty(id,count) {
try {
  const {data} =await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers});
  toast.success("Product SuccessFully Updated");
  return data
} catch (error) {
  toast.error("Something Went Wrong!");
}
}

async function ClearCart() {
  try {
  const data =await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers});
        toast.success("Cart Successfully Cleared");
        setIsLoading(false);
        return data;
  } catch (error) {
    toast.error("Something Went Wrong!");

  }
}




return <carContext.Provider value={{AddToCart,setCountItem,countItem,GetUserCart,RemoveSpecificItem,setCartId,cartId,UpdateQty,ClearCart,isLoading,setIsLoading}} >
    {props.children}
</carContext.Provider>
}