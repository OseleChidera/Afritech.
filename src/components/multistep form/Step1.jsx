'use client'
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { database, storage, auth } from '../../../firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { step1ValidationSchema } from "../../utils/schemautils"
import { useSelector, useDispatch } from "react-redux";
import { setUserId, setCurrentUserData, setSignupIndex } from '../../redux/user'
import {  useRouter } from 'next/navigation' 

const Step1 = ({ data, next }) => {
    const [showPassowrd1, setShowPassword1] = useState(false)
    const [showPassowrd2, setShowPassword2] = useState(false)
    const reduxStoreUserId = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const router = useRouter()

    function redirect(path) {
       router.push(path);
    }

    function createUserFirestoreEntry(userProfile) {
        const customDocRef = doc(database, 'Users', `${userProfile.reloadUserInfo.localId}`);
        setDoc(customDocRef, { email: values.email, password: values.password });
    }
    const saveUserDataToLocalStorage = (userData) => {
        localStorage.setItem('afriTechUserID', JSON.stringify(userData));
    };

    async function  handleSubmit(values) {
        next(values)
        await auth.signOut();
        localStorage.removeItem('afriTechUserID');
        createUserWithEmailAndPassword(auth, values.email, values.password)
            // console.log("createUserWithEmailAndPassword" + JSON.stringify(auth, null, 2))

            .then((userCredential) => {
                
                console.log(userCredential)
                const userProfile = userCredential.user;
                sendEmailVerification(userProfile)
                toast.info('A verification email was sent to you follow the instructions' )
                const customDocRef = doc(database, 'Users', `${userProfile.reloadUserInfo.localId}`);
                setDoc(customDocRef, { email: values.email });
                console.log('user id: ' + userProfile.uid)
                dispatch(setUserId(userProfile.uid))
                // console.log('after dispatchhhhhhhhhhhhhhhhhhhhhh')


                //save the user id in local storage on signup
                localStorage.setItem('afriTechUserID', JSON.stringify(`${userProfile.uid}`))
                // console.log("auth.currentUser" + " " + JSON.stringify(auth.currentUser, null, 2))

            })
            .catch((error) => {
                if (error.code == 'auth/email-already-in-use') {
                    dispatch(setSignupIndex(0))
                    toast.error('This email is already in use', {
                        autoClose: 500 ,
                        onOpen: () => { redirect("/signin")}
                    })
                }
                console.log(error.message, error.code)
            });
    }

    return (
        <div className="flex flex-col gap-4 ">
        <Formik
            initialValues={data}
            validationSchema={step1ValidationSchema}
            async onSubmit={handleSubmit}>
            {({ errors, touched }) => (

                <Form>
                    <div id='form-two' className='max-w-xs  '>
                        <div className="mb-3">
                            <span className='font-extrabold capitalize mb-4 text-white text-3xl'>
                                Hi there,welcome to AfriTech! 👋
                            </span>
                        </div>


                        <div className="mb-3">
                            <div className="flex flex-col">
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="email">Email : </label>
                                <Field name="email" type="email" className="w-full p-2 px-5 rounded-xl"/>

                            </div>
                            {errors.email && touched.email ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mb-3 ">
                            <div className=" flex flex-col relative">
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="password">Password : </label>
                                <div className="flex flex-row items-center w-full ">
                                    <Field name="password" type={showPassowrd1 ? 'text' : 'password'} className="w-full p-2 px-5 rounded-xl" placeholder="*********" />
                                    <button type='button' onClick={() => setShowPassword1((showPassowrd1) => !showPassowrd1)} className='bg-transparent absolute right-5'>
                                        <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                    </button>
                                </div>

                            </div>
                            {errors.password && touched.password ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.password}</div>
                            ) : null}
                        </div>

                        <div className="mb-3 ">
                            <div className=" flex flex-col relative">
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="confirm_password">Re-enter Password : </label>
                                <div className="flex flex-row items-center w-full">
                                    <Field name="confirm_password" type={showPassowrd2 ? 'text' : 'password'} className="w-full p-2 px-5 rounded-xl
                                    " placeholder="*********" />
                                    <button type='button' onClick={() => setShowPassword2((showPassowrd2) => !showPassowrd2)} className='bg-transparent absolute  right-5'>
                                        <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                    </button>
                                </div>
                                {errors.confirm_password && touched.confirm_password ? (
                                    <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.confirm_password}</div>
                                ) : null}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`font-bold  text-xl  bg-white text-[#695acd] rounded-xl capitalize px-4 py-[0.55rem]  relative float-right `}>
                            Sign Up
                        </button>
                        {/* </div> */}

                    </div>
                </Form >
            )}
        </Formik >
            <span className="text-white text-center font-medium">OR</span>
            <button
                onClick={() => redirect('/signin')}
                className="font-bold  bg-white text-[#695acd] rounded-xl  text-xl  capitalize px-4 py-[0.55rem] relative float-right"
            >
                Sign In
            </button>
        </div>
    )
}
export default Step1