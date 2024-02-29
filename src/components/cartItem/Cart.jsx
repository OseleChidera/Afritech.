import React, { useState, useEffect } from 'react';
import cartIcon from '../../../public/icons/shopping-cart-inactive.svg';
import Image from 'next/image';
import CartItemProductComponent from './CartItemProductComponent';
import CartItemCheckout from './CartItemCheckout';
import {removeItemFromCartOnCheckout, calculateTotalPrice, formatNumberWithCommas , getUserData, fetchProductsData } from '@/utils/helperFunctions';
import { setupAuthObserver } from "../../../firebaseAuth"; // Import setupAuthObserver function from firebaseAuth module
import { useRouter, usePathname } from "next/navigation"; // Import useRouter and usePathname hooks from next/navigation
import { setUserId , setAuthCallbackUser , setData , setCurrentfirebaseUserInfo } from '../../redux/user'
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch hooks from react-redux
import { toast } from "react-toastify";

export default function Cart ({ setShowCart, showCartFn, showCart, userIDString })  {
    // State variables
    const pathName = usePathname(); // Get current pathname using usePathname hook
  const dispatch = useDispatch();
  const router = useRouter();
    const [selectCartItems, setSelectCartItems] = useState(false);
    const [itemsToCheckout, setItemsToCheckout] = useState([]);
    const [basketTotalCost, setBasketTotalCost] = useState(null);
    const [newArray, setNewArray] = useState(null);
    const [userData , setUserData] = useState(null)
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    const data = useSelector((state) => state.user.data);
    const [arrayWithoutEmptyStrings, setArrayWithoutEmptyStrings] = useState([]);
    const [fetchedData, setFetchedData] = useState({ // Local state for fetched data
        userData: null,
        productsArray: null,
        popularProductsArray: null,
        favouritesArray: null,
        cartArray: null,
        paymentArray: null,
        paymentCompleteArray: null
      });
    
     
    // Function to toggle selecting cart items
    function setSelectCartItemsFn() {
        setSelectCartItems(!selectCartItems);
    }

    // Function to remove selected cart items
    function removeSelectCartItemsFn() {
        setSelectCartItems(!selectCartItems);
        // Uncheck all checkboxes
        Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach((checkbox) => {
            checkbox.checked = false;
        });
    }

    // Function to handle checkout of all selected items
    async function handleCheckOut(userIDString) {
        if (!itemsToCheckout || itemsToCheckout.length === 0) {
            return; // No items selected for checkout
        }

        const basket = userData.cart.filter(obj => itemsToCheckout.includes(obj.cartItemID));
        const basketTotalCost = calculateTotalPrice(basket);

        if (window.confirm(`Are you sure you want to checkout ${basket.length} items which costs ₦${formatNumberWithCommas(basketTotalCost)}? /n you wont be able to undo this action see the faq for further information.`)) {
            try {
                const existingCartItems = userData.cart.filter(obj => !itemsToCheckout.includes(obj.cartItemID));
                removeItemFromCartOnCheckout(existingCartItems, userIDString, setItemsToCheckout, basket);

                // Clear selected items and itemsToCheckout array
                setSelectCartItems(false);
                toast.info('redirecting to the payment page', {autoClose: 700, onOpen: ()=> router.push(`/main/payment`)})
                
                setItemsToCheckout([]);
                setShowCart(false);
            } catch (error) {
                console.error('Error handling checkout:', error);
            }
        } else {
            console.log('User rejected checkout');
            setSelectCartItems(false);
            setItemsToCheckout([]);
        }
    }

    // Effect to filter out non-object items from the cart array
    useEffect(() => {
        const filteredArray = data?.cartArray?.filter((arrayItem) => typeof arrayItem === "object");
        setNewArray(filteredArray);
    }, [data?.cartArray]);


      // useEffect hook for fetching data and setting up authentication observer
      useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch products data
            await fetchProductsData(setFetchedData, 'Products', 'productsArray');
            await fetchProductsData(setFetchedData, 'PopularProducts', 'popularProductsArray');
    
            // Set up authentication observer
            setupAuthObserver((user) => {
              if (user) {
                getUserData(user.uid, setUserData, setFetchedData);
                dispatch(setUserId(`${user.uid}`));
                dispatch(setAuthCallbackUser(JSON.stringify(user)));
                // console.log('User is authenticated in mMMmmMM', user.uid);
              } else {
                console.log('User is not authenticated ');
              }
            });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    
        return () => {
          // Clean up the observer when the component is unmounted
        };
      }, [dispatch, pathName]);
    
      // Dispatch actions to set Redux state with fetched data
      useEffect(() => {
        dispatch(setCurrentfirebaseUserInfo(fetchedData.userData));
        dispatch(setData(fetchedData));
      }, [dispatch, fetchedData]);
    
    return (
        <div className="relative z-10">
            <div className="cart relative flex-end" onClick={() => showCartFn()}>
                <Image src={cartIcon} width={25} height={25} alt='cart icon'/>
            </div>
            <div className={`location-btn ${showCart ? 'show-cart flex flex-col gap-2' : "hidden"} w-[75vw] absolute top-10 right-0 border border-black rounded-sm p-2 bg-[#f9f9f5]`}>
                {selectCartItems ? (
                    <button onClick={() => removeSelectCartItemsFn()} className='px-5  bg-[#695acd] text-white capitalize text-center py-1 rounded-md'>
                        Cancel
                    </button>
                ) : (
                    <button onClick={() => setSelectCartItemsFn()} className='px-5  bg-[#695acd] text-white capitalize text-center py-1 rounded-md'>
                        Checkout specific items
                    </button>
                )}
                <div className={`border border-black bg-[#f9f9f5]  flex flex-col gap-2 min-h-fit max-h-[15rem]  overflow-y-auto pt-2 pb-2`}>
                    {newArray?.length !== 0 ? (
                        newArray?.map((cartItemData, index) => (
                            <CartItemCheckout key={index} selectCartItems={selectCartItems} id={cartItemData.cartItemID} cartItemData={cartItemData} itemsToCheckout={itemsToCheckout} cart={data.cartArray} collectionString={cartItemData.collectionString} />
                        ))
                    ) : (
                        <div className=" w-full text-xl text-[#695acd] flex items-center justify-center">
                            <p className="text-sm">No Item(s) To Display</p>
                        </div>
                    )}
                </div>
                <button onClick={() => handleCheckOut(userIDString)} className={`px-5  bg-[#695acd] text-white capitalize text-center py-1 rounded-md ${''}`}>
                    Checkout Items
                </button>
            </div>
        </div>
    );
};

