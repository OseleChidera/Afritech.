import React, { Suspense, useState } from 'react';
import PopularProduct from '../product/PopularProduct'; // Importing PopularProduct component
import Link from 'next/link'; // Importing Link component from Next.js
import { useSelector, useDispatch } from "react-redux"; // Importing useSelector and useDispatch hooks from react-redux
import { usePathname } from "next/navigation"; // Importing usePathname hook from Next.js navigation module
import ProductLoadingSleleton from '../loading skeleton/ProductLoadingSleleton'; // Importing ProductLoadingSleleton component for loading skeleton

// Component to display popular items
const PopularItems = () => {
 
  const data = useSelector((state) => state.user.data); // Accessing user data from Redux store
  const pathName = usePathname(); // Getting current pathname using usePathname hook
  const [isPathNameActive, setIsPathNameActive] = useState(pathName.includes(`/popularproduct/`)); // State to track if current pathname includes '/popularproduct/'

  return (
    <div className="w-full p-4 shadow-md">
      <div className="flex w-full justify-between mb-2">
        <h2 className="capitalize text-[#695acde4] text-lg">shop items</h2>
        <Link href={`/main/marketplace`}><button className="capitalize border-none bg-[#695acde4] text-white rounded-lg text-xl px-3 py-1">see all</button></Link>
      </div>
      <div className="grid-container">
        {/* Check if popular products data exists */}
        {data?.popularProductsArray ? (
          // If popular products data exists, map through each product and render PopularProduct component
          data?.popularProductsArray?.map((product, index) => (
            <PopularProduct key={index} name={product.name} qty={product.qty} price={product.price} id={product.id} image={product?.imageGalleryImages[Math.floor(Math.random() * 6)].imageURL} collectionString={product.collectionString} productObj={product} />
          ))
        ) : (
          // If popular products data does not exist, render loading skeletons
          ([...new Array(10)].map((product, index) => (<ProductLoadingSleleton key={index} />)))
        )}
      </div>
    </div>
  );
}

export default PopularItems;
