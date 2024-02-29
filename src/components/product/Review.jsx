import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import trashIcon from '../../../public/icons/trashIcon.svg'
import { deleteReview } from '../../utils/helperFunctions'
import { useSelector, useDispatch } from "react-redux";


export default function Review({ productId, userID, reviewID, review, date, collectionString }) {
     // Retrieve the user ID from the Redux store
    const userIdFromReduxStore = useSelector((state) => state.user.userID);



  return (
      <div className={`bg-[#695acd] text-white rounded-xl capitalize px-4 py-[0.55rem] relative  gap-6 w-full  ${(review?.length == 0) ? 'hidden' : 'flex flex-row justify-between  items-center'}`}>
          <div className="flex flex-col gap-1  ">
              <span id="userID" className='text-[0.6rem]'>{userID}</span>
              <div className="min-h-fit max-h-[6ch] overflow-scroll  flex-1 max-w-full w-full  text-balance">
                  <span id="review" className='text-sm '>{review}</span>
              </div>
         </div>
          {userID == userIdFromReduxStore && 
              (<div className="" onClick={() => deleteReview(productId, reviewID, collectionString)}>
                  <Image src={trashIcon} width={20} height={20} alt='trash icon'/>
              </div>)
          }
          <span id="review-time" className='text-[0.55rem] absolute right-2 bottom-1'>{date}</span>
    </div>
  )
}
