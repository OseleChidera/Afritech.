import React, { useState } from 'react';
import Image from 'next/image';
import { setModalToshow, hideModalDispachFn } from '../../redux/user';
import { useSelector, useDispatch } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { database, storage } from '../../../firebaseConfig';
import { toast } from 'react-toastify';

export default function ChangePfpModal() {
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [disableUploadBtn, setDisableUploadBtn] = useState(false);
    const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
    const userID = useSelector((state) => state.user.userID);
    const dispatch = useDispatch();

    // Function to close the modal
    function closeModal() {
        dispatch(hideModalDispachFn());
        dispatch(setModalToshow(''));
        setNewProfilePicture(null);
    }

    // Function to upload new profile picture to storage and update Firestore
    async function uploadNewProfilePictureAndGetDownloadURL(newProfilePictureURL) {
        const docRef = doc(database, "Users", userID);
        try {
            await updateDoc(docRef, { profilePicture: newProfilePictureURL });
            closeModal();
            toast.success('New profile picture updated');
        } catch (error) {
            console.log(error.message);
        }
    }

    // Function to update profile picture in storage
    async function updateProfilePicture(userId, newProfilePicture) {
        try {
            const imagePath = `${userId}/profilePicture`;
            const storageRef = ref(storage, imagePath);
            await uploadBytes(storageRef, newProfilePicture);
            const downloadURL = await getDownloadURL(storageRef);
            uploadNewProfilePictureAndGetDownloadURL(downloadURL);
        } catch (error) {
            console.error("Error updating profile picture:", error.message);
            throw error;
        }
    }

    // Function to handle profile picture upload
    async function uploadProfilePicture() {
        setDisableUploadBtn(!disableUploadBtn);
        if (newProfilePicture === null) {
            return; // Handle the case where newProfilePicture is null
        }
        await updateProfilePicture(userID, newProfilePicture);
        setDisableUploadBtn(!disableUploadBtn);
        closeModal();
    }

    return (
        <div className='w-screen h-full bg-[#695acd74] fixed top-0 left-0 pointer-events-auto z-[100] flex justify-center items-center'>
            <div id='modal-img' className="h-fit w-4/5 max-w-[90%] mx-auto  border bg-[rgb(105,90,205)] text-white p-6 rounded-xl flex flex-col items-center gap-3 ">
                <div className="w-[90%]  flex flex-col gap-4">
                    {/* Input field for selecting profile picture */}
                    <input
                        type="file"
                        name="Profile-Photo"
                        accept="image/*"
                        disabled={!hasPermission}
                        value={null}
                        onChange={(event) => {
                            setNewProfilePicture(event.currentTarget.files[0]);
                        }}
                        className='w-fit text-sm'
                    />
                    {/* Display selected profile picture */}
                    {newProfilePicture && (
                        <div className="w-fit h-fit border border-black mx-auto">
                            <Image src={URL.createObjectURL(newProfilePicture)} className='w-auto h-auto' width={100} height={100} alt='profile picture ' priority/>
                        </div>
                    )}
                </div>
                <div className="flex gap-4">
                    {/* Button to cancel profile picture upload */}
                    <button className="font-bold  bg-white text-[#695acd] rounded-xl  text-xl  capitalize px-4 py-[0.55rem]" onClick={() => closeModal()}>Cancel</button>
                    {/* Button to upload profile picture */}
                    {newProfilePicture && (<button disabled={disableUploadBtn} className=" font-bold  bg-white text-[#695acd] rounded-xl  text-xl  capitalize px-4 py-[0.55rem] " onClick={() => uploadProfilePicture()}>Upload</button>)}
                </div>
            </div>
        </div>
    );
}
