'use client'
import React , {useEffect, useState}from 'react'
import Nav from '@/components/Nav'
import UserDetail from '@/components/user/UserDetail'
import { useSelector, useDispatch } from "react-redux";
import UserProfile from '@/components/user/UserProfile';
import SyncLoader from "react-spinners/ClipLoader";
import UserInfoModal from '@/components/user/UserInfoModal';
// ... (import statements)
import Modal from '@/components/user/Modal';
import UserDateOfBirthDetail from '@/components/user/UserDateOfBirthDetail';

export default function Page() {
  const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.user.firebaseUserInfo);
    const data = useSelector((state) => state.user.data);
    const authCallbackUser = useSelector((state) => state.user.authCallbackUser);
    const authCallbackUserObj = JSON.parse(authCallbackUser)

    const userInfoArray = [
        {   
            index: 0,
            title: "Change your profile picture",
            action: 'changePfp',
            actionToPerfom: true,
        },
        {
            index: 1,
            title: "Change your NinSlip picture",
            action: 'changeNinSlip',
            actionToPerfom: data?.userData?.reuploadNin
        },
        ,
        {
            index: 2,
            title: "Send email verification link",
            action: 'verifyEmail',
            actionToPerfom: !authCallbackUserObj?.emailVerified
        },
        ,
        {
            index: 3,
            title: "Change your account email",
            action: 'changeEmail',
            actionToPerfom: authCallbackUserObj?.emailVerified
        },
        {
            index: 5,
            title: "Change your Location",
            action: 'changeLocation',
            actionToPerfom: true
        }
      
    ]
const [settings , setSettings] = useState()

    const showModal = useSelector((state) => state.user.showModal);

    useEffect(() => {
        setSettings([
            {
                name: "fullname",
                value: data?.userData?.fullname,
            },
            {
                name: "address",
                value: data?.userData?.address,
            },
            {
                name: "phone",
                value: data?.userData?.phone,
            },
            {
                name: "bvnnumber",
                value: data?.userData?.bvnnumber,
            },
            {
                name: "ninnumber",
                value: data?.userData?.ninnumber,
            },
        ])
        console.log("data from redux  " , data?.userData)
    },[])
  return (
    <>
          {showModal && <Modal />}
          <div className="w-full relative h-fit  overflow-y-auto">
              <div className="p-[20px] flex flex-col gap-4">
                  <UserProfile />
                  <div className="flex flex-col gap-4 items-center  overflow-y-auto hide-scrollbar h-[55vh]">
                  <UserDateOfBirthDetail name={"Date Of Birth"} value={data?.userData?.dateOfBirth} />
                      {settings?.map((userDetail, index) => (
                          <UserDetail key={index} name={userDetail.name} value={userDetail.value} index={index} />
                      ))}
                     
                      {
                          userInfoArray.map((info, index) => {
                              if (info.actionToPerfom == false) {
                                  return;
                              }

                              return <UserInfoModal key={index} index={info.index} title={info.title} action={info.action} />
                          })
                      }
                  </div>
              </div>
              <Nav />
          </div>
    </>
  );
}

