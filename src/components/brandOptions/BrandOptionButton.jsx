'use client'; // Indicates that this code runs on the client side
import React from 'react'; // Import React library

// Functional component for a brand option button
const BrandOptionButton = ({ brandID }) => {
    return (
        <div className='rounded-2xl px-3 py-1 border bg-[#695acde4] text-white border-white capitalize text-xl'>
            {/* Checkbox input (hidden) */}
            <input
                type="checkbox"
                id={id} // Note: id variable is not defined
                onChange={handleCheckboxChange} // handleCheckboxChange function is not defined
                checked={isSelected} // isSelected variable is not defined
                className='hidden'
            />
            {/* Label for the checkbox */}
            <label htmlFor={id} className='flex-auto rounded-md h-fit'>
                {brandID}
            </label>
        </div>
    );
};

export default BrandOptionButton; // Export BrandOptionButton component
