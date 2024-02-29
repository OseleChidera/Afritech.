// Import necessary dependencies
'use client'; 
import React, { useState, useContext, useEffect } from 'react'; // Import React and necessary hooks
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore"; // Import Firestore methods
import { database, storage } from '../../../../firebaseConfig'; // Import Firestore database and Firebase storage
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase storage methods
import Step1 from "../../../components/multistep form/Step1.jsx"; // Import Step1 component
import Step2 from "../../../components/multistep form/Step2.jsx"; // Import Step2 component
import Step3 from "../../../components/multistep form/Step3.jsx"; // Import Step3 component
import Step4 from "../../../components/multistep form/Step4.jsx"; // Import Step4 component
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch from react-redux for Redux state management
import { setLoading, incrementSignup, decrementSignup, incrementSignin, decrementSignin, updateUserFormEntries, fetchDataByUserId, userData, setUserData, incrementAnimationCounter, decrementAnimationCounter } from '../../../redux/user'; // Import Redux actions and selectors
import { useRouter } from 'next/navigation'; // Import useRouter hook from Next.js for routing

export default function Multistep() {
  // Redux state management
  const pageindex = useSelector((state) => state.user.signupIndex); // Get current page index from Redux store
  const userFormEntries = useSelector((state) => state.user.userFormEntries); // Get user form entries from Redux store
  const userIdFromLocalStorage = localStorage.getItem('afriTechUserID') ? JSON.parse(localStorage.getItem('afriTechUserID')) : null; // Get user ID from local storage
  const dispatch = useDispatch(); // Get dispatch function from useDispatch hook

  // Local state
  const [data, setData] = useState(userFormEntries); // Initialize local state for form data
  const [animationCounter, setAnimationCounter] = useState(0); // Initialize local state for animation counter

  // Function to upload NIN image to Firebase storage
  async function uploadNinImage(image) {
    // Construct the image path
    const imagePath = `${userIdFromLocalStorage}/ninImage`;
    try {
      // Upload image to Firebase storage
      const storageRef = ref(storage, imagePath);
      await uploadBytes(storageRef, image);
      // Return the download URL
      return getDownloadURL(storageRef);
    } catch (error) {
      console.log(error.message)
      toast.error('ninImage image couldnt upload')
    }
  }

  // Function to upload profile picture to Firebase storage
  async function uploadProfilePicture(image) {
    // Construct the image path
    const imagePath = `${userIdFromLocalStorage}/profilePicture`;
    try {
      // Upload image to Firebase storage
      const storageRef = ref(storage, imagePath);
      await uploadBytes(storageRef, image);
      // Return the download URL
      return getDownloadURL(storageRef);
    } catch (error) {
      console.log(error.message)
      toast.error('profilePicture image couldnt upload')
    }
  }

  // Function to redirect to a different page
  const router = useRouter()
  function redirect(path) {
    router.push(path);
  }

  // Array of steps for the multi-step form
  const steps = [
    <Step1 data={data} next={handleNextStep} setData={setData} />,
    <Step2 data={data} next={handleNextStep} prev={handlePrevStep} />,
    <Step3 data={data} next={handleNextStep} prev={handlePrevStep} />,
    <Step4 data={data} next={handleNextStep} prev={handlePrevStep} />
  ];

  // Function to create a new firestore document for the user
  async function ApiReq(newData) {
    const docRef = doc(database, "Users", `${userIdFromLocalStorage}`);
    if (newData.agreeToTerms) {
      try {
        const [image1Url, image2Url] = await Promise.all([uploadProfilePicture(newData.profilePicture), uploadNinImage(newData.ninSlipPicture)]);
        newData.profilePicture = image1Url;
        newData.ninSlipPicture = image2Url;
        delete newData.confirm_password;
        delete newData.password;
        newData.cart = [""]
        newData.favourites = [""]
        newData.financing = [""]
        newData.reviews = [""]
        newData.paymentCompleted = [""]
        newData.dateOfBirth = new Date(newData.dateOfBirth).getTime();
        dispatch(updateUserFormEntries(JSON.stringify(newData, null, 2)));

        await updateDoc(docRef, newData);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(setUserData(docSnap.data()));
          toast.success('User SignUp complete', { autoClose: 500, onOpen: () => redirect("/signin") });
          // redirect("/signin");
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }

  // Function to handle moving to the next step in the form
  function handleNextStep(newData, final = false) {
    setData(prev => ({ ...prev, ...newData }));
    if (final) {
      ApiReq(newData);
      return;
    }
    dispatch(incrementAnimationCounter());
    dispatch(incrementSignup(final));
  }

  // Function to handle moving to the previous step in the form
  function handlePrevStep(newData) {
    setData(prev => ({ ...prev, ...newData }));
    dispatch(decrementAnimationCounter());
    dispatch(decrementSignup());
  }

  return (
    <div className="flex min-h-screen max-h-fit max-w-full flex-col items-center justify-center bg-[#695acd] border">
      {steps[pageindex]}
    </div>
  );
}
