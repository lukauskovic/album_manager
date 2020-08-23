export interface AlbumItemInterface {
    id : number
    imageUrl : string
    title : string
    artistId : number
    releaseDate : number
    price : string
    favorite? : boolean
}

export interface ArtistInterface {
    id : number
    title : string
}