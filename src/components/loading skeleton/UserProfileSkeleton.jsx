import React from 'react'

export default function UserProfileSkeleton() {
  return (
    <div>
      <div className="flex flex-row gap-4 items-center">
        <div className=" rounded-full overflow-hidden w-[70px] h-[70px] bg-gray-400 animate-pulse"></div>
        <div className="flex flex-col gap-2 w-[50vw] h-fit">
            <div className="h-[0.6rem] bg-gray-400 rounded-full animate-pulse"></div>
            <div className="h-[0.6rem] bg-gray-400 rounded-full animate-pulse w-11/12"></div>
            <div className="h-[0.6rem] bg-gray-400 rounded-full animate-pulse w-[30%]"></div>
        </div>
      </div>
    </div>
  )
}
