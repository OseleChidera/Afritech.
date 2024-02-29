
import React from 'react';
import Image from 'next/image';
import placeholderImage from "../../../public/images/imgplaceholder.jpg"



export default function DynamicProductLoadingSkeleton({  }) {
   
    return (
        <>
            <div className="w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto p-6">
                <div className={`flex flex-col gap-4   mb-4`}>
                    <div id="product-image-tag"  className="w-full h-[20%] border border-black shadow-2xl overflow-hidden rounded-md p-2 product-hero-image animate-pulse" >
                       <Image
                            src={placeholderImage}
                                alt="product-image"
                                className="object-contain w-full h-full"
                                width={300}
                                height={300}
                                priority
                            />
                    </div>
                    <div id="product-details">
                        <div className="flex justify-between mb-4  gap-6">
                            <div className="flex flex-col  flex-1">
                                <div className="h-[0.6rem] bg-gray-500 rounded-full mb-3 animate-pulse"></div>
                                <div className="h-[0.6rem] bg-gray-500 rounded-full animate-pulse w-11/12"></div>
                            </div>
                            <div className="flex items-center relative bottom-0 ">
                                <div className='relative border-[-0.5px] border-black w-[8rem] p-2 rounded-lg  text-white bg-gray-500 text-balance h-10 animate-pulse'>

                                </div>
                            </div>
                        </div>
                        <div id="item-gallery" className="flex flex-col gap-1 mb-3">
                            <div className="h-[0.6rem] bg-gray-500 rounded-full animate-pulse w-5/12"></div>

                            <div className='relative border-[-0.5px] border-black w-full p-2 rounded-lg  text-white bg-gray-500 text-balance h-10 animate-pulse'>
                            </div>
                        </div>
                        <div className="text-gray-700 text-lg indent-12  margin-0 ">
                            <div className="h-2 bg-gray-500 rounded-full mb-2 animate-pulse w-full"></div>
                            <div className="h-2 bg-gray-500 rounded-full mb-2 animate-pulse w-full"></div>
                            <div className="h-2 bg-gray-500 rounded-full mb-2 animate-pulse w-full"></div>
                            <div className="h-2 bg-gray-500 rounded-full mb-2 animate-pulse w-full"></div>
                            <div className="h-2 bg-gray-500 rounded-full mb-2 animate-pulse w-full"></div>
                            <div className="h-2 bg-gray-500 rounded-full mb-2 animate-pulse w-11/12"></div>
                        </div>
                    </div>

                    
                        <div className='relative border-[-0.5px] border-black w-[8rem] p-2 rounded-lg  text-white bg-gray-500 text-balance h-10 animate-pulse'>
                        </div>
                    

                </div>
               
            </div>
        </>
    );
}




