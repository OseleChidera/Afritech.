import React from 'react'
import Nav from '@/components/Nav'


export default function page() {
    return (
        <div className='w-full relative min-h-screen max-h-fit border border-red-600   overflow-y-auto'>
            <div className="pt-8 pb-[120px] flex flex-col gap-4">
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
            </div>

            <Nav />
        </div>
    )
}
