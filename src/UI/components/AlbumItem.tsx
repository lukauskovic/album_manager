import React, { useState, useEffect } from 'react'
import {AlbumItemInterface, ArtistInterface} from '../../utils/Interfaces'
import { getRequest } from 'utils/Networking'
import {Link } from 'react-router-dom'
import { AxiosError } from 'axios'

const AlbumItem = (props : {item : AlbumItemInterface, toggleFavorite : () => void}) => {

    const [artist, setArtist] = useState<ArtistInterface>()
    const [unmounted , setUnmounted] = useState(false)

    const { item: { artistId } } = props

    useEffect(()=>{
        const getArtist = () => {
            getRequest(`artists/${artistId}`, (response : ArtistInterface)=> {
                !unmounted && setArtist(response)
            }, (error : AxiosError)=>{
                console.log(error)
            })
        }
        getArtist()
        return () => {
            setUnmounted(true)
        }
    }, [artistId, unmounted])

    if(!artist) return(<div/>)
    else return (
        <div className='AlbumItem'>
            <div className='AlbumItem__Info'>
                <img alt='album_cover'src={props.item.imageUrl}/>
                <div>
                    <p>{props.item.title}</p>
                    <Link to={'/artist/' + artist.id}><p>{artist.title}</p></Link>
                </div>
            </div>
            <div className='AlbumItem__Data'>
                <div className='AlbumItem__Data--Release'>
                    <p>Released:</p>
                    <p>{new Date(props.item.releaseDate).getFullYear()}</p>
                </div>
                <p className='AlbumItem__Data--Price'>
                    {props.item.price}
                </p>
                {
                    props.item.favorite ? 
                    <div 
                        className='AlbumItem__Data--RemoveFavorite'
                        onClick={props.toggleFavorite}>Remove favorite</div> :
                    <p 
                        className='AlbumItem__Data--MarkFavorite'
                        onClick={props.toggleFavorite}>MARK AS FAVORITE</p>
                }
            </div>
        </div>
    )
}

export { AlbumItem }