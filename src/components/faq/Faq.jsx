import React from 'react'

export default function Faq({ title, description }) {
  return (
      <details className='border border-black w-full p-2 rounded-lg  text-white bg-[#695acd] text-balance'>
      <summary className='text-sm font-semibold '>{title}</summary>
      <p className='text-xs'>{description}</p>
      </details>
  )
}
