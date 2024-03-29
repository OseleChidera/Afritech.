'use client'
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showModalDispachFn, setModalToshow } from '../../redux/user'
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useRouter , usePathname } from 'next/navigation';
import Image from 'next/image';
import arrow from "../../../public/icons/arrow-white-right.svg"


export default function UserInfoModal({ title, action, index }) {
    const router = useRouter()
    const path = usePathname()
    const authCallbackUser = useSelector((state) => state.user.authCallbackUser);
    const authCallbackUserObj = JSON.parse(authCallbackUser)
    const auth = getAuth();
    const userID = useSelector((state) => state.user.userID);
    const dispatch = useDispatch();

    function showModal(modalToShow) {
        console.log("changePfp: ",modalToShow)
        dispatch(showModalDispachFn())
        dispatch(setModalToshow(modalToShow))
    } 



    async function resendUserVerificationEmail(user) {
        if (user) {
            // Send the verification email
            sendEmailVerification(auth.currentUser)
                .then(() => {toast.success(`Verification email sent successfully! signin again`, { autoClose: 500 , onOpen: ()=> {
                    router.push('/main/user')
                    toast.info("Signin again", { autoClose: 500 })
                    auth.signOut();
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('afriTechUserID');
                  }
                  
                    router.push('/signin')
                }})})
                .catch((error) => { console.error("Error sending verification email:", error)});
        } else {
            // User is not signed in
            console.error("User is not signed in.");
        }
    }
    return (
      <div
        className="flex justify-between items-center w-full p-2 py-3 rounded-lg  bg-[#695acd]"
        key={index}
        onClick={() =>
          action == "verifyEmail"
            ? resendUserVerificationEmail(authCallbackUserObj)
            : showModal(action)
        }
      >
        <div id="left" className="flex flex-col  w-full ">
          <h5 className="text-bold capitalize text-white text-base font-semibold">
            {title}
          </h5>
        </div>
        {path.includes("/main/user") &&
        (<div className="w-fit ">
          <Image src={arrow} width={20} className='' alt='right arrow'/>
        </div>)}
      </div>
    );
}
