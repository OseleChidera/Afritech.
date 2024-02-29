import React, { useState, useEffect } from 'react';
import OrderPaymentComponentSkeleton from '../loading skeleton/OrderPaymentComponentSkeleton'; // Importing a skeleton component for loading
import OrderPaymentComponent from './OrderPaymentComponent'; // Importing the OrderPaymentComponent
import UnauthorizedAccess from '../UnauthorizedAccess/UnauthorizedAccess'; // Importing a component for unauthorized access
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux

// This component displays pending payments
export default function PendingPayment() {
    const data = useSelector((state) => state.user.data); // Accessing user data from the Redux store
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo); // Accessing Firebase user information from the Redux store
    const [arrayWithoutEmptyStrings, setArrayWithoutEmptyStrings] = useState([]); // State to store an array without empty strings

    useEffect(() => {
        // Update the state when the user financing data changes
        setArrayWithoutEmptyStrings(data?.userData?.financing?.filter(arrayItem => typeof arrayItem === "object" && arrayItem !== null));
    }, [data?.userData?.financing]); // Trigger the effect when the user financing data changes

    return (
        <div>
            <div className="">
                {/* Check if the user account is verified */}
                {firebaseUserInfo?.accountVerified ? (
                    // Check if there are pending payments to display
                    arrayWithoutEmptyStrings?.length !== 0 ? (
                        <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
                            {/* Render the OrderPaymentComponent for each pending payment */}
                            {arrayWithoutEmptyStrings?.map(item => (
                                <OrderPaymentComponent
                                    key={item.orderId}
                                    orderID={item.orderId}
                                    productsArray={item.orderProducts}
                                    financingTotal={item.financingTotal}
                                    leftToPay={item.leftToPay}
                                />
                            ))}
                        </div>
                    ) : (
                        // Render a message when there are no pending payments
                        <div className="border border-black h-[50vh] w-full text-xl text-[#695acd] flex items-center justify-center">
                            <div className="h1">No Items To Display</div>
                        </div>
                    )
                ) : (
                    // Render the UnauthorizedAccess component for unauthorized users
                    <div className="absolute top-0 left-0 w-full h-screen">
                        <UnauthorizedAccess />
                    </div>
                )}
            </div>
        </div>
    );
}
