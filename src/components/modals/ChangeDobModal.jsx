import React, { useState } from 'react';
import Image from 'next/image';
import { setModalToshow, hideModalDispachFn } from '../../redux/user';
import { useSelector, useDispatch } from "react-redux";
import { updateDoc, doc } from "firebase/firestore";
import { database } from '../../../firebaseConfig';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ChangeDobModal() {
    const [disableUploadBtn, setDisableUploadBtn] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
    const userID = useSelector((state) => state.user.userID);
    const dispatch = useDispatch();

    // Function to close the modal
    function closeModal() {
        dispatch(hideModalDispachFn());
        dispatch(setModalToshow(''));
    }

    // Function to handle date change
    const handleChange = (date) => {
        setSelectedDate(date);
    };

    // Function to update date of birth in Firestore
    async function ChangeDobFn() {
        console.log(selectedDate);
        const userDocRef = doc(database, "Users", `${userID}`);
        try {
            // Update the date of birth in Firestore
            await updateDoc(userDocRef, { dateOfBirth: selectedDate });
            closeModal();
            toast.success('Date of Birth updated successfully.');
        } catch (error) {
            console.log(error.code);
        }
    }

    return (
        <div className='w-screen h-full bg-[#695acd74] fixed top-0 left-0 pointer-events-auto z-[100] flex justify-center items-center'>
            <div id='modal-img' className="h-fit w-4/5 max-w-[90%] mx-auto  border bg-[rgb(105,90,205)] text-white p-6 rounded-xl flex flex-col items-center gap-3 ">
                <div className="w-[90%] border border-black flex flex-col gap-4">
                    <DatePicker
                        name="dateOfBirth"
                        selected={selectedDate} 
                        onChange={(date) => handleChange(date) }
                        dateFormat="dd/MM/yyyy"
                        isClearable 
                        showYearDropdown 
                        scrollableYearDropdown 
                        placeholderText="Select date of birth"
                        className="w-full p-2 px-5 rounded-xl text-black"
                    />
                </div>
                <div className="flex gap-4">
                    <button className="font-bold  bg-white text-[#695acd] rounded-xl  text-base  capitalize px-4 py-[0.55rem]" onClick={() => closeModal()}>Cancel</button>
                    {/* Render Save Changes button if selectedDate is not null */}
                    {selectedDate && (
                        <button disabled={disableUploadBtn} className="font-bold  bg-white text-[#695acd] rounded-xl  text-base  capitalize px-4 py-[0.55rem]" onClick={() => ChangeDobFn()}>Save Changes</button>
                    )}
                </div>
            </div>
        </div>
    );
}
