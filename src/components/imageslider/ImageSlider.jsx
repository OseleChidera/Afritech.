import React, { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { useSelector } from "react-redux";
import Link from 'next/link';
import Image from 'next/image';
import imagePlaceholder from "../../../public/images/imgplaceholder.jpg";

export default function ImageSlider() {
    // Retrieve popular products from Redux store
    const popularProductsArray = useSelector((state) => state.user.data?.popularProductsArray);


const divStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '40vh',
};


    return (
        <Slide>
            {popularProductsArray ? (
                popularProductsArray.map((product, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${product.imageGalleryImages[Math.floor(Math.random() * 6)].imageURL})` }}>
                            {/* <Image src={product.imageGalleryImages[Math.floor(Math.random() * 6)].imageURL} priority width={300} height={300}/> */}
                            <Link href={`/popularProduct/${product.id}`}>
                                <span className='font-bold bg-[#695acd] text-white rounded-xl text-xs capitalize px-4 py-[0.55rem] absolute bottom-[1rem] right-[1rem]'>{product.name}</span>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                // Render loading skeleton if popularProductsArray is not available
                [...new Array(5)].map((_, index) => <ImageSliderLoadingSkeleton key={index} />)
            )}
        </Slide>
    );
}

const ImageSliderLoadingSkeleton = () => {
    return (
        <div className=''>
            <div className="relative flex justify-center items-center h-[300px] w-full">
                {/* Render image placeholder */}
                <Image src={imagePlaceholder} className='w-full h-full rounded-sm' alt='image slider product' width={300} height={300} priority/>
            </div>
        </div>
    );
};
