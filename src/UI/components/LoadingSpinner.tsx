import React from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const LoadingSpinner = () => {

    return(
        <div className='LoadingSpinner'>
            <Loader
                type="Puff"
                color="#13d6ea"
                height={100}
                width={100}
                timeout={100000}
            />
        </div>
    )
}

export { LoadingSpinner }