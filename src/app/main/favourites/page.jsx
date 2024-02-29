"use client"; 
import Nav from '@/components/Nav'; // Import Nav component
import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import SearchBar from '@/components/searchbar/SearchBar'; // Import SearchBar component
import FavouriteProduct from '@/components/product/FavouriteProduct'; // Import FavouriteProduct component
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch hooks from react-redux
import { getUserData } from '../../../utils/helperFunctions'; // Import getUserData function
import FavouriteProductLoadingSleleton from '@/components/loading skeleton/FavouriteProductLoadingSleleton'; // Import FavouriteProductLoadingSleleton component

export default function page() {
  // Redux state management
  const favouritesArray = useSelector((state) => state.user.data?.favouritesArray); // Get favourites array from Redux store
  const [arrayWithoutEmptyStrings, setArrayWithoutEmptyStrings] = useState([]); // Local state for array without empty strings

  useEffect(() => {
    // Fetch data or perform any side effects when favouritesArray changes
    setArrayWithoutEmptyStrings(favouritesArray?.filter(arrayItem => typeof arrayItem === "object" && arrayItem !== null) || []);
  }, [favouritesArray]); // Run effect whenever favouritesArray changes

  return (
    <div className="w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto">
      <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
        <div className={arrayWithoutEmptyStrings.length <= 3 ? `w-full flex flex-row gap-[20px]` : `grid-container`}>
          {!arrayWithoutEmptyStrings ? (
            // Display loading skeleton while favouritesArray is being fetched
            [...new Array(8)].map((item, index) => <FavouriteProductLoadingSleleton key={index} />)
          ) : (
            // Check if arrayWithoutEmptyStrings is empty
            arrayWithoutEmptyStrings.length !== 0 ? (
              // Map through arrayWithoutEmptyStrings if it's not empty
              arrayWithoutEmptyStrings.map((product) => (
                <FavouriteProduct
                  key={product.productID}
                  name={product.name}
                  price={product.price}
                  id={product.productID}
                  qty={product.qty}
                  image={product?.imageGalleryImages[0].imageURL}
                  collectionString={product.collectionString}
                  productObj={product}
                  array={arrayWithoutEmptyStrings}
                />
              ))
            ) : (
              // Display "No Items To Display" text if arrayWithoutEmptyStrings is empty
              <div className="border border-black h-[50vh] w-[90vw] mx-auto text-xl text-[#695acd] flex items-center justify-center">
                <div className="h1">No Item(s) To Display</div>
              </div>
            )
          )}
        </div>
      </div>
      <Nav /> 
    </div>
  );
}
