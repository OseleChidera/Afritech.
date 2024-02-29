'use client'; 
import Location from '@/components/Location'; // Import Location component
import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import { setupAuthObserver } from "../../../firebaseAuth"; // Import setupAuthObserver function from firebaseAuth module
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch hooks from react-redux
import { setCurrentfirebaseUserInfo, setUserId, setLoading, setAuthCallbackUser, setProductsData, setPopularProductsData, setuserCartData, setuserFavouritesData, setuserFinancingData, setData } from '../../redux/user'; // Import action creators from user Redux slice
import { database } from '../../../firebaseConfig'; // Import database from firebaseConfig
import { collection, getDocs, getDoc, getFirestore, doc, onSnapshot } from "firebase/firestore"; // Import firestore functions
import { getUserData, fetchProductsData } from '@/utils/helperFunctions'; // Import getUserData and fetchProductsData functions from helperFunctions module
import Nav from '@/components/Nav'; // Import Nav component
import { useRouter, usePathname } from "next/navigation"; // Import useRouter and usePathname hooks from next/navigation
import { getAuth , onAuthStateChanged } from 'firebase/auth';


const layout = ({ children }) => {
  const router = useRouter()
  const auth = getAuth()
  const dispatch = useDispatch(); // Get dispatch function from useDispatch hook
  const [userData, setUserData] = useState(null); 
  const pathName = usePathname(); // Get current pathname using usePathname hook
  const [fetchedData, setFetchedData] = useState({ // Local state for fetched data
    userData: null,
    productsArray: null,
    popularProductsArray: null,
    favouritesArray: null,
    cartArray: null,
    paymentArray: null,
    paymentCompleteArray: null
  });

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
            // console.log('User is authenticated ', user.uid);
          } else {
            console.log('User is not authenticated');
            router.push("/signin")
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

useEffect(()=>{

},[])
  return (
    <div className='w-full min-h-screen max-h-fit bg-[#ffffff] relative shadow-2xl'>
      <Location /> {/* Render Location component */}
      {children} {/* Render children components */}
    </div>
  );
}

export default layout; // Export the layout component
