'use client'
import React, { useState, useEffect, useRef } from 'react'
import homeIconActive from "../../public/icons/home-inactive.svg";
import storeIconActive from "../../public/icons/store-inactive.svg";
import favourites from "../../public/icons/favourite.svg"
import payment from '../../public/icons/history.svg'
import userIconActive from "../../public/icons/user-inactive.svg";
import Link from 'next/link';
import Image from 'next/image';
import { gsap, Power3, TimelineLite } from 'gsap';

import { useRouter, usePathname } from "next/navigation";
import { array } from 'yup';


const buttonDetails = [
    {
        buttonName: 'home',
        activeIcon: homeIconActive
    },
    {
        buttonName: 'marketplace',
        activeIcon: storeIconActive
    },
    {
        buttonName: 'favourites',
        activeIcon: favourites
    },
    {
        buttonName: 'payment',
        activeIcon: payment
    },
    {
        buttonName: 'user',
        activeIcon: userIconActive
    },
]

const Nav = () => {
    const pathName = usePathname();
    const [isPathNameActive, setIsPathNameActive] = useState(pathName.includes(`/main/hme`))
    const tl = gsap.timeline();

    useEffect(() => {
        const elements = document.querySelectorAll('.nav-item'); 
        // tl.to(document.querySelector('.active'), { top: '0%', ease: Power3.easeIn, duration: 0.35 })
        const inactiveElements = Array.from(elements).filter(element => !element.classList.contains('active'));
        tl.to(Array.from(inactiveElements), { top: '0%', ease: Power3.easeInOut, duration: 0.35, stagger: 0.2 })
       
    }, []);

  return (
      <div id='nav' className={`nav bg-[#695acde4] `} >
          
      {buttonDetails.map((button,index) => (
        <NavBtns
          key={index}
          buttonName={button.buttonName}
          baseIcon={button.baseIcon}
          activeIcon={button.activeIcon}
        />
      ))}
    </div>
  );
}

export default Nav




const NavBtns = ({ buttonName, baseIcon, activeIcon }) => {
    const pathName = usePathname();
    // const isPathNameActive = pathName.includes(`/main/${buttonName}`) 
    const [isPathNameActive, setIsPathNameActive] = useState(pathName.includes(`/main/${buttonName}`))
  
  return (
      <Link href={`/main/${buttonName}`} className='active:nav-item'>
          <div className={`flex flex-col items-center gap-1 h-fit tab flex-1 relative nav-item nav-button ${pathName.includes(`/main/home`) ? " " : "nav-item-no-animation"} max-h-fit`}>
              <button id="icon-div" className={`flex flex-col items-center justify-center p-4 rounded-2xl 
                focused ${isPathNameActive ? 'shadow-inner' : ''} `} >
                  <Image
                      src={activeIcon}
                      alt={buttonName}
                      width={25}
                      height={25}
                      className={`aspect-square active-image `}
                  />
              </button>
              <h2 className={`text-white text-sm capitalize font-bold  description  ${isPathNameActive  ? 'show-text' : 'hide-text'}`}>{buttonName}</h2>
          </div>
      </Link>
  )
}
