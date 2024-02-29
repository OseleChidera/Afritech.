'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import p from '../../../public/images/photo4.jpg'
import { useSelector , useDispatch } from "react-redux";
import ViewPfpModal from '../modals/ViewPfpModal';
import LogoutModal from '../modals/LogoutModal';
import ChangePfpModal from '../modals/ChangePfpModal';
import NinSlipModal from '../modals/NinSlipModal';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import ChangeEmailModal from '../modals/ChangeEmailModal';
import ChangeLocationModal from '../modals/ChangeLocationModal';
import ChangeDobModal from '../modals/ChangeDobModal';


export default function Modal() {
    const [chooseNewPfp, setchooseNewPfp] = useState(false)
    const [newPfp, setNewPfp] = useState('')
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
    const modalToDisplay = useSelector((state) => state.user.modalToshow);


    function showModal(modalToDisplay) {
        switch (modalToDisplay) {
            case 'reset password':
                return <ChangePasswordModal />;
            case 'Logout':
                return <LogoutModal />;
            case 'viewePfp':
                return <ViewPfpModal />;
            case 'changePfp':
                return <ChangePfpModal />;
            case 'changeNinSlip':
                return <NinSlipModal />;
            case 'changeEmail':
                return <ChangeEmailModal />;
            case 'changeDob':
                return <ChangeDobModal />;
            case 'changeLocation':
                return <ChangeLocationModal />;
            default: null;
        }
    }

  
  return (
        <>
          {
              showModal(modalToDisplay)
          }
        </>
  )
}







