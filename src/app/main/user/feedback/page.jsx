'use client' // Assuming this is a pragma directive, indicating the environment or framework being used
import React, { useState } from 'react';
import Nav from '@/components/Nav'; // Importing a custom Nav component
import { toast } from 'react-toastify';
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore"; // Firestore imports
import { database, storage, auth, firestore } from '../../../../../firebaseConfig'; // Firebase configuration import
import { useSelector, useDispatch } from "react-redux"; // Redux imports
import { generateRandomID } from '@/utils/helperFunctions'; // Importing a helper function for generating random IDs

export default function page() {
    const [feedbackSent, setFeedbackSent] = useState(false); // State for tracking if feedback is sent
    const [textAreaText, setTextAreaText] = useState(''); // State for textarea input
    const [feedbackWarning, setFeedbackWarning] = useState(false); // State for displaying feedback warning
    const [selectedOption, setSelectedOption] = useState(''); // State for selected feedback option

    const userID = useSelector((state) => state.user.userID); // Get user ID from Redux store
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo); // Get user info from Redux store

    // Function to send feedback
    async function sendFeedback() {
        if (textAreaText === "" || !textAreaText) { // Checking if textarea is empty
            setFeedbackWarning(true);
            return;
        }

        const feedbackId = generateRandomID(20); // Generate a random feedback ID
        const docRef = doc(database, "UserFeedback", `${feedbackId}`); // Reference to the document in Firestore
        try {
            // Data to add to Firestore document
            const documentData = { userID: userID, userEmail: firebaseUserInfo.email, feedbackType: selectedOption, feedback: textAreaText };
            await setDoc(docRef, documentData); // Add data to Firestore document
            toast.success('Feedback Sent Successfully.', {
                onOpen: () => {
                    setFeedbackSent(true);
                    setTimeout(() => {
                        setTextAreaText('');
                        setFeedbackSent(false);
                    }, 2000);
                }
            });
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            toast.error('Feedback Was Unable to Send.');
        }
    }

    // Function to handle textarea value change
    function textareaValueFn(e) {
        setFeedbackWarning(false);
        setTextAreaText(e.target.value);
    }

    // Function to handle feedback option change
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Feedback options array
    const feedbackOptions = [
        { value: 'GENERAL FEEDBACK', label: 'GENERAL FEEDBACK' },
        { value: 'FEATURE REQUEST', label: 'FEATURE REQUEST' },
        { value: 'COMPLIMENT', label: 'COMPLIMENT' },
        { value: 'BUG REPORT', label: 'BUG REPORT' },
        { value: 'COMPLAINT', label: 'COMPLAINT' },
        { value: 'PAYMENT ISSUE', label: 'PAYMENT ISSUE' },
    ];

    return (
        <div className={`w-full relative  p-2 ${feedbackSent ? 'flex flex-col items-center justify-center h-screen ' : "min-h-fit "}`}>
            {feedbackSent ? (
                <span className='text-2xl font-semibold capitalize'>Feedback Sent</span>
            ) : (
                <div className="flex flex-col gap-4  items-center ">
                    <h1 className='text-lg font-semibold capitalize'> feedback</h1>
                    <div className="w-[90%] border border-black flex flex-col gap-4">
                        <select value={selectedOption} onChange={handleOptionChange} className='text-black text-sm p-2 rounded-md '>
                            <option value="">Select an option</option>
                            {feedbackOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {feedbackWarning && (
                        <h1 className='text-sm  capitalize text-red-600'>Feedback cannot be empty</h1>
                    )}
                    <textarea
                        placeholder="Enter your feedback"
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        value={textAreaText}
                        onChange={(e) => textareaValueFn(e)}
                        className={`min-h-[25vh] max-h-[30vh] w-5/6 border border-black p-2 rounded-xl break-normal`}
                    ></textarea>
                    {(selectedOption && textAreaText) && (
                        <button className='w-full px-5 py-2 border border-black bg-[#695acd] text-white capitalize text-center  rounded-xl' onClick={() => sendFeedback()} >
                            send feedback
                        </button>
                    )}
                </div>
            )}
            <Nav /> {/* Render the Nav component */}
        </div>
    )
}
