import React, { useState, useEffect } from 'react'
import { Header } from 'UI/components/Header'
import { ArtistInterface, AlbumItemInterface } from 'utils/Interfaces'
import { getRequest } from 'utils/Networking'
import { useParams } from 'react-router-dom'
import { AlbumItem } from 'UI/components/AlbumItem'
import { LoadingSpinner } from 'UI/components/LoadingSpinner'
import { AxiosError } from 'axios'

const ArtistDiscography = (props : {albums : AlbumItemInterface[], toggleFavorite : (index: number) => void}) => {

    const {id} = useParams()

    const [artist, setArtist] = useState<ArtistInterface>()

    const getArtist = () => {
        getRequest(`artists/${id}`, (response : ArtistInterface) => {
            setArtist(response)
        }, (error : AxiosError) => {
            console.log(error)
        })
    }

    useEffect(getArtist, [])

    if(!artist) return(
        <div>
            <LoadingSpinner/>
        </div>
    )
    else return(
        <div className='AlbumList'>
            <Header title={artist.title}/>
            <div className='AlbumList__List'>
                {
                    props.albums.map((item : AlbumItemInterface, index : number) =>
                        item.artistId === Number(id) && <AlbumItem key={index} item={item} toggleFavorite={()=>props.toggleFavorite(index)}/>
                    )
                }
            </div>
        </div>
    )
}

export { ArtistDiscography }