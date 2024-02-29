import React, { useState } from 'react';

// Functional component for a brand option button
const BrandOptions = ({ filterProducts }) => {
    // State to manage brand options
    const [brandOptions, setBrandOptions] = useState([
        { brandID: 'all', isSelected: true },
        { brandID: 'samsung', isSelected: false },
        { brandID: 'apple', isSelected: false },
        { brandID: 'google', isSelected: false },
        { brandID: 'sony', isSelected: false },
        { brandID: 'oneplus', isSelected: false },
    ]);

    // Function to handle checkbox change
    const handleCheckboxChange = (id, isSelected) => {
        // Update the brand options based on the selected brand
        const updatedBrandOptions = brandOptions.map((brand) => {
            if (brand.brandID === id) {
                filterProducts(brand.brandID); // Filter products based on the selected brand
                return { ...brand, isSelected: true };
            } else {
                return { ...brand, isSelected: false };
            }
        });

        // Update state with the new brand options
        setBrandOptions(updatedBrandOptions);
    };

    return (
        <div className='flex gap-4 py-2 w-full overflow-x-auto px-4 hide-scrollbar'>
            {/* Map through brand options and render BrandOptionButton for each */}
            {brandOptions.map((brand, index) => (
                <BrandOptionButton
                    key={index}
                    brandID={brand.brandID}
                    isSelected={brand.isSelected}
                    handleCheckboxChange={handleCheckboxChange}
                />
            ))}
        </div>
    );
};

// Functional component for a brand option button
const BrandOptionButton = ({ brandID, isSelected, handleCheckboxChange }) => {
    return (
        <div
            id="brand-option"
            className={`rounded-2xl px-3 py-1 capitalize text-xl ${
                isSelected
                    ? 'border-[#695acde4] border text-[#695acde4] bg-white font-semibold'
                    : 'border bg-[#695acde4] text-white  border-white'
            }`}
            onClick={() => handleCheckboxChange(brandID, isSelected)} // Invoke handleCheckboxChange when clicked
        >
            {brandID}
        </div>
    );
};

export default BrandOptions; // Export BrandOptions component
