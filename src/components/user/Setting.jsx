'use client'
import React from 'react'
import Image from 'next/image'
import arrow from '../../../public/icons/arrow-white-right.svg'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from "react-redux";
import { setModalToshow, hideModalDispachFn, showModalDispachFn } from '@/redux/user'


export default function Setting({ icon, title, description, action }) {
    const dispatch = useDispatch();

    function showModal(title) {
        dispatch(showModalDispachFn())
        dispatch(setModalToshow(title))
    }
    const router = useRouter()

    function redirect(path) {
        router.push(path);
    }
    function settingAction(action) {
        action == 'redirectTo' ? redirect(`/main/user/${title.toLowerCase()}`) : showModal(title)
    }
    return (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#695acde4] text-white p-2" onClick={() => settingAction(action)}>
            <div className="user-info flex-1 flex items-center justify-between  ">
                <div className="flex gap-2  items-center">
                    <div className="flex items-center justify-center rounded-full ml-4 w-[20px] h-[20px]">
                        <Image src={icon} width={20} height={20} className='' alt='setting icon'/>
                    </div>
                    <div className="">
                        <h1 className='text-lg font-semibold capitalize'>{title}</h1>
                        <h1 className='text-xs font-semibold '>{description}</h1>
                    </div>
                </div>
                <div className="w-fit ">
                    <Image src={arrow} width={20} className='' alt='right arrow'/>
                </div>
            </div>

        </div>
    )
}
