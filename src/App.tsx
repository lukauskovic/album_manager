import React, { useState, useEffect } from 'react'
import 'assets/styles/app.scss'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { AlbumsList } from 'UI/pages/AlbumsList'
import { AlbumItemInterface } from 'utils/Interfaces'
import { getRequest } from 'utils/Networking'
import cloneDeep from 'lodash.clonedeep'
import { ArtistDiscography } from 'UI/pages/ArtistDiscography'
import { LoadingSpinner } from 'UI/components/LoadingSpinner'
import { AxiosError } from 'axios'

const App = () => {

	const [albums, setAlbums] = useState<AlbumItemInterface[]>([])

    const getAlbums = () => {
        getRequest('/albums', (response : AlbumItemInterface[])=>{
            setAlbums(response)
        }, (error : AxiosError)=>{
			console.log(error)
        })
    }

	useEffect(getAlbums, [])

	const toggleFavorite = (index : number) => {
		let albumsBuffer = cloneDeep(albums)
		albumsBuffer[index].favorite = !albumsBuffer[index].favorite
		setAlbums(albumsBuffer)
	}
	
	if(!albums.length) return(
		<div>
			<LoadingSpinner/>
		</div>
	)
	else return(
		<div className='App'>
			<Router>
				<Route path='/' exact={true}>
					<AlbumsList albums={albums} toggleFavorite={toggleFavorite}/>
				</Route>
				<Route path='/artist/:id'>
					<ArtistDiscography albums={albums} toggleFavorite={toggleFavorite}/>
				</Route>
			</Router>
		</div>

	)
}

export { App }