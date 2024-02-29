'use client'
export const dynamicParams = false;
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import GalleryImage from '@/components/marketplace/GalleryImage';
import Link from 'next/link';
import { database } from '../../../../firebaseConfig';
import { collection, getDocs, setDoc, getDoc, getFirestore, doc, onSnapshot } from "firebase/firestore";
import { fetchProductDataById, formatNumberWithCommas } from '../../../utils/helperFunctions'
import Location from '@/components/Location';
import addICON from '../../../../public/icons/add-01.svg'
import minus from "../../../../public/icons/minus-sign.svg"
import AddToCartBtn from '../../../components/product/AddToCartBtn';
import Reviews from '../../../components/product/Reviews';
import { useSelector, useDispatch } from "react-redux";
import DynamicProductLoadingSkeleton from '@/components/loading skeleton/DynamicProductLoadingSkeleton';
import { useRouter, usePathname } from "next/navigation"; // Import useRouter and usePathname hooks from next/navigation
import { setupAuthObserver } from "../../../../firebaseAuth"; 
import { getUserData, fetchProductsData } from '@/utils/helperFunctions'; // Import getUserData and fetchProductsData functions from helperFunctions module
import { setCurrentfirebaseUserInfo, setUserId, setLoading, setAuthCallbackUser, setProductsData, setPopularProductsData, setuserCartData, setuserFavouritesData, setuserFinancingData, setData } from '../../../redux/user'; // Import action creators from user Redux slice



export default function Page({ params }) {
    const dispatch = useDispatch(); 
    const productID = params.id
    const [product, setProduct] = useState({})
    const [productId, setProductId] = useState(productID)
    const [mainImage, setMainImage] = useState('')
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    const data = useSelector((state) => state.user.data);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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

    const selectGalleryImage = (index) => {
        setSelectedImageIndex(index);
        setMainImageFn(product.imageGalleryImages[index].imageURL);
    };

    const setMainImageFn = (imageUrl) => {
        // Set the main image based on selected index
        setMainImage(imageUrl);
    };


useEffect(() => {
        fetchProductDataById(productID, setProduct, setMainImage,"PopularProducts")
    }, [])


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
                console.log('User is authenticated in mMMmmMM', user.uid);
              } else {
                console.log('User is not authenticated.mMMmmMM');
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
      }, [pathName]);
    
      // Dispatch actions to set Redux state with fetched data
      useEffect(() => {
        dispatch(setCurrentfirebaseUserInfo(fetchedData.userData));
        dispatch(setData(fetchedData));
    }, [fetchedData]);
    // console.log('data?.userData?.accountVerified : ', fetchedData?.userData?.accountVerified)
    


    // console.log('main image', mainImage)
    // console.log('product: ', product)
    
    return (
        <>
            <Location />
            {(product?.qty || product?.price) ? (<div className="w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto p-6">
                <div className={`flex flex-col gap-4  ${fetchedData?.userData?.accountVerified ? '' : ` mb-4`}`}>
                    <div
                        id="product-image-tag"
                        className="w-full h-[20%] border border-black shadow-2xl overflow-hidden rounded-md p-2 product-hero-image"
                    >
                        {mainImage && (
                            <Image
                                src={mainImage}
                                alt="product-image"
                                className="object-contain w-auto h-auto mx-auto"
                                width={300}
                                height={300}
                                priority
                            />
                        )}
                    </div>
                    <div id="product-details">
                        <div className="flex justify-between mb-4">
                            <div className="flex flex-col">
                                <h1 className="capitalize font-bold text-2xl">
                                    {product?.name}
                                </h1>
                                <h2 className="capitalize font-semibold text-lg">
                                    ₦{formatNumberWithCommas(product?.price)}
                                </h2>
                            </div>
                            <div className="flex items-center relative bottom-0 ">
                                <Link href="/main/home">
                                    <button className="font-bold bg-[#695acd] text-white rounded-xl text-xl capitalize px-4 py-[0.55rem] relative float-right self">
                                        Home
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div id="item-gallery" className="flex flex-col gap-1 mb-3">
                            <div className="flex gap-4 overflow-x-auto p-1 items-center hide-scrollbar">
                                {product?.imageGalleryImages?.map((image, index) => (
                                    <GalleryImage
                                        key={index}
                                        imageUrl={image.imageURL}
                                        index={index}
                                        selectGalleryImage={selectGalleryImage}
                                        selected={index === selectedImageIndex}
                                    />
                                ))}


                            </div>
                        </div>
                        <p className="text-gray-700 text-lg indent-12  margin-0 ">
                            {product?.description}
                        </p>
                    </div>
                    
                    <div>
                        <Link href={`${product?.link}`} className=' capitalize font-semibold text-xl underline underline-offset-1' >
                            <button className='font-bold bg-[#695acd] text-white rounded-xl text-xl capitalize px-4 py-[0.55rem] relative mb-4'>find out more </button>
                        </Link>
                    </div>
                </div>
                {fetchedData?.userData?.accountVerified && (<div className="mb-[100px]">
                    {fetchedData?.userData?.accountVerified && (<Reviews productId={productId} reviews={product?.reviews} collectionString={"PopularProducts"} />)}
                    {(product?.qty !== 0 && fetchedData?.userData?.accountVerified) && (<AddToCartBtn productID={productId} qty={product?.qty} price={product?.price} collectionString={"PopularProducts"} />)}
                </div>)}
            </div>) : <DynamicProductLoadingSkeleton/>}
        </>
    );
}




