import React from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center backdrop-blur-lg'>
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />
        </div>
    )
}

export default Loader