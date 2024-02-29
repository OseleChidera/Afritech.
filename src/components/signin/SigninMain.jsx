"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {auth} from '../../../firebaseConfig';

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { SigninSchema } from '../../utils/schemautils'
import { useSelector, useDispatch } from "react-redux";
import { setUserId, incrementSigninToStartMultistep,  } from '../../redux/user'
import axios from 'axios';
import { useRouter } from 'next/navigation' 


export default function SigninMain ({ nextStep, isDisabled }){
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    function redirect(path) {
        router.push(path);
        
    }

    async function checkForUserData(userId, values) {
        console.log(userId)
        try {
            const response = await axios.get(`https://firestore.googleapis.com/v1/projects/afritech-b3227/databases/(default)/documents/Users/${userId}`);
            console.log(response)
            if (response.data.fields.agreeToTerms === undefined && response.data.fields.ninnumber === undefined && response.data.fields.profilePicture === undefined) {
                dispatch(incrementSigninToStartMultistep())
            }
            else {
                toast.success("Login successful home page", { onOpen: () => {
                    redirect("/main/home")
                    localStorage.setItem('afriTechUserID', JSON.stringify(`${userId}`))
                }});
                console.error('Error fetching data:', error) 
            }
        } catch (error) { console.error('Error fetching data:', error) }
    }


    return (
        <div className="flex flex-col gap-4 ">
            <div id="form-two" className="max-w-xs w-full">
                <div className="mb-3">
                    <span className="font-extrabold capitalize mb-4 text-white text-3xl">
                        Hi there,welcome to AfriTech! 👋
                    </span>
                </div>
                <Formik
                    initialValues={{
                        email: "",
                        password: !isDisabled ? "" : "",
                    }}
                    validationSchema={SigninSchema}
                    async onSubmit={(values) => {
                            signInWithEmailAndPassword(auth, values.email, values.password)
                            .then((userCredential) => {
                                console.log(userCredential);
                                const uID = userCredential.user.reloadUserInfo.localId
                                console.log("uID" + " " + uID)
                                
                                dispatch(setUserId(uID))
                                checkForUserData(uID);
                            })
                            .catch((error) => {
                                toast.error("auth/invalid-login-credential signup first", 
                                {onOpen: () => router.push("/signup")}
                                );
                                console.log(error.code, error.message);
                            });
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="mb-3 ">
                                <label
                                    className="font-bold capitalize block mb-[0.25rem] text-white"
                                    htmlFor="email"
                                >
                                    Email :{" "}
                                </label>
                                <Field name="email" type="email" placeholder="Enter your email" className="w-full p-2 px-5 rounded-xl" />
                                {errors.email && touched.email ? (
                                    <div className="text-[0.7rem] text-red-600 font-semibold">
                                        {errors.email}
                                    </div>
                                ) : null}
                            </div>

                            <div className="mb-3 relative">
                                <label
                                    className="font-bold capitalize block mb-[0.25rem] text-white"
                                    htmlFor="password"
                                >
                                    Password :
                                </label>
                                <div className="flex flex-row items-center w-full">
                                    <Field
                                        name="password"
                                        type={!showPassword ? "password" : "text"}
                                        className="w-full p-2 px-5 rounded-xl"
                                        placeholder="Enter your password"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((showPassowrd) => !showPassowrd)
                                        }
                                        className="bg-transparent absolute right-5"
                                    >
                                        <img
                                            width="18"
                                            height="18"
                                            src="https://img.icons8.com/ios/50/show-password.png"
                                            alt="show-password"
                                        />
                                    </button>
                                </div>
                                {errors.password && touched.password ? (
                                    <div className="text-[0.7rem] text-red-600 font-semibold">
                                        {errors.password}
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex justify-between">
                                <button
                                    className="text-white border-none underline underline-offset-4"
                                    type="button"
                                    onClick={() => redirect('/signin/forgot-password')}
                                >
                                    Forgort Password ?
                                </button>
                                <button
                                    type="submit"
                                    className="font-bold  bg-white text-[#695acd] rounded-xl  text-xl  capitalize px-4 py-[0.55rem] relative float-right"
                                >
                                    Sign In
                                </button>
                            </div>
                            {/* </div> */}
                        </Form>
                    )}
                </Formik>
            </div>
            <span className="text-white text-center font-medium">OR</span>
            <button
                onClick={() => redirect('/signup')}
                className="font-bold  bg-white text-[#695acd] rounded-xl  text-xl  capitalize px-4 py-[0.55rem] relative float-right"
            >
                Sign Up
            </button>
        </div >
    );
};


