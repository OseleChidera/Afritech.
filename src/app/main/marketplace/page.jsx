'use client'; // Indicate that this code runs on the client side
import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import Nav from '@/components/Nav'; // Import Nav component
import Product from '@/components/product/Product'; // Import Product component
import SearchBar from '@/components/searchbar/SearchBar'; // Import SearchBar component
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch hooks from react-redux
import BrandOptions from '@/components/brandOptions/BrandOptions'; // Import BrandOptions component
import ProductLoadingSleleton from '@/components/loading skeleton/ProductLoadingSleleton'; // Import ProductLoadingSleleton component
import { getUserData } from '@/utils/helperFunctions'; // Import getUserData function
import { setPopularProductsData, setCurrentfirebaseUserInfo, setuserFavouritesData, setuserCartData, setuserFinancingData } from '@/redux/user'; // Import actions from Redux user slice
import UnauthorizedAccess from '@/components/UnauthorizedAccess/UnauthorizedAccess'; // Import UnauthorizedAccess component

const page = () => {
    // Redux state management
    const data = useSelector((state) => state.user.data); // Get data from Redux store
    const [productsArrays, setProductsArrays] = useState(); // Local state for productsArrays
    const userID = useSelector((state) => state.user.userID); // Get userID from Redux store

    // Function to filter products based on brand or name
    function filterProducts(value) {
        const results = value === "all" ? 
        data?.productsArray?.concat(data?.popularProductsArray) 
        : 
        data?.productsArray?.concat(data?.popularProductsArray).filter((product) => {
            return product.name === value || product.brandID == value;
        });
        // console.log(`results: ${value} ` + results);
        setProductsArrays(results);
    }

    // Function to search for products
    function search(searchQuery){
        console.log(searchQuery)
        const results = (searchQuery == "" ) ?
            data?.productsArray?.concat(data?.popularProductsArray)
            :
            data?.productsArray?.concat(data?.popularProductsArray).filter((product) => {
                return product?.name?.includes(searchQuery.trim().toLowerCase()) || product?.brandID?.includes(searchQuery.trim().toLowerCase());
            });
        // console.log(`results: ${searchQuery} ` + data?.productsArray?.concat(data?.popularProductsArray));
        // console.log("results: " + JSON.stringify(results));
        setProductsArrays(results.length == 0 ? data?.productsArray?.concat(data?.popularProductsArray) : results);
    }
    
    // Update productsArrays when data.productsArray or data.popularProductsArray changes
    useEffect(() => {
        const products = (data.productsArray && data.popularProductsArray) ? data.productsArray.concat(data.popularProductsArray) : []
        setProductsArrays(products)
    }, [data.productsArray, data.popularProductsArray])

    return (
        <>
            <div className='w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto'>
                <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
                    <SearchBar search={search}/> {/* Render SearchBar component */}
                    <BrandOptions filterProducts={filterProducts}/> {/* Render BrandOptions component */}
                    <div className="grid-container">
                        {
                            data?.productsArray ?
                                (productsArrays?.map((product,index) => (<Product key={index} name={product.name} qty={product.qty} price={product.price} id={product.id} image={product?.imageGalleryImages[0].imageURL} collectionString={product.collectionString} productObj={product} />))) : 
                            ([...new Array(10)].map((product,index) => (<ProductLoadingSleleton key={index}/>)))
                        }
                    </div>
                </div>
                <Nav />
            </div>
        </>
    )
}

export default page; // Export the page component
