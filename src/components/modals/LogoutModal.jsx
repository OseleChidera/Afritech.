import React from 'react';
import { setModalToshow, hideModalDispachFn } from '../../redux/user';
import { useSelector, useDispatch } from "react-redux";
import { auth } from '../../../firebaseConfig';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

export default function LogoutModal() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Function to close the modal
  function closeModal() {
    dispatch(hideModalDispachFn());
    dispatch(setModalToshow(''));
  }

  // Function to handle logout
  async function logoutFn() {
    const confirmationAlert = window.confirm("Are you really sure you want to logout ?");
    if (confirmationAlert) {
      try {
        await auth.signOut();
        localStorage.removeItem('afriTechUserID');
        // toast.success("logout successful", { autoClose: 300});
        closeModal();
        toast.success("You can choose to sign in again", { autoClose: 300, onOpen: () => router.push("/signin")});
        
      } catch (error) {
        console.error('Error during logout:', error.message);
      }
    } else {
      // Handle case where user cancels logout
      throwMessage('logout failed');
    }
  }

  return (
    <div className='w-screen h-full bg-[#695acd74] fixed top-0 left-0 pointer-events-auto z-[100] flex justify-center items-center'>
      <div className="h-fit w-4/5 mx-auto border bg-[#695acd] text-white p-6 rounded-xl flex flex-col items-center">
        <span className="text-3xl font-semibold  text-balance text-center mb-4">Are you sure you want to logout ?</span>
        <div className="flex gap-4">
          {/* Button to confirm logout */}
          <button className="bg-white text-[#695acd] rounded-2xl px-4 py-1 font-semibold" onClick={() => logoutFn()}>Yes</button>
          {/* Button to cancel logout */}
          <button className="bg-white text-[#695acd] rounded-2xl px-4 py-1 font-semibold" onClick={() => closeModal()}>No</button>
        </div>
      </div>
    </div>
  );
}
