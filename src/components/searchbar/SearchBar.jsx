'use client'
import React , {useState} from 'react'
import searchIcon from '../../../public/icons/search-01.svg'
import cancel2 from '../../../public/icons/cancel2.svg'
import Image from 'next/image'

const SearchBar = ({ search }) => {
    const [searchBarText, setSearchBarText] = useState('')
    const [isSearchClicked, setIsSearchClicked] = useState(false)

    function clearSearchbarInput(){
        setSearchBarText("")
        search("")
        setIsSearchClicked(!isSearchClicked)
    }
    function runSearch(query){
        search(query)
        setIsSearchClicked(!isSearchClicked)
    }
  return (
      <div className="max-w-md w-4/6 mx-auto flex items-center gap-2 backdrop:relative p-2 py-1 pr-1 border border-black rounded-[0.25rem]">
          <input type="text" name="" id="" value={searchBarText} onChange={(e) => setSearchBarText(e.target.value)} className='  w-full indent-2 p-1 outline-none' placeholder='Search for product' />
          {(isSearchClicked)? 
          (<div className=" w-fit aspect-sqiare right-2  p-2 border border-black rounded-[0.25rem]" onClick={() => clearSearchbarInput() }>
              <Image src={cancel2} width={20} alt='cancel icon'/>
          </div>) 
          :
              (<div className=" w-fit aspect-sqiare right-2  p-2 border border-black rounded-[0.25rem]" onClick={() => runSearch(searchBarText)}>
                  <Image src={searchIcon} width={20} alt='search icon'/>
          </div>)}
      </div>
  )
}

export default SearchBar