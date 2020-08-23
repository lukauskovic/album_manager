import React, { useState, useEffect } from 'react'

const SearchBar = (props : {filterAlbums : (searchValue : string) => void}) => {

    const [searchValue, setSearchValue] = useState('')

    const { filterAlbums } = props

    useEffect(()=>{
        const delayDebounce = setTimeout(() => {
            filterAlbums(searchValue)
          }, 300)
          return () => clearTimeout(delayDebounce)
    },[searchValue, filterAlbums])

    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearchValue(e.currentTarget.value)
    }

    return(
        <div className='SearchBar'>
            <form onSubmit={(e) => {e.preventDefault()}}>
                <input type="text" 
                    value={searchValue} 
                    onChange={handleSearch}
                    placeholder='Search' />
            </form>                
        </div>
    )
}

export { SearchBar }