"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import illustration from "../../public/images/Server-bro.svg";
import phoneImg from "../../public/images/pexels-vlad-chețan-3121979.jpg";
import atmImg from "../../public/images/pexels-luis-moya-14528919.jpg";
import twitter from "../../public/icons/icons8-twitter-50.png";
import instagram from "../../public/icons/icons8-instagram-50.png";
import twitch from "../../public/icons/icons8-twitch-50.png";
import photo1 from "../../public/images/photo1.jpeg";
import photo2 from "../../public/images/photo2.jpg";
import photo3 from "../../public/images/photo3.jpg";
import photo4 from "../../public/images/photo4.jpg";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { incremented, decremented } from "@/redux/user";
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { setupAuthObserver } from "../../firebaseAuth";
import {
  collection,
  getDocs,
  getDoc,
  getFirestore,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { Auth, database } from "../../firebaseConfig";
import { useRouter } from "next/navigation";

const page = () => {
  const [fetchedUserData, setFetchedUserData] = useState(null);
  const [userID, setUserID] = useState(null);

  const dispatch = useDispatch();
  const auth = getAuth();
  const router = useRouter();

  function redirect(path) {
    router.push(path);
  }

  async function fetchUser(userID) {
    try {
      const userDocRef = doc(database, "Users", userID);
      // Fetch initial data
      const initialSnapshot = await getDoc(userDocRef);
      const initialUserData = initialSnapshot.data();
      // Set initial data
      setFetchedUserData(
        fetchedUserData ? fetchedUserData.profilePicture || "" : ""
      );
      // Set up real-time listener for changes
      const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
        const fetchedUserData = snapshot.data();
        // console.log("user id from dynamic: ", fetchedUserData)
        setFetchedUserData(fetchedUserData);
      });

      // Cleanup the listener when the component unmounts or as needed
      return () => unsubscribe();
    } catch (error) {
      console.log("Error fetching data:", error, error.code, error.message);
    }
  }

  function checkIfUserIsloggedIn(auth) {
    if (auth.currentUser) router.push("/main/home");
    else router.push("/signin");
  }

  useEffect(() => {
    const authCallback = (user) => {
      if (user) {
        fetchUser(user.uid);
        setUserID(user.uid);
        console.log("User is authenticated", user);
      } else {
        console.log("User is not authenticated.");
      }
    };

    // Set up the auth observer
    setupAuthObserver(authCallback);

    return () => {
      // Clean up the observer when the component is unmounted
    };
  }, []);

  return (
    <div className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#ffffff] text-[#695acde4] border ">
      <div className="flex flex-col border border-black  min-h-screen max-h-fit h-full  w-full ">
        <div
          id="first"
          className="w-full h-fit flex flex-col gap-4 bg-white p-24 px-5   md:items-center md:constant-spacing-md md:px-48"
        >
          <h1 className="text-[#F1A208] max-w-md w-full text-5xl font-bold  md:mb-5 md:text-8xl md:text-center md:max-w-xl">
            Finance Your Tech Dreams!
          </h1>
          <div className="w-fit h-fit mx-auto">
            <Image
              src={illustration}
              width={250}
              objectFit="contain"
              className="max-w-md "
              alt="landing page illustration"
            />
          </div>

          <div className="flex flex-col gap-2 w-4/5 md:w-full md:flex-row mx-auto">
            <Link href={`/signup`} className="flex-1">
              <button className="rounded-xl bg-[#F1A208] text-white border-none p-[0.65rem] text-xl font-semibold w-full">
                Get Started
              </button>
            </Link>
            <button
              onClick={() => checkIfUserIsloggedIn(auth)}
              className="rounded-xl bg-[#695acde4] text-white  border-none p-[0.65rem] text-xl font-semibold w-full flex-1"
            >
              Resume
            </button>
          </div>
        </div>
        <div
          id="second"
          className="flex flex-col  bg-[#695acde4] p-10 px-5 mb-7  md:px-48"
        >
          <span className="mb-8 text-white text-2xl font-semibold md:text-5xl">
            Welcome to
          </span>
          <span className="text-5xl font-bold max-w-md text-[#FFAD08] text-shadow md:text-8xl md:max-w-3xl ">
            The Ultimate Tech Financing Platform
          </span>
        </div>

        <div
          id="third"
          className="flex flex-col  gap-14 constant-spacing p-4  text-[#695acde4] w-[95%] md:w-[85%]  mx-auto"
        >
          <div className="flex flex-col gap-4  w-full md:flex-row md:gap-8  md:items-center md:justify-between ">
            <Image
              src={phoneImg}
              className="rounded-3xl w-full aspect-square grayscale-image object-cover  md:max-w-sm"
              alt="mobile-phone"
            />
            <div className="flex flex-col w-full  break-normal gap-[0.85rem]">
              <h1 className="font-bold text-[3rem] leading-[2.85rem] text-[#FFAD08] text-shadow  md:text-6xl md:text-right">
                Supercharge Your Tech Funding Journey
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-4  w-full md:flex-row-reverse md:gap-8  md:items-center md:justify-between ">
            <Image
              src={atmImg}
              className="rounded-3xl w-full aspect-square grayscale-image object-cover  md:max-w-sm"
              alt="aim image"
            />
            <div className="flex flex-col w-full object-contain break-normal gap-[0.85rem]">
              <h1 className="font-bold text-[3rem] leading-[2.85rem] text-[#FFAD08] text-shadow  md:text-6xl">
                Solutions to Kickstart Your Success
              </h1>
            </div>
          </div>
        </div>
        <div
          id="fourth"
          className="constant-spacing p-4 md:constant-spacing-md bg-[#695acde4] text-white"
        >
          <div id="title" className="text-center mb-10">
            <h1 className=" text-[#FFAD08] font-bold text-[3rem] leading-[2.85rem] mb-3 text-shadow md:text-6xl">
              Our Experts
            </h1>
            <span className="max-w-sm text-lg text-white font-semibold md:text-xl">
              Meet our dedicated team of professionals ensuring your funding
              process
            </span>
          </div>
          <div className="flex flex-col items-center gap-8 md:flex-row ">
            <div className="flex flex-col items-center justify-center bg-[#695acde4] text-white bg-opacity-5 rounded-2xl aspect-square w-full max-w-full md:w-1/2 ">
              <Image
                src={photo1}
                width={120}
                className="rounded-full aspect-square grayscale-image object-cover  mb-1"
                alt="mobile-phone "
              />
              <h1 className="font-semibold text-[2rem] leading-[2.55rem] mb-[0.1rem] text-white md:text-base">
                Peter Larson
              </h1>
              <span className="font-regular text-lg text-white">CEO</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#695acde4] text-white bg-opacity-5 rounded-2xl aspect-square w-full max-w-full md:w-1/2 ">
              <Image
                src={photo2}
                width={120}
                className="rounded-full aspect-square grayscale-image object-cover  mb-1"
                alt="mobile-phone "
              />
              <h1 className="font-semibold text-[2rem] leading-[2.55rem] mb-[0.05rem]  text-white md:text-base">
                Samantha Brown
              </h1>
              <span className="font-regular text-lg  text-white">CFO</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#695acde4] text-white bg-opacity-5 rounded-2xl aspect-square w-full max-w-full md:w-1/2">
              <Image
                src={photo4}
                width={120}
                className="rounded-full aspect-square grayscale-image object-cover  mb-1"
                alt="mobile-phone "
              />
              <h1 className="font-semibold text-[2rem] leading-[2.55rem] mb-[0.15rem]  text-white md:text-base">
                Jonathan Hill
              </h1>
              <span className="font-regular text-lg text-white">
                Operations Manager
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#695acde4] text-white bg-opacity-5 rounded-2xl aspect-square w-full max-w-full md:w-1/2">
              <Image
                src={photo3}
                width={120}
                className="rounded-full aspect-square grayscale-image object-cover  mb-1"
                alt="mobile-phone "
              />
              <h1 className="font-semibold text-[2rem] leading-[2.85rem] mb-[0.15rem]  text-white  md:text-base">
                Jenny Smith
              </h1>
              <span className="font-regular text-lg  text-white">
                Marketing Manager
              </span>
            </div>
          </div>
        </div>
        <div
          id="fifth"
          className="flex flex-col gap-4 items-center text-center constant-spacing p-4 md:constant-spacing-md md:px-48"
        >
          <h1 className="font-bold text-[2.5rem] leading-[2.85rem] text-[#FFAD08] text-shadow md:text-6xl">
            Ready, Set, Fund!
          </h1>
          <div className="">
            <p className="max-w-xs w-full text-lg text-center text-[#695acde4] md:text-xl">
              Start your tech funding journey with us now and discover the power
              of seamless and effective financing solutions!
            </p>
          </div>

          <div className="flex flex-col gap-2 w-4/5 md:w-full md:flex-row ">
            <Link href={`/signup`} className="flex-1">
              <button className="rounded-xl bg-[#F1A208] border-none p-[0.65rem] text-xl font-semibold w-full text-white">
                Sign Up
              </button>
            </Link>
            <button
              onClick={() => checkIfUserIsloggedIn(userID)}
              className="rounded-xl flex-1  border-none p-[0.65rem] text-xl font-semibold bg-[#695acde4] text-white w-full"
            >
              Sign In
            </button>
          </div>
        </div>
        <footer className=" bg-black text-white flex flex-col items-center text-center gap-6 p-4 mb-0 ">
          <div id="socials" className="flex flex-row gap-5 w-fit ">
            <Image
              src={twitter}
              className="aspect-square"
              width={40}
              alt="social link twitter"
            />
            <Image
              src={instagram}
              className="aspect-square"
              width={40}
              alt="social link instagram"
            />
            <Image
              src={twitch}
              className="aspect-square"
              width={40}
              alt="social link twitch"
            />
          </div>
          <span className="max-w-xs w-full text-lg text-center">
            All Rights Reserved, Tech Financing Platform, 2023
          </span>
        </footer>
      </div>
    </div>
  );
};

export default page;
