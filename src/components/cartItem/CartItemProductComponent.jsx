import Image from "next/image";
import React, { useState } from "react";
import phone from "../../../public/images/samsung-galaxy-s21-ultra-5g-4.jpg";
import addIcon from '../../../public/icons/add.svg';
import trashIcon from '../../../public/icons/trashIcon.svg';
import { usePathname } from "next/navigation";

export default function CartItemProductComponent () {
    // Get the current pathname using Next.js's usePathname hook
    const pathName = usePathname();
    // State variable to track whether the current pathname includes '/main/payment'
    const [isPathNameActive, setIsPathNameActive] = useState(pathName.includes(`/main/payment`));

    return (
        <div className="product relative rounded-xl flex flex-1 gap-2 bg-white overflow-hidden p-1">
            <div className="w-fit h-fit rounded-xl shadow-2xl bg-whie overflow-hidden">
                <Image src={phone} className="aspect-auto object-cover" width={70} alt="product image"/>
            </div>
            <div className="info p-2 text-black">
                <h2 className="text-xs font-semibold">Samsung note 9</h2>
                <h3 className="text-xs">$1000</h3>
            </div>
            {/* Conditionally render addIcon or trashIcon based on isPathNameActive */}
            {!isPathNameActive ? (
                <div className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none rounded-tr-none p-[0.3rem]">
                    <Image src={addIcon} width={20} alt="add icon"/>
                </div>
            ) : (
                <div className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none rounded-tr-none p-[0.3rem]">
                    <Image src={trashIcon} width={20} alt="trash icon"/>
                </div>
            )}
        </div>
    );
};

