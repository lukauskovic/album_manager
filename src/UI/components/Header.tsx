import React from 'react'
import { SearchBar } from './SearchBar'

const Header = (props : {title : string, filterAlbums? : (searchValue : string) => void}) => {

    return(
        <div className='Header'>
            <p className='Header__Title'>{props.title}</p>
            {props.filterAlbums && <SearchBar filterAlbums={props.filterAlbums}/>}
        </div>
    )
}

export { Header }