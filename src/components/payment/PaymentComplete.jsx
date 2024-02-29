import React, { useState, useEffect } from 'react';
import PaymentCompleteComponent from './PaymentCompleteComponent';
import UnauthorizedAccess from '../UnauthorizedAccess/UnauthorizedAccess';
import { useSelector } from "react-redux";

export default function PendingPayment() {
    // Retrieve necessary data from the Redux store
    const data = useSelector((state) => state.user.data);
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    // State to store payment array without empty strings
    const [arrayWithoutEmptyStrings, setArrayWithoutEmptyStrings] = useState();

    // Update arrayWithoutEmptyStrings when userData.paymentCompleted changes
    useEffect(() => {
        setArrayWithoutEmptyStrings(data?.paymentCompleteArray?.filter(arrayItem => typeof arrayItem === "object" && arrayItem !== null))
    }, [data?.userData?.paymentCompleted])

    return (
        <div>
            {
                // Check if user account is verified
                firebaseUserInfo?.accountVerified ? (
                    // Check if payment array is not empty
                    data?.paymentArray.length !== 0 ? (
                        <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
                            {/* Map through arrayWithoutEmptyStrings and render PaymentCompleteComponent for each item */}
                            {arrayWithoutEmptyStrings?.map(item => (
                                <PaymentCompleteComponent
                                    key={item.orderId}
                                    orderID={item.orderId}
                                    productsArray={item.orderProducts}
                                    financingTotal={item.financingTotal}
                                    leftToPay={item.leftToPay}
                                />
                            ))}
                        </div>
                    ) : (
                        // Render a message if payment array is empty
                        <div className="border border-black h-[50vh] w-full text-xl text-[#695acd] flex items-center justify-center">
                            <div className="h1">No Items To Display</div>
                        </div>
                    )
                ) : (
                    // Render UnauthorizedAccess component if user account is not verified
                    <div className="absolute top-0 left-0 w-full h-screen">
                        <UnauthorizedAccess />
                    </div>
                )
            }
        </div>
    );
}
