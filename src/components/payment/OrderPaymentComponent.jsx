import React, { useState , useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { PaystackButton } from 'react-paystack';
import { useSelector, useDispatch } from "react-redux";
import PaymentProduct from "./PaymentProduct";
import { formatNumberWithCommas, updateFinancingItemPrice, sendEmail , updateQtyAfterCheckoutOnDelete , sendOrderCancelledEmail} from "@/utils/helperFunctions";
import { setPaymentTabIndex } from "@/redux/user";
import Image from "next/image";
import trashIcon from "../../../public/icons/trashIcon.svg"

export default function OrderPaymentComponent({ orderID, productsArray, leftToPay, financingTotal}) {
    const dispatch = useDispatch()
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    const data = useSelector((state) => state.user.data);
    const userID = useSelector((state) => state.user.userID);

    const [amount, setAmount] = useState("");
    const [amountLeftToPay, setAmountLeftToPay] = useState("");
    const [paymentPageTabIndex , setPaymentPageTabIndex] = useState(0)

    const config = {
        reference: new Date().getTime().toString(),
        email: firebaseUserInfo.email,
        amount: amount * 100,
        // publicKey: "pk_test_bbdb49fa16552c394bffa9784b6772dfe96bb01f",
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PRIVATE_KEY,
        metadata: {
            custom_fields: [
                {
                    display_name: "food",
                    variable_name: "descr--------------iption",
                    value: "Funding Wallet",
                },
            ],
        },
    };


    function findOrder(orderID){
        let order = firebaseUserInfo?.financing?.find((order)=> order.orderId == orderID);
        return order;
    }

    const initializePayment = usePaystackPayment(config);

    function configurePayment(orderNumber) {
        config.metadata.custom_fields[0].display_name = `${firebaseUserInfo.fullname}`;
        config.metadata.custom_fields[0].variable_name = `Part payment for order #${orderNumber}`;
        config.metadata.custom_fields[0].value = `Order #${orderNumber} payment`;
    }

    async function handlePaystackSuccessAction(reference , setPaymentPageTabIndex){
        
       await updateFinancingItemPrice(orderID, amount, userID, config.email, setAmountLeftToPay);
        sendEmail({
            fullName: data.userData.fullname,
            userEmail: data.userData.email,
            orderID: orderID,
            orderObject: findOrder(orderID),
            amountPaid: Number(amount),
            transactionNumber: reference.transaction,
            reference: reference.trxref,
            amountLeftToPay: Number(amountLeftToPay)
        });
        setAmount('');
    };
async function deleteOrderAfterCheckout(){
    console.log("deleteOrderAfterCheckout function ran" , financingTotal , leftToPay)
    productsArray.forEach(async (item) => {
        // Update qty for the product in the corresponding collection
        await updateQtyAfterCheckoutOnDelete(item.collectionString, item.productID , userID , orderID);
      });
      await sendOrderCancelledEmail({orderID,productsArray, data , financingTotal})
}
    const handlePaystackCloseAction = () => {
        console.log('closed');
    }

    const componentProps = {
        ...config,
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

    return (
        <div className="">
            <details className="relative border border-black w-full p-2 rounded-lg text-white bg-[#695acd] text-balance ">
                <summary className="flex justify-between">
                    <div className="text-lg font-semibold capitalize">
                        order #{orderID}
                    </div>
                    <div className="text-white">
                        ₦{formatNumberWithCommas(leftToPay)}
                    </div>
                    <div className="text-white font-bold font-lg">
                        {productsArray?.length}
                    </div>
                </summary>
                <div className="flex flex-col gap-1 mb-2">
                    {productsArray?.map((product, index) => (
                        <PaymentProduct
                            key={index}
                            productID={product.id}
                            productName={product.name}
                            productPrice={product.price}
                            productImageUrl={product?.imageGalleryImages[0]?.imageURL}
                        />
                    ))}
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <input
                        id="checkoutInput"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-black w-[65%] p-2"
                        placeholder={`Total to pay ₦${formatNumberWithCommas(leftToPay)}`}
                    />
                    <div className="flex flex-row justify-end ">
                        <div id="percentageValues" className="flex gap-3 items p-2 ">
                            <button
                                className={`px-2  bg-white text-[#695acd] capitalize text-center py-1 rounded-md w-full text-sm ${amount > leftToPay ? "opacity-[0.5]" : ""}`}
                                onClick={() => setAmount(leftToPay / 2)}
                            >
                                50%
                            </button>
                            <button
                                className={`px-2  bg-white text-[#695acd] capitalize text-center py-1 rounded-md w-full text-sm ${amount > leftToPay ? "opacity-[0.5]" : ""}`}
                                onClick={() => setAmount(leftToPay)}
                            >
                                100%
                            </button>
                        </div>
                        <div className="info text-black flex items-center justify-center gap-3">
                            <PaystackButton {...componentProps}>
                                <div
                                    className={`px-2  bg-green-500 text-white capitalize text-center py-1 rounded-md w-full text-sm ${amount > leftToPay ? "opacity-[0.5]" : ""}`}
                                    onClick={() => configurePayment(orderID)}
                                    disabled={amount > leftToPay || !amount}
                                >
                                    Pay
                                </div>
                            {amount > leftToPay && (
                                <span className="text-xs text-red-700">Exceeds required</span>
                            )}
                            </PaystackButton>
                            <button className={`px-2  bg-red-600 text-[#695acd] capitalize text-center py-1 rounded-md w-full text-sm ${financingTotal !== leftToPay  ? "opacity-[0.45]" : ""}`} disabled={financingTotal !== leftToPay ? true : false}
                                onClick={() => deleteOrderAfterCheckout()}
                            >
                                <Image src={trashIcon} alt="trash-icon"/>
                            </button>
                        </div>
                    </div>
                </div>
            </details>
        </div>
    );
}
