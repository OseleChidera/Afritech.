import React, { useState } from 'react';
import { setModalToshow, hideModalDispachFn } from '../../redux/user';
import { useSelector, useDispatch } from "react-redux";
import { updateDoc, doc } from "firebase/firestore";
import { database } from '../../../firebaseConfig';
import { toast } from 'react-toastify';

export default function ChangeLocationModal() {
    const [disableUploadBtn, setDisableUploadBtn] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const userID = useSelector((state) => state.user.userID);
    const dispatch = useDispatch();

    // Function to close the modal
    function closeModal() {
        dispatch(hideModalDispachFn());
        dispatch(setModalToshow(''));
    }

    // Function to handle location change
    async function changeLocationFn() {
        const userDocRef = doc(database, "Users", `${userID}`);
        try {
            // Update the location in Firestore
            await updateDoc(userDocRef, { locationOption: selectedOption });
            closeModal();
            toast.success('Location updated successfully.');
        } catch (error) {
            console.log(error.code);
        }
    }

    // Event handler for option change
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Location options
    const locationOptions = [
        { value: 'Nigeria', label: 'Nigeria' },
        { value: 'Senegal', label: 'Senegal' },
    ];

    return (
        <div className='w-screen h-full bg-[#695acd74] fixed top-0 left-0 pointer-events-auto z-[100] flex justify-center items-center'>
            <div id='modal-img' className="h-fit w-4/5 max-w-[90%] mx-auto  border bg-[rgb(105,90,205)] text-white p-6 rounded-xl flex flex-col items-center gap-3 ">
                <span className="text-3xl font-semibold  text-balance text-center mb-4">Available Locations</span>
                <div className="w-[90%] border border-black flex flex-col gap-4">
                    <select value={selectedOption} onChange={handleOptionChange} className='text-black text-sm p-2 rounded-md '>
                        <option value="">Select an option</option>
                        {locationOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-4">
                    <button className="font-bold  bg-white text-[#695acd] rounded-xl  text-base  capitalize px-4 py-[0.55rem]" onClick={() => closeModal()}>Cancel</button>
                    {/* Render "Save Changes" button if an option is selected */}
                    {selectedOption && (
                        <button disabled={disableUploadBtn} className="font-bold  bg-white text-[#695acd] rounded-xl  text-base  capitalize px-4 py-[0.55rem]" onClick={() => changeLocationFn()}>Save Changes</button>
                    )}
                </div>
            </div>
        </div>
    );
}
