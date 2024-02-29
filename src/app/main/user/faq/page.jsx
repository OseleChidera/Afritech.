'use client'
import React, { useState } from 'react'
import Nav from '@/components/Nav'
import Faq from '@/components/faq/Faq'
export default function page() {
    const [feedbackSent, setFeedbackSent] = useState(false)
    // const [feedbackWarn, setFeedbackWarn] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [feedbackWarning, setFeedbackWarning] = useState(false)
    const FAQ = [
        { title: 'How can I contact customer support ?' ,
        description: 'You can contact customer support by  Sending  a feedback message starting with "SUPPORT".'
        },
        {
        title: 'What are the available payment channels ?',
        description: 'We currently only support debit cards bank transfers and USSD Transfers.'
        },
        {
        title: 'What to do if I want to dispute the transaction ?',
        description: 'You can dispute a transaction by sending a feedback message starting with the "Order ID" followed by the type of payment method was used in the transaction.'
        },
        { title: 'What to do if ship goods were damaged ?' ,
        description: 'If your goods were damaged in transit, you can generate feedback message from the feedback section starting with "Order ID" and you would be contacted via the email you provided for futher information.'
        },
        { title: 'How do I edit my profile information ?' ,
        description: 'You can edit your profile information by going into the user section and clicking on the user profile panel at the top of the screen.'
        },
        { title: 'How long is payment duration for any order ?' ,
        description: 'After an order has been made, the user is required to make payment within 2 years from the date to the order was placed.'
        },
        {
        title: 'When would my order be available for pickup or delivery ?',
        description: 'Your order will be available for pickup 3 days after you have completed payment'
        },
        { title: 'How long does it take to get an email confirmation after completing payment ?' ,
        description: 'After a user has completed payment,there is an order processing window between 20-48 hours to process the order'
        }
    ]
    return (
        <div className={`w-full relative border border-red-600 p-2 min-h-screen ${feedbackSent ? 'flex flex-col items-center justify-center h-screen ' : "min-h-fit "}`}>

            <div className="flex flex-col gap-4  items-center ">
                {FAQ.map((faq,index) => (<Faq key={index} title={faq.title} description={faq.description}/>))}
            </div>

            <Nav />
        </div>
    )
}
