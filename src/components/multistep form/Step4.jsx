import { useState, useEffect } from "react";
import {
    Formik,
    Form,
    Field,
} from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

const Step4 = ({ data, next }) => {
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        next(values, true)
    }
    const validationSchema = Yup.object().shape({
        agreeToTerms: Yup.boolean().required(
            "You must accept the terms and conditions."
        ),
    });
    const signupIndex = useSelector((state) => state.user.signupIndex);
    return (
        <Formik
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, values, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className={`flex flex-col gap-3 max-w-xs w-full  md:max-w-xl text-white p-4${signupIndex == 3 ? "fade-in scaleAnimation" : ''}`}>
                        <h1 className="font-bold text-4xl capitalize mb-1 text-shadow">
                            Legal Terms and Conditions
                        </h1>

                        <p className="indent-12">
                            This platform enables users to assess user eligibility for
                            platform access based on user-provided data and publicly available
                            information, while also ensuring compliance with Nigerian
                            financial security regulations. By using the platform, users agree
                            to be bound by these Terms and Conditions.The platform use is
                            restricted to lawful purposes only.
                        </p>
                        <p className="indent-12">The platform collects and uses
                            personal data to provide its features and services, and to comply
                            with Nigerian financial security regulations. Personal data is
                            collected and used only to the extent necessary to achieve these
                            purposes. Personal data is not sold or shared with third parties
                            without user consent. The platform maintains robust security
                            measures to protect personal data from unauthorized access, use,
                            disclosure, modification, or destruction. Users have the following
                            rights with respect to their personal data:
                        </p>
                        <ul className="">
                            <li className="mx-10">Access</li>
                            <li className="mx-10">Rectification</li>
                            <li className="mx-10">Erasure</li>
                            <li className="mx-10">Restriction of processing</li>
                            <li className="mx-10">Objection to processing</li>
                            <li className="mx-10">Data portability</li>
                        </ul>

                        <span className="">
                            These Terms and Conditions may be updated periodically and will be
                            posted on the platform.
                        </span>
                        <span className="indent-12">
                            These Terms and Conditions are governed by and construed in
                            accordance with Nigerian law. Any disputes arising out of or in
                            connection with these Terms and Conditions will be subject to the
                            exclusive jurisdiction of the courts of Nigeria.
                        </span>
                        <span className="">
                            For any questions about these Terms and Conditions, please contact
                            Afritech.mail.com
                        </span>
                        <div className="mb-3">
                            <div className="flex gap-3">
                                <Field
                                    name="agreeToTerms"
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                                <span className="text-sm text-white">
                                    {" "}
                                    I accept the terms and conditions stated above
                                </span>
                            </div>
                            {errors.agreeToTerms && errors.agreeToTerms ? (
                                <span className="text-[0.7rem] text-red-600 font-semibold">
                                    {errors.agreeToTerms}
                                </span>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="font-bold  text-sm  capitalize px-4 py-[0.55rem]  bg-white text-[#695acd] rounded-xl  relative bottom-0"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Step4;
