"use client";
import Nav from "@/components/Nav";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaymentProduct from "./PaymentProduct";

// This component renders a summary of completed payments for a specific order.
export default function PaymentCompleteComponent({ orderID, productsArray, leftToPay, financingTotal }) {
    // Retrieve user information and user ID from the Redux store
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    const userID = useSelector((state) => state.user.userID);

    // State to manage the payment amount
    const [amount, setAmount] = useState("");

    return (
        <>
            <div className="">
                {/* Render a details component to display payment details */}
                <details className="relative border border-black w-full p-2 rounded-lg  text-white bg-[#695acd9f]  text-balance ">
                    <summary className=" flex justify-between">
                        {/* Display the order ID */}
                        <div className=" text-lg font-semibold capitalize">
                            order #{orderID}
                        </div>
                        {/* Indicate that payment is complete */}
                        <div className="  text-white">
                            Payment Complete
                        </div>
                        {/* Display the number of products in the order */}
                        <div className=" text-white font-bold font-lg">
                            {productsArray?.length}
                        </div>
                    </summary>
                    {/* Render each product in the order */}
                    <div className="flex flex-col gap-1 mb-2">
                        {productsArray?.map((product , index) => (
                            <PaymentProduct
                                key={index}
                                productID={product.id}
                                productName={product.name}
                                productPrice={product.price}
                                productImageUrl={product?.imageGalleryImages[0]?.imageURL}
                            />
                        ))}
                    </div>
                </details>
            </div>
        </>
    );
}
