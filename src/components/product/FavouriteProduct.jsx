"use client";
import Image from "next/image"; // Importing Image component from Next.js
import React, { useEffect, useState } from "react"; // Importing React and necessary hooks
import addIcon from "../../../public/icons/add.svg"; // Importing add icon image
import trashIcon from "../../../public/icons/trashIcon.svg"; // Importing trash icon image
import Link from "next/link"; // Importing Link component from Next.js
import {
    formatNumberWithCommas,
    addItemsToCart,
    addItemsToFavourites,
    removeItemFromFavourites
} from "../../utils/helperFunctions"; // Importing utility functions
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux

// Product component to display individual product information
const Product = ({ id, name, price, productID, favouriteItemID, image, productObj, collectionString , array , qty}) => {
    const [productCartID, setProductCarTID] = useState(""); // State to manage product cart ID
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo); // Get user information from Redux store

    const userID = useSelector((state) => state.user.userID); // Get user ID from Redux store

    // Function to remove product from favourites
    function removeFromFavourites() {
        removeItemFromFavourites(id, userID, collectionString);
    }

    // Function to add item to cart from product
    function addItemToCartFromProduct() {
        addItemsToCart(id, 1, userID, setProductCarTID, collectionString);
    }

    useEffect(() => {

    }, []);

    return (
        <div className={`relative  rounded-xl  bg-white    border-[0.02px] border-black ${array > 2 ? 'w-full' : "w-[180px]"}`}>
            {/* Product image */}
            <div className="max-h-fit rounded-xl  shadow-2xl bg-white  border-black overflow-hidden mx-auto">
                <Image src={image} className="aspect-square w-full" width={170} height={170} alt="favourite product image"/>
            </div>
            {/* Product information */}
            <Link href="/product/[id]" as={`/product/${id}`}>
                <div className="info p-2">
                    <h2 className="text-base font-semibold ">{name}</h2>
                    <h3 className="text-sm">₦{formatNumberWithCommas(price)}</h3>
                </div>
            </Link>
            {/* Add to cart button */}
            {(firebaseUserInfo?.accountVerified && qty !== 0) && (
                <div
                    className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none runded rounded-tr-none p-[0.3rem]"
                    onClick={addItemToCartFromProduct}
                >
                    <Image src={addIcon} width={20} alt="favourite add icon"/>
                </div>
            )}
            {/* Remove from favourites button */}
            <div
                className="absolute bg-[#695acde4] top-0 right-0 rounded-tr-xl rounded-br-none rounded-bl-xl runded rounded-tl-none p-[0.3rem]"
                onClick={() => removeFromFavourites()}
            >
                <Image src={trashIcon} width={20} alt="favourite minus icon"/>
            </div>
        </div>
    );
};

export default Product;
