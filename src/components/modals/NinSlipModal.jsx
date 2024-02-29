import React, { useState } from 'react';
import Image from 'next/image';
import { setModalToshow, hideModalDispachFn } from '../../redux/user';
import { useSelector, useDispatch } from "react-redux";

export default function NinSlipModal() {
  const [newNinSlip, setNewNinSlip] = useState(null);
  const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
  const dispatch = useDispatch();

  // Function to close the modal
  function closeModal() {
    dispatch(hideModalDispachFn());
    dispatch(setModalToshow(''));
    setNewNinSlip(null);
  }

  return (
    <div id='modal-img' className="w-screen h-full bg-[#695acd74] fixed top-0 left-0 pointer-events-auto z-[100] flex justify-center items-center">
      <div id='modal-img' className="h-fit w-4/5 max-w-[90%] mx-auto  border bg-[rgb(105,90,205)] text-white p-6 rounded-xl flex flex-col items-center gap-3 ">
      <div className="w-[90%] border border-black flex flex-col gap-4">
        <input
          type="file"
          name="Profile-Photo"
          accept="image/*"
          disabled={!hasPermission}
          value={null}
          onChange={(event) => {
            setNewNinSlip(event.currentTarget.files[0]);
          }}
          className='w-fit text-sm'
        />
        {newNinSlip && (
          <div className="w-fit h-fit border border-black mx-auto">
            <Image src={URL.createObjectURL(newNinSlip)} className='w-auto h-auto' width={100} height={100} priority  alt='nin image'/>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        {/* Button to cancel upload */}
        <button className="font-bold bg-white text-[#695acd] rounded-xl text-xl capitalize px-4 py-[0.55rem]" onClick={() => closeModal()}>Cancel</button>
        {/* Button to upload */}
        {newNinSlip && (<button className="font-bold bg-white text-[#695acd] rounded-xl text-xl capitalize px-4 py-[0.55rem] ">Upload</button>)}
      </div>
      </div>
    </div>
  );
}
