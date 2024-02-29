"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import addIcon from "../../../public/icons/add.svg";
import favourite from "../../../public/icons/favourite.svg";
import favouriteClicked from "../../../public/icons/favouriteChecked.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    formatNumberWithCommas,
    addItemsToCart,
    removeItemFromCart,
    addItemsToFavourites,
    removeItemFromFavourites
} from "../../utils/helperFunctions";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

const PopularProduct = ({ id, name, qty ,price, productID, favouriteItemID, image, productObj, collectionString }) => {
    const pathName = usePathname();
    const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [productFavouritedArray, setProductFavouritedArray] = useState(productObj?.
        userFavourited);
    const [productCartID, setProductCarTID] = useState("");
    const [productFavouriteID, setProductFavouriteID] = useState("");

    //When a product is added to the car, some properties are removed from the product object and some properties are added like isCkecked
    const [isPathNameActive, setIsPathNameActive] = useState(
        pathName.includes(`/main/favourite`)
    );
    const userID = useSelector((state) => state.user.userID);
    const userFavourites = useSelector((state) => state.user.userFavourites);
    const data = useSelector((state) => state.user.data);
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    let isFavourited = productObj?.userFavourited.includes(userID);

    
    function checkIfUserAddedToFavourite(userFavourites, id) {
        
        if (userFavourites) {
            let arrayItem = data?.favouritesArray?.find(product => product.productID == id)
            // console.log("check ", arrayItem)
            if (!arrayItem) {
                return false
            }
            return true
        }
    }
    checkIfUserAddedToFavourite(userFavourites, id)

    function addItemToCartFromProduct() {
        setIsInCart(!isInCart);

        addItemsToCart(id, 1, userID, setProductCarTID, "PopularProducts");
        // console.log("productCartIDDDDDDDDD" + productCartID);
    }

    function removeFromFavourites() {
        // console.log("removeFromFavourites got called");
        removeItemFromFavourites(id, userID, collectionString)
    }

    function addtoFavourites() {
        // setIsFavourited(!isFavourited);
        console.log("productID", id)
        console.log("productObj.userFavourited", productObj.userFavourited)
        addItemsToFavourites(id, userID, setProductFavouriteID, collectionString);
        // console.log("ProductFavouriteID" + setProductFavouriteID);
    }

    function removeProductFromCart(productCartID) {
        if (productCartID == "") {
            return;
        }
        removeItemFromCart('PopularProducts' , id, favouriteItemID, userID);
        setIsInCart(!isInCart);
    }




    useEffect(() => {

    }, [])

    return (
        <div className=" relative  rounded-xl  bg-white w-full   border-[0.02px] border-black">
            <div className="max-h-fit rounded-xl  shadow-2xl bg-white  border-black overflow-hidden mx-auto">
                <Image src={image} className=" w-full" width={170} height={170} alt="product" priority objectFit="cover"/>
            </div>
            <Link href="/product/[id]" as={`/popularProduct/${id}`}>
                <div className="info p-2">
                    <h2 className="text-base font-semibold ">{name}</h2>
                    <h3 className="text-sm">₦{formatNumberWithCommas(price)}</h3>
                </div>
            </Link>

            {(firebaseUserInfo?.accountVerified && qty !== 0) &&  (
                    <div
                        className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none runded rounded-tr-none p-[0.3rem]"
                        onClick={addItemToCartFromProduct}
                    >
                        <Image src={addIcon} width={20} height={20} alt="popular product add icon"/>
                    </div>
                )
            }

            {firebaseUserInfo?.accountVerified && (isFavourited && checkIfUserAddedToFavourite(userFavourites, id) ?
                (<div onClick={() => removeFromFavourites()} className={`absolute bg-[#695acde4] top-0 right-0 rounded-t-nne rounded-br-none rounded-bl-xl runded rounded-tr-xl p-[0.3rem]`}>
                    <Image src={favouriteClicked} width={20} height={20} className={`scaleLikeIcon`} alt="popular product favourite icon"/>
                </div>)
                :
                (<div onClick={() => addtoFavourites()} className={`absolute bg-[#695acde4] top-0 right-0 rounded-t-nne rounded-br-none rounded-bl-xl runded rounded-tr-xl p-[0.3rem]`}>
                    <Image src={favourite} width={20} height={20} className={``} alt="popular product favourite icon"/>
                </div>))}
        </div>
    );
};

export default PopularProduct;







