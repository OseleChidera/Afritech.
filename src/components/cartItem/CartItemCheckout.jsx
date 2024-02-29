import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { formatNumberWithCommas, removeItemFromCart } from '@/utils/helperFunctions';
import trashIcons from '../../../public/icons/trashIcon.svg';
import Link from 'next/link';
import { useSelector } from 'react-redux';



const CartItemCheckout = ({ id, selectCartItems, cartItemData, itemsToCheckout, cart, collectionString }) => {
    // State variable to track whether the cart item is selected
    const [isSelected, setIsSelected] = useState(false);
    // Get the current pathname using Next.js's usePathname hook
    const pathName = usePathname();
    // Get the user ID from Redux state
    const userID = useSelector((state) => state.user.userID);

    // Function to handle checkbox change
    const handleCheckboxChange = () => {
        setIsSelected(!isSelected);
        // Call a function here to handle the ID retrieval when the radio button is selected
        if (!isSelected) {
            handleSelectedId(id);
        } else {
            handleSelectedId(null);
        }
    };

    // Function to handle selected ID
    async function handleSelectedId(selectedId) {
        // Implement logic to handle the selected ID
        console.log('Selected ID:', selectedId);
        itemsToCheckout.push(selectedId);
    };

    // Function to delete an item from the cart
    function deleteItemFromCart() {
        removeItemFromCart(collectionString, cartItemData.productID, cartItemData.cartItemID, userID);
    }

    // Format the price with commas function
    const price = formatNumberWithCommas(cartItemData?.price);

    return (
        <div id="CartItemProductComponent" className={`flex gap-4 flex-1  rounded-md`}>
            {selectCartItems && (
                <input
                    type="checkbox"
                    id={id}
                    onChange={handleCheckboxChange}
                    checked={isSelected}
                    className='hidden'
                />
            )}
            <label htmlFor={id} className='flex-auto rounded-md h-fit'>
                <div className=" cart-item rounded-md relative  flex flex-1 gap-2 bg-white overflow-hidden p-2">
                    {cartItemData?.imageGalleryImages && (
                        <div className=" w-fit  h-fit rounded-xl  shadow-2xl bg-whie overflow-hidden cart-item-image">
                            <Image src={cartItemData?.imageGalleryImages[0]?.imageURL} className=" object-cover w-auto h-auto " width={70} height={70} alt='product image'/>
                        </div>
                    )}
                    <div className="info p-2 text-black">
                            {selectCartItems ? (<h2 className="text-xs font-semibold">{cartItemData?.name}</h2>) : (collectionString == "product" ? <Link href={`/product/${cartItemData?.productID}`}>{cartItemData?.name}</Link> : <Link href={`/popularProduct/${cartItemData?.productID}`}>{cartItemData?.name}</Link>)}
                        <h3 className="text-xs ">₦{price}</h3>
                    </div>
                    <div className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-md rounded-b-md rounded-bl-none  rounded-tr-none p-[0.3rem]" onClick={() => deleteItemFromCart()}>
                        <Image src={trashIcons} width={20} height={20}  alt='trash icon'/>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default CartItemCheckout;
