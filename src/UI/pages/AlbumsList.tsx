import React, { useState } from 'react'
import { Header } from 'UI/components/Header'

import { AlbumItemInterface } from '../../utils/Interfaces'
import { AlbumItem } from 'UI/components/AlbumItem'
import { getRequest } from 'utils/Networking'
import { AxiosError } from 'axios'

const AlbumsList = (props : {albums : AlbumItemInterface[], toggleFavorite : (index: number) => void}) => {

    const [searchResults, setSearchResults] = useState<AlbumItemInterface[]>([])
    const [searchResultsActive, setSearchResultsActive] = useState(false)

    const params = new URLSearchParams(window.location.search)
    const limit = params.get('limit') || 10

    const filterAlbums = (searchValue : string) => {
        searchValue ?
            getRequest(`/albums/?q=${searchValue}`, (response : AlbumItemInterface[])=>{
                setSearchResultsActive(true)
                setSearchResults(response)
            }, (error : AxiosError) => {
                console.log(error)
            }) :
            setSearchResultsActive(false)
    }

    return(
        <div className='AlbumsList'>
            <Header 
                title='Album list' 
                filterAlbums={filterAlbums} />

            <div className='AlbumList__List'>
                {
                    props.albums.map((item, index) =>   
                        !searchResultsActive ?
                            item.title && index < limit && 
                                <AlbumItem key={index} item={item} toggleFavorite={()=>props.toggleFavorite(index)}/> :
                            searchResults.filter(album => album.id === item.id).length > 0 && index < limit &&
                                <AlbumItem key={index} item={item} toggleFavorite={()=>props.toggleFavorite(index)}/>
                    )
                }
            </div>
        </div>
    )
}

export { AlbumsList }