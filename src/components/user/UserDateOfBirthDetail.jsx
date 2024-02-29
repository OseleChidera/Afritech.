'use client'
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDocn } from "firebase/firestore";
import { database, storage } from '../../../firebaseConfig';
import { toast } from "react-toastify";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



export default function UserDateOfBirthDetail({ name, value }) {
    const [isEditing, setIsEditing] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(null);
    const [dateOfBirthValue, setdateOfBirthValue] = useState(value);
    const userID = useSelector((state) => state.user.userID);
    const dispatch = useDispatch()

    // console.log(userID)

    async function handleInputChange(name) {
      

       
    }


    function selectEditing() {
        setIsEditing(true);
    }

    async function handleSave() {
        if (value == " ") {
            return;
        }
        setIsEditing(false);
        const date = new Date(dateOfBirthValue);
        const dateOfBirthTimestamp = date.getTime();
        
        const docRef = doc(database, "Users", userID);
        try {
            await updateDoc(docRef, { dateOfBirth: dateOfBirthTimestamp })
            toast.success(`${name} data has updated successfully`);
            console.log('Document Update completed successfully')

        } catch (error) {
            toast.error(`${name} value failed to Update. Refresh and retry.`);
            console.log('Failed to updateDocument')
            console.log(error.message)
        }
    }

    
    const handleChange = (date) => {
        ;
    };
    return (
        <div className={`flex justify-between items-end  w-full p-2 rounded-lg  bg-[#695acd] `}>
            {
                <div id="left" className='flex flex-col  w-3/4  gap-1 '>
                    <h5 className="text-bold capitalize text-white text-sm">{name}:</h5>
                    <DatePicker
                        name="dateOfBirth"
                        selected={dateOfBirthValue}
                        onChange={(date) => setdateOfBirthValue(date)}
                        dateFormat="dd/MM/yyyy"
                        isClearable
                        showYearDropdown
                        scrollableYearDropdown
                        placeholderText="Select date of birth 01/01/2001"
                        className={`w-full p-2 px-5 rounded-xl text-black ${isEditing ? "text-black" : "text-white"}`}
                        disabled={!isEditing}
                    />
                </div>
            }
            <div id="right w-fit">
                {isEditing ? (
                    <button className='font-bold bg-white text-[#695acd] rounded-xl  text-sm  capitalize px-4 py-[0.5rem]' onClick={() => handleSave( name)}>
                        save
                    </button>
                ) : (
                    <button
                        className='font-bold  bg-white text-[#695acd] rounded-xl  text-sm  capitalize px-4 py-[0.5rem]'
                        onClick={() => selectEditing()}
                        disabled={isEditing}
                    >
                        edit
                    </button>
                )}
            </div>
        </div>
    )
}
