'use client'
import Nav from '@/components/Nav'
import Image from 'next/image'
import React, { useState } from 'react'
import UserProfile from '@/components/user/UserProfile'
import Setting from '@/components/user/Setting'
import help from '../../../../public/icons/help-1.svg'
import security from '../../../../public/icons/security-1.svg'
import legal from '../../../../public/icons/legal-1.svg'
import faq from '../../../../public/icons/faq-1.svg'
import logout from '../../../../public/icons/logout-1.svg'
import Modal from '@/components/user/Modal'
import { useSelector, useDispatch } from "react-redux";

export default function page() {
  
  const settingOptions = [
    {
      icon: help,
      title: "feedback",
      description: "Get support or send feedback",
      action: "redirectTo",
    },
    {
      icon: security,
      title: "reset password",
      description: "Change current password",
      action: "showModalOnClient",
    },
    {
      icon: legal,
      title: "Legal",
      description: "About our contract with you",
      action: "redirectTo",
    },
    {
      icon: faq,
      title: "FAQ",
      description: "Frequently asked questions",
      action: "redirectTo",
    },
    {
      icon: logout,
      title: "Logout",
      description: "Logout",
      action: "showModalOnClient",
    },
  ];

  const showModal = useSelector((state) => state.user.showModal);

  const dispatch = useDispatch()
  return (
    <>
      {showModal && <Modal/>}
      <div className={`w-full relative h-fit p-[20px] pb-0 ${showModal ? " overflow-" : ''}`}>
        <UserProfile />
        <div className="flex flex-col gap-3 h-fit  ">
          {settingOptions.map((settingOption,index) => (
            <Setting
            key={index}
              icon={settingOption.icon}
              title={settingOption.title}
              description={settingOption.description}
              action={settingOption.action}
            />
          ))}
        </div>
        <Nav />
      </div>
    </>
  );
}