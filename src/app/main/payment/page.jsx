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
import { setPaymentTabIndex } from '@/redux/user';

export default function page() {
  const dispatch= useDispatch()
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo); // Get firebaseUserInfo from Redux store
 
  const data = useSelector((state) => state.user.data); // Get data from Redux store
  const paymentTabIndex = useSelector((state) => state.user.paymentTabIndex); // Get data from Redux store
  const [buttonsState, setButtonsState] = useState(0); // Local state for buttonsState
  const [filteredArray, setFilteredArray] = useState([]); // Local state for filteredArray
  const [filteredCompletedArray, setFilteredCompletedArray] = useState([]); // Local state for filteredArray

  // useEffect hook to filter financing data
  useEffect(() => {
    const filteredFinancingArray = data?.userData?.financing.filter((arrayItem) => typeof arrayItem === "object");
    const filteredFinancingCompletedArray = data?.userData?.paymentCompletedArray.filter((arrayItem) => typeof arrayItem === "object");
    setFilteredArray(filteredFinancingArray);
    setFilteredCompletedArray(filteredFinancingCompletedArray);
  }, [data?.userData]);

  

  // console.log("userData: " , data?.userData?.financing , data?.userData?.paymentCompleted)
  return (
    <>
      <div className="pt-8">
        <div className="w-full flex flex-row justify-between p-[20px] gap-4 pb-0">
          {/* Buttons for toggling between pending and completed payments */}
          <button
            className={`relative w-full p-2 rounded-lg rounded-br-none rounded-bl-none ${
              paymentTabIndex === 0
                ? "text-[#695acd] bg-white border border-[#695acd] border-b-0"
                : "text-white bg-[#695acd] border-none"
            }`}
            onClick={() => {dispatch(setPaymentTabIndex(0))}}
          >
            <div className={`w-7 h-7 flex items-center rounded-full justify-center border absolute -left-1 -top-1 ${paymentTabIndex == 0 ? "border-white bg-[#695acd] text-white " : "border-[#695acd] bg-white text-[#695acd] "}`}>
              {filteredArray?.length}
            </div>
            Pending Payment(s)
          </button>
          <button
            className={`relative w-full p-2 rounded-lg rounded-br-none rounded-bl-none ${
              paymentTabIndex === 1
                ? "text-[#695acd] bg-white border border-[#695acd] border-b-0"
                : "text-white bg-[#695acd] border-none"
            }`}
            onClick={() => {dispatch(setPaymentTabIndex(1))}}
          >
            <div className={`w-7 h-7 flex items-center rounded-full justify-center border absolute -right-1 -top-1 ${paymentTabIndex === 1 ? "border-white bg-[#695acd] text-white " : "border-[#695acd] bg-white text-[#695acd] "}`}>
              {filteredCompletedArray?.length}
            </div>
            Completed Payment(s)
          </button>
        </div>

        {/* Conditional rendering based on buttonsState */}
        {data?.userData?.financing || data?.userData?.paymentCompleted ? 
          (paymentTabIndex == 0 ? <PendingPayment /> : <PaymentComplete />) : 
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
