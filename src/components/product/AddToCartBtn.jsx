import React, { useEffect, useState } from 'react'; // Importing React and necessary hooks
import Image from 'next/image'; // Importing Image component from Next.js
import addICON from '../../../public/icons/add-01.svg'; // Importing add icon image
import minus from '../../../public/icons/minus-sign.svg'; // Importing minus icon image
import { useSelector } from 'react-redux'; // Importing useSelector hook from react-redux
import { formatNumberWithCommas, addItemsToCart } from '@/utils/helperFunctions'; // Importing utility functions

// Component to handle adding items to cart
export default function AddToCartBtn({ productID, price, qty, collectionString }) {
    // State to manage the quantity of items to add to cart
    const [itemQtyToAddToCart, setItemQtyToAddToCart] = useState(1);

    // Get user ID from Redux store
    const userID = useSelector((state) => state.user.userID);

    // Function to increment the item quantity
    function incrementCounter() {
        // Check if quantity is already maximum
        if (itemQtyToAddToCart === qty) {
            return;
        }
        // Increment item quantity
        setItemQtyToAddToCart(itemQtyToAddToCart + 1);
    }

    // Function to decrement the item quantity
    function decrementCounter() {
        // Check if quantity is already minimum
        if (itemQtyToAddToCart === 1) {
            return;
        }
        // Decrement item quantity
        setItemQtyToAddToCart(itemQtyToAddToCart - 1);
    }

    return (
        <div className="flex justify-between items-baseline fixed bottom-0 left-0 w-full p-6 pb-2 bg-white shadow-2xl border-[0.2px] border-black">
            {/* Display product price and quantity */}
            <div className="flex flex-col">
                <h2 className="capitalize font-bold text-xl">
                    ₦{formatNumberWithCommas(price)}
                </h2>
                <h2 className="capitalize font-regular text-lg">
                    {qty}<span className='font-light lowercase text-sm'> pcs</span>
                </h2>
            </div>
            {/* Add/Remove quantity buttons and input field */}
            <div className="flex flex-col gap-4 items-center">
                <div className="flex gap-1">
                    {/* Button to decrement quantity */}
                    <button className="flex items-center justify-centerc border-none px-3 py-2 rounded-xl bg-[#695acd]"
                        onClick={decrementCounter}>
                        <Image src={minus} width={20} height={20} className="" alt='subtract icon'/>
                    </button>
                    {/* Input field for quantity */}
                    <input
                        type="number"
                        className="text-center border border-black py-1 rounded-xl"
                        max={`${qty}`}
                        min="1"
                        placeholder="1"
                        value={itemQtyToAddToCart}
                        onChange={()=>setItemQtyToAddToCart(itemQtyToAddToCart)}
                    />
                    {/* Button to increment quantity */}
                    <button className="flex items-center justify-centerc border-none px-3 py-2 rounded-xl bg-[#695acd]"
                        onClick={incrementCounter}>
                        <Image src={addICON} width={20} height={20} className="" alt='add icon'/>
                    </button>
                </div>
                {/* Button to add items to cart */}
                <button className="font-bold bg-[#695acd] text-white rounded-xl text-xl capitalize px-4 py-[0.55rem] relative float-right" onClick={() => addItemsToCart(productID, itemQtyToAddToCart, userID, setItemQtyToAddToCart, collectionString)}>
                    Add To Cart
                </button>
            </div>
        </div>
    );
}
