// Import necessary dependencies
"use client" 
import React, { useState } from "react"; // Import React and useState hook
import { toast } from "react-toastify"; // Import toast notification library
import SigninMain from "../../../components/signin/SigninMain.jsx"; // Import SigninMain component
import Step2 from "../../../components/multistep form/Step2.jsx"; // Import Step2 component
import Step3 from "../../../components/multistep form/Step3.jsx"; // Import Step3 component
import Step4 from "../../../components/multistep form/Step4.jsx"; // Import Step4 component
import { doc, updateDoc } from "firebase/firestore"; // Import Firestore functions for document manipulation
import { database, storage } from '../../../../firebaseConfig.js'; // Import Firestore database and storage configurations
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions for uploading and downloading files
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch hooks for accessing Redux state and dispatching actions
import { incrementSignin, decrementSignin } from "../../../redux/user.js"; // Import Redux actions for incrementing and decrementing signin steps
import { useRouter } from 'next/navigation'; // Import useRouter hook for routing

// Define the functional component
export default function Page({ user }) {
    const [currentIndex, setCurrentIndex] = useState(0); // State variable for current step index
    const [isDisabled, setIsDisabled] = useState(false); // State variable for disabling form elements
    const [userid, setUserId] = useState(undefined); // State variable for user ID

    // Redux state and dispatch
    const pageindex = useSelector((state) => state.user.signinIndex); // Retrieve signin step index from Redux state
    const dispatch = useDispatch(); // Retrieve dispatch function from Redux

    // Local storage
    const localUserID = localStorage.getItem('afriTechUserID'); // Retrieve user ID from local storage
    const userIdFromLocalStorage = localUserID ? JSON.parse(localUserID) : null; // Parse user ID from local storage

    // Router
    const router = useRouter(); // Initialize router for navigation

    // Function to redirect
    function redirect(path) {
        router.push(path); // Redirect to specified path
    }

    // Fetch form data from Redux state
    const userFormEntries = useSelector((state) => state.user.userFormEntries); // Retrieve form entries from Redux state
    const [data, setData] = useState(userFormEntries); // Initialize state for form data

    // Steps for the multi-step form
    const steps = [
        <SigninMain
            nextStep={handleNextStep}
            prevStep={handlePrevStep}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            user={user}
        />,
        <Step2 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step3 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step4 data={data} next={handleNextStep} prev={handlePrevStep} />
    ];

    // Function to handle form submission
    async function SignumMultistepApiReq(newData) {
        const docRef = doc(database, "Users", userIdFromLocalStorage); // Reference to Firestore document
        if (newData.agreeToTerms) { // Check if user agrees to terms
            try {
                // Upload images
                const [image1Url, image2Url] = await Promise.all([uploadProfilePicture(newData.profilePicture), uploadNinImage(newData.ninSlipPicture)]);
                newData.profilePicture = image1Url; // Update profile picture URL
                newData.ninSlipPicture = image2Url; // Update NIN image URL
                newData.cart = [""]; // Initialize cart
                newData.favourites = [""]; // Initialize favourites
                newData.financing = [""]; // Initialize financing
                newData.reviews = [""]; // Initialize reviews
                newData.paymentCompleted = [""]; // Initialize payment completed
                // Update Firestore document
                updateDoc(docRef, newData); // Update document with new data
                // Display success toast and redirect
                toast.success(`User SignUp complete ${userIdFromLocalStorage}`, { autoClose: 500, onOpen: () => redirect("/main/home") });
            } catch (error) {
                console.log(error.message); // Log error message
            }
        }
    }

    // Function to handle next step
    function handleNextStep(newData, final = false) {
        setData(prev => ({ ...prev, ...newData })); // Update form data
        if (final) { // Check if final step
            SignumMultistepApiReq(newData); // Submit form data
            return;
        }
        dispatch(incrementSignin(final)); // Increment signin step
    }

    // Function to handle previous step
    function handlePrevStep(newData) {
        setData(prev => ({ ...prev, ...newData })); // Update form data
        dispatch(decrementSignin()); // Decrement signin step
    }

    // Function to upload NIN image
    async function uploadNinImage(image) {
        try {
            const imagePath = `${userIdFromLocalStorage}/ninImage`; // Set image path
            const storageRef = ref(storage, imagePath); // Reference to storage location
            await uploadBytes(storageRef, image); // Upload image bytes
            return getDownloadURL(storageRef); // Return image download URL
        } catch (error) {
            console.log(error.message); // Log error message
            toast.error(`ninImage image couldn't upload`); // Display error toast
        }
    }

    // Function to upload profile picture
    async function uploadProfilePicture(image) {
        try {
            const imagePath = `${userIdFromLocalStorage}/profilePicture`; // Set image path
            const storageRef = ref(storage, imagePath); // Reference to storage location
            await uploadBytes(storageRef, image); // Upload image bytes
            return getDownloadURL(storageRef); // Return image download URL
        } catch (error) {
            console.log(error.message); // Log error message
            toast.error(`profilePicture image couldn't upload`); // Display error toast
        }
    }

    // Render component
    return (
        <div className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center  bg-[#695acd]  border">
            {steps[pageindex]} {/* Render current step */}
        </div>
    );
};
