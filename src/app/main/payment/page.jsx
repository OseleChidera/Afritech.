'use client'; 
import Nav from '@/components/Nav'; // Import Nav component
import UnauthorizedAccess from '@/components/UnauthorizedAccess/UnauthorizedAccess'; // Import UnauthorizedAccess component
import OrderPaymentComponent from '@/components/payment/OrderPaymentComponent'; // Import OrderPaymentComponent component
import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import { usePaystackPayment } from 'react-paystack'; // Import usePaystackPayment hook from react-paystack
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch hooks from react-redux
import OrderPaymentComponentSkeleton from '@/components/loading skeleton/OrderPaymentComponentSkeleton'; // Import OrderPaymentComponentSkeleton component
import PendingPayment from '@/components/payment/PendingPayment'; // Import PendingPayment component
import PaymentComplete from '@/components/payment/PaymentComplete'; // Import PaymentComplete component

export default function page() {
  // Redux state management
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo); // Get firebaseUserInfo from Redux store
 
  const data = useSelector((state) => state.user.data); // Get data from Redux store
  const [buttonsState, setButtonsState] = useState(0); // Local state for buttonsState
  const [filteredArray, setFilteredArray] = useState([]); // Local state for filteredArray

  // useEffect hook to filter financing data
  useEffect(() => {
    const filtered = data?.userData?.financing.filter((arrayItem) => typeof arrayItem === "object");
    setFilteredArray(filtered);
  }, [data?.userData]);

  // console.log("userData: " , data?.userData?.financing , data?.userData?.paymentCompleted)
  return (
    <>
      <div className="pt-8">
        <div className="w-full flex flex-row justify-between p-[20px] gap-4 pb-0">
          {/* Buttons for toggling between pending and completed payments */}
          <button
            className={`relative w-full p-2 rounded-lg rounded-br-none rounded-bl-none ${
              buttonsState === 0
                ? "text-[#695acd] bg-white border border-[#695acd] border-b-0"
                : "text-white bg-[#695acd] border-none"
            }`}
            onClick={() => setButtonsState(0)}
          >
            Pending Payment(s)
          </button>
          <button
            className={`relative w-full p-2 rounded-lg rounded-br-none rounded-bl-none ${
              buttonsState === 1
                ? "text-[#695acd] bg-white border border-[#695acd] border-b-0"
                : "text-white bg-[#695acd] border-none"
            }`}
            onClick={() => setButtonsState(1)}
          >
            Completed Payment(s)
          </button>
        </div>

        {/* Conditional rendering based on buttonsState */}
        {data?.userData?.financing || data?.userData?.paymentCompleted ? 
          (buttonsState === 0 ? <PendingPayment /> : <PaymentComplete />) : 
          <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
            {/* Display loading skeleton if data is not available */}
            {[...new Array(5)].map((item, index) => (
              <OrderPaymentComponentSkeleton key={index} />
            ))}
          </div>
        }
        {firebaseUserInfo?.accountVerified && <Nav />} 
      </div>
    </>
  );
}
