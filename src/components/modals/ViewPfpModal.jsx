import React from 'react';
import p from '../../../public/images/photo4.jpg'; // Assuming this is not used
import Image from 'next/image';
import { setModalToshow, hideModalDispachFn } from '../../redux/user';
import { useSelector, useDispatch } from "react-redux";

export default function ViewPfpModal() {
    const dispatch = useDispatch();
    
    // Function to close the modal
    function closeModal() {
        dispatch(hideModalDispachFn());
        dispatch(setModalToshow(''));
    }

    // Retrieve user info from Redux store
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);

    return (
        <div className='w-screen h-full bg-[#695acd74] fixed top-0 left-0 pointer-events-auto z-[100] flex justify-center items-center'>
            <div id='modal-img' className="h-fit w-4/5 mx-auto border bg-[rgb(105,90,205)] text-white p-6 rounded-xl flex flex-col items-center gap-3 ">
                <div className="w-[200px] max-h-[250px] border border-black flex items-center justify-center">
                    {/* Display the profile picture */}
                    {firebaseUserInfo?.profilePicture && (<Image src={firebaseUserInfo.profilePicture} className='w-auto h-auto' width={200} height={200}  alt='main profile picture' priority/>)}
                </div>
                {/* Button to close the modal */}
                <button className="bg-white text-[#695acd] rounded-xl px-4 py-1 font-semibold" onClick={() => closeModal()}>Close</button>
            </div>
        </div>
    );
}
