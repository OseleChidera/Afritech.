'use client'; // Indicates that this code runs on the client side
export const dynamicParams = false; // Export a constant indicating dynamic params are false
import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import Image from 'next/image'; // Import Image component from Next.js
import GalleryImage from '@/components/marketplace/GalleryImage'; // Import GalleryImage component
import Link from 'next/link'; // Import Link component from Next.js
import { database } from '../../../../firebaseConfig'; // Import database from firebaseConfig
import { collection, getDocs, setDoc, getDoc, getFirestore, doc, onSnapshot } from "firebase/firestore"; // Import firestore functions
import { fetchProductDataById, formatNumberWithCommas } from '../../../utils/helperFunctions'; // Import helper functions
import Location from '@/components/Location'; // Import Location component
import addICON from '../../../../public/icons/add-01.svg'; // Import addICON from public folder
import minus from "../../../../public/icons/minus-sign.svg"; // Import minus icon from public folder
import AddToCartBtn from '@/components/product/AddToCartBtn'; // Import AddToCartBtn component
import Reviews from '@/components/product/Reviews'; // Import Reviews component
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch hooks from react-redux
import DynamicProductLoadingSkeleton from '@/components/loading skeleton/DynamicProductLoadingSkeleton'; // Import DynamicProductLoadingSkeleton component

export default function Page({ params }) {
    const productID = params.id; // Extract productID from params
    const [product, setProduct] = useState({}); // State for storing product data
    const [productId, setProductId] = useState(productID); // State for storing product ID
    const [mainImage, setMainImage] = useState(''); // State for storing main image URL
    
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo); // Get firebaseUserInfo from Redux store
    const data = useSelector((state) => state.user.data); // Get data from Redux store
    
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State for storing selected image index

    // Function to select gallery image
    const selectGalleryImage = (index) => {
        setSelectedImageIndex(index); // Set selected image index
        setMainImageFn(product.imageGalleryImages[index].imageURL); // Call setMainImageFn with image URL
    };

    // Function to set main image
    const setMainImageFn = (imageUrl) => {
        setMainImage(imageUrl); // Set the main image based on selected index
    };

    // useEffect hook to fetch product data
    useEffect(() => {
        fetchProductDataById(productID, setProduct, setMainImage, "Products"); // Fetch product data by ID
    }, [productID]);

    return (
        <>
            <Location />
            {product.qty  ? (
                <div className="w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto p-6">
                    <div className={`flex flex-col gap-4  ${data?.userData?.accountVerified ? '' : ` mb-4`}`}>
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
                                    {/* Map through product images and render GalleryImage component */}
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
                            <Link href={`${product?.link}`} className='capitalize font-semibold text-xl underline underline-offset-1'>
                                <button className='font-bold bg-[#695acd] text-white rounded-xl text-xl capitalize px-4 py-[0.55rem] relative mb-4'>find out more</button>
                            </Link>
                        </div>
                        
                    </div>
                    {/* Render Reviews and AddToCartBtn components if user account is verified */}
                    {data?.userData?.accountVerified && (
                        <div className='mb-[100px]'>
                            <Reviews productId={productId} reviews={product?.reviews} collectionString={'Products'} />
                            {product?.qty !== 0 && <AddToCartBtn productID={productId} qty={product?.qty} price={product?.price} collectionString={"Products"} />}
                        </div>
                    )}
                </div>
            ) : <DynamicProductLoadingSkeleton />} {/* Render DynamicProductLoadingSkeleton component if product data is not available */}
        </>
    );
}
