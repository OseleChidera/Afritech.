import React from 'react'
import trashIcons from '../../../public/icons/trashIcon.svg'
import Image from 'next/image'
import Link from 'next/link'
import image from '../../../public/images/samsung-galaxy-s21-ultra-5g-4.jpg'
import { formatNumberWithCommas } from '@/utils/helperFunctions'


const PaymentProduct = ({ productID, productName, productPrice, productImageUrl }) => {
  return (
      <div className=" cart-item rounded-md relative  flex flex-1 gap-2 bg-white overflow-hidden p-2 items-center">
          <div className=" w-fit  h-fit rounded-xl  shadow-2xl bg-whie overflow-hidden cart-item-image">
              {productImageUrl  && <Image src={productImageUrl} className="object-cover w-auto h-auto " width={70} height={70}  alt='product'/>}
          </div>
          <div className="info p-2 text-black">
              <h2 className="text-xs font-semibold">
                  {/* <Link href={`/product/`}>samsng galaxy note 9</Link> */}
                  <Link href={`/product/`}>
                      <h2 className='capitalize text-lg'>{productName}</h2>
                  </Link>
              </h2>
              { }
              <h3 className="text-xs ">₦{formatNumberWithCommas(productPrice)}</h3>
          </div>
      </div>
  )
}

export default PaymentProduct