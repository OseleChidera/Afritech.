'use client'
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDocn } from "firebase/firestore";
import { database, storage } from '../../../firebaseConfig';
import { toast } from "react-toastify";


export default function UserDetail({ name, value, index }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const userID = useSelector((state) => state.user.userID);
    const dispatch = useDispatch()
    
    // console.log(userID)

    async function handleInputChange(index, name) {
        console.log(name)
        const propertyToUpdate = name
        console.log(propertyToUpdate)

        const docRef = doc(database, "Users", userID);
        try {
            await updateDoc(docRef, { [propertyToUpdate]: inputValue })
            toast.success(`${propertyToUpdate} value Update completed successfully`);
            console.log('Document Update completed successfully')

        } catch (error) {
            toast.error(`${name} value failed to Update. Refresh and retry.`);
            console.log('Failed to updateDocument')
            console.log(error.message)
        }
    }
  

    function selectEditing(index) {
        console.log("edit : " + index );
        setIsEditing(true);
    }

    function handleSave(index, name) {
        console.log("save : " + index );
        if (inputValue== " ") {
            return;
        }
        setIsEditing(false);
        handleInputChange(index, name)
    }

  return (
      <div className="flex justify-between items-end  w-full p-2 rounded-lg  bg-[#695acd] gap-8" key={index}>
          {
              <div id="left" className='flex flex-col  w-full  gap-1'>
                  <h5 className="text-bold capitalize text-white text-sm">{name}:</h5>
                  <input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full p-2 px-5 rounded-xl text-black indent-[2px]"
                      disabled={!isEditing}
                  />
              </div>
          }
          <div id="right">
              {isEditing ? (
                  <button className='font-bold bg-white text-[#695acd] rounded-xl  text-sm  capitalize px-4 py-[0.5rem]' onClick={() => handleSave(index,name)}>
                      save
                  </button>
              ) : (
                  <button
                    className='font-bold  bg-white text-[#695acd] rounded-xl  text-sm  capitalize px-4 py-[0.5rem]'
                          onClick={() => selectEditing(index)}
                      disabled={isEditing}
                  >
                      edit
                  </button>
              )}
          </div>
      </div>
  )
}
