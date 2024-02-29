'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../../../../firebaseConfig'; // Import Firebase auth
import { sendPasswordResetEmail } from "firebase/auth"; // Import sendPasswordResetEmail from Firebase auth
import { toast } from 'react-toastify'; // Import toast from react-toastify
import Link from 'next/link';
import { useRouter } from 'next/navigation' 


// Define validation schema using Yup
const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(45, 'Too Long!')
        .required('Required'),
});

// Component for forgot password email form
const FogortpasswordEmail = ({ user, prevStep, currentIndex, setCurrentIndex, isDisabled, setIsDisabled }) => {

    const router = useRouter()

    
    // Form submission handler
    const handleSubmit = async (values) => {
        try {
            // Send password reset email
            await sendPasswordResetEmail(auth, values.email);
            // Display success toast and redirect to signin page
            toast.info('An Email was sent to reset your password',{autoClose: 500 , onOpen: ()=>{router.push('/signin');}});
        } catch (error) {
            // Display error toast if sending password reset email fails
            toast.error(error.code);
        }
        // Disable submit button temporarily
        setIsDisabled(true);
        setTimeout(() => {
            // Enable submit button after 2 seconds
            setIsDisabled(false);
        }, 2000);
    };

    return (
        <div className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center  bg-[#695acd] border">
            <div id='form-two' className='max-w-xs w-full   scaleAnimation'>
                <div className="mb-3">
                    <span className='font-extrabold capitalize text-white text-3xl mb-6'>
                        Enter your E-mail to reset the password.
                    </span>
                </div>
                {/* Formik form for handling form state and validation */}
                <Formik
                    initialValues={{
                        email: 'deraemma8@gmail.com',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit} // Call handleSubmit function on form submission
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="mb-3 ">
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="email">Email : </label>
                                <Field name="email" type="email" className="w-full p-2 px-5 rounded-xl" />
                                {errors.email && touched.email ? (
                                    <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div>
                                ) : null}
                            </div>

                            <div className="flex justify-between">
                                {/* Link to signin page */}
                                <Link href={`/signin`}>
                                    <button
                                        type="button"
                                        className='font-bold  bg-white text-xl text-[#695acd] capitalize px-4 py-[0.55rem] rounded-xl relative float-right'>
                                        Back to signin
                                    </button>
                                </Link>
                                {/* Submit button */}
                                <button
                                    disabled={isDisabled}
                                    type="submit"
                                    className={`font-bold  bg-white text-xl text-[#695acd] capitalize px-4 py-[0.55rem] rounded-xl relative float-right ${isDisabled ? 'opacity-50' : 'opacity-100'}`}>
                                    Reset
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default FogortpasswordEmail;
