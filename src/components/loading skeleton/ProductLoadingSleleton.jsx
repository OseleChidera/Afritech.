"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import imgplaceholder from '../../../public/images/imgplaceholder.jpg'

const ProductLoadingSleleton = ({  }) => {
   

    return (
        <div className="product  relative rounded-xl  bg-white overflow-hidden max-w-fit animate-pulse">
            <div className=" w-fit  max-h-fit rounded-xl  shadow-2xl bg-whie border-[0.2px] border-black overflow-hidden mx-auto animate-pulse mb-2">
                <Image src={imgplaceholder} className="object-cover aspect-square " width={180} height={180} alt="image skeleton" priority/>
            </div>
            <div className="info p-2">
                <div className="h-[0.6rem] bg-gray-500 rounded-full mb-3 animate-pulse"></div>
                <div className="h-2 bg-gray-500 rounded-full mb-2 animate-pulse w-4/5"></div>
                <div className="h-2 bg-gray-500 rounded-full mb-2 animate-pulse w-3/5"></div>
            </div>
           

        </div>
    );
};

export default ProductLoadingSleleton;







