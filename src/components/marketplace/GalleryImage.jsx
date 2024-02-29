import React from 'react'
import Image from 'next/image'

export default function GalleryImage({ imageUrl, index, selectGalleryImage, selected }) {

    
    return (
        <div className={`gallery-image p-1 width-full aspect-square  bordert-black rounded-md shadow-xl border-[0.2px] border-black ${selected ? 'selected' : ''} flex items-center justify-center`} key={index} onClick={(event) => selectGalleryImage(index)}>
            <Image src={imageUrl} key={index} className="object-contain w-auto h-auto" width={40} height={40} alt='product image'/>
        </div>
    )
}
