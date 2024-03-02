import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";




export const wishListContext = createContext();



export default function WishListProdvider({children}) {

    const [isLoading,setIsLoading] = useState(true)
    const [wishListData, setWishListData] = useState([]);
    

const headers = {
  token : localStorage.getItem("userToken")
}



async function AddToWishList(id) {
  try {
    const {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {productId : id}, {headers : headers});
    if(data?.status === 'success'){
      toast.success('Product added successfully to your wishlist')
      GetWishListItems();
    }
    } catch (error) {
        toast.error("something went wrong");
    }
}


async function RemoveFromWishList(id) {
  try {
    const {data} =await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {headers : headers});
    if(data.status === 'success') {
      toast.success('Product removed successfully from your wishlist')
      GetWishListItems()
    }
  } catch (error) {
    toast.error("something went wrong")
  }
}

async function GetWishListItems() {
  try {
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {headers:headers});
  if(data.data.length == 0) {
    setIsLoading(false);
}
    if(data.status === 'success') {
        setWishListData(data.data);
        setIsLoading(false)
       
    }
    


return data
  } catch (error) {
    window.location.href = `${window.location.origin}/home`
  }
}


async function ToggleInWishlist(wishListId) {
   await GetWishListItems().then((wishData)=>{
    if(wishData?.data.length) {
      if(wishData?.data.find((el)=> el.id === wishListId ) !== undefined){
      RemoveFromWishList(wishListId) }else {
        AddToWishList(wishListId)
      }
    }else {
     AddToWishList(wishListId)
    } 
   } )
  }


    return <>
    <wishListContext.Provider value={{ToggleInWishlist,wishListData,setWishListData,GetWishListItems,isLoading}}>
        {children}
    </wishListContext.Provider>
    </>
}
