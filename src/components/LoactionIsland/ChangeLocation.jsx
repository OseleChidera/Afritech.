import React from 'react'

const ChangeLocation = ({ locationSearchIsShown, changeLocation }) => {
  return (
      <div className={`location-btn ${locationSearchIsShown ? 'show-buttons flex flex-col ' : "hidden"} w-fit absolute top-10 border border-black rounded-sm z-10`}>
          <div className='px-5 border border-black bg-[#f9f9f5]' onClick={(e) => changeLocation(e)}>
              Lagos
          </div>
          <div className='px-5 border border-black bg-[#f9f9f5]' onClick={(e) => changeLocation(e)}>
              Abuja
          </div>
      </div>
  )
}

export default ChangeLocation