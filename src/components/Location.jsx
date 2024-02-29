'use client'
import React, {useEffect, useState} from 'react'
import { setUserId , setAuthCallbackUser , setData , setCurrentfirebaseUserInfo } from '@/redux/user'
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch hooks from react-redux
import Cart from './cartItem/Cart'
import { getUserData, fetchProductsData } from '@/utils/helperFunctions' 
import { setupAuthObserver } from "../../firebaseAuth"; // Import setupAuthObserver function from firebaseAuth module
import { useRouter, usePathname } from "next/navigation"; // Import useRouter and usePathname hooks from next/navigation



const Location = () => {
  const pathName = usePathname(); // Get current pathname using usePathname hook
  const dispatch = useDispatch(); // Get dispatch function from useDispatch hook
  const [showCart, setShowCart] = useState(false)
  
  const userID = useSelector((state) => state.user.userID);
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
  const data = useSelector((state) => state.user.data);
  



  function showCartFn(fetchCartItems) {
        setShowCart(!showCart)
        // console.log(showCart)
  }
    
  
  


  return (
    <div className='flex items-center justify-between border border-black w-full p-2 py-4 sticky z-10 top-0 bg-[#695acd] text-white'>
        <div className="location flex items-center gap-1 relative ">
        <span className='capitalize underline underline-offset-1'>{data?.userData?.locationOption}</span>
        </div>
          
      <Cart setShowCart={setShowCart} showCartFn={showCartFn} showCart={showCart} userIDString={userID}/>
    </div>
  )
}

export default Location