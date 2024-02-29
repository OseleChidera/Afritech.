'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { step2ValidationSchema } from "../../utils/schemautils"
import { useSelector, useDispatch } from "react-redux";


const Step2 = ({ data, next }) => {
    const handleSubmit = (values) => {
        next(values)
    }
    const signupIndex = useSelector((state) => state.user.signupIndex);

    return (
        <Formik
            initialValues={data}
            validationSchema={step2ValidationSchema}
            onSubmit={handleSubmit}>
            {({ errors, touched, values }) => (
                <Form>
                    <div id='form-two' className={`max-w-xs w-full ${signupIndex == 1 ? "fade-in scaleAnimation" : '' }`}>
                        <div className="mb-3">
                            <span className='font-extrabold capitalize  mb-4 text-white text-xl'>
                                Welcome to the next stage dera! To proceed, please fill out the remaining fields.

                            </span>
                        </div>


                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="fullname">Fullname : </label>
                            <Field name="fullname" className="capitalize w-full p-2 px-5 rounded-xl" placeholder="Firstname Lastname" />
                            {errors.fullname && touched.fullname ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.fullname}</div>
                            ) : null}
                        </div>

                        {/* <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="lastname">LastName : </label>
                            <Field name="lastname" className="capitalize  p-2 px-5 rounded-3xl" placeholder="Lastname" />
                            {errors.lastname && touched.lastname ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.lastname}</div>
                            ) : null}
                        </div> */}

                        {/* <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="Username">Username : </label>
                            <Field name="Username" type="text" className="capitalize p-2 px-5 rounded-3xl" placeholder="John" />
                            {errors.Username && touched.Username ? <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.Username}</div> : null}
                        </div> */}


                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="phone">Telephone Number: </label>
                            <Field name="phone" type='text' placeholder="09040500800" className='w-full p-2 px-5 rounded-xl'/>
                            {errors.phone && touched.phone ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.phone}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="address">Residential address: </label>
                            <Field name="address" type="text" placeholder="12, Anytown Anywhere Nigeria." className='w-full p-2 px-5 rounded-xl' />
                            {errors.address && touched.address ? <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.address}</div> : null}
                        </div>
                        {/* <div className="flex flex-row justify-between items-center"> */}
                        <div className="">
                            <button type="submit" className='justify-center font-bold   text-xl  capitalize px-4 py-[0.55rem]  bg-white text-[#695acd] rounded-xl relative float-right'
                            >Next</button>
                        </div>
                        {/* </div> */}
                    </div>
                </Form>
            )}
        </Formik>
    )
}
export default Step2