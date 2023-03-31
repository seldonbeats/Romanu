import React from 'react'
import { IoLogoInstagram,IoLogoTwitter, IoLogoYoutube } from 'react-icons/io'
import { IoLogoFirebase } from 'react-icons/io5'

export default function footer() {
    return (
        <footer className="flex items-center w-full h-96 p-4 md:py-2 md:px-6 bg-black">
            <div className='flex items-center justify-start'>
                <div className='flex flex-col ml-56'>
                <h1 className='text-gray-300 text-2xl'>Social Media</h1>
                <h1 className='text-gray-200 text-xl flex items-center mx-1 my-2 cursor-pointer hover:text-red-300'><IoLogoInstagram className='mr-2'/>Instagram</h1>
                <h1 className='text-gray-200 text-xl flex items-center mx-1 my-2 cursor-pointer hover:text-red-500'><IoLogoYoutube className='mr-2 '/><h1 className="hover:text-white">YouTube</h1></h1>
                <h1 className='text-gray-200 text-xl flex items-center mx-1 my-2 cursor-pointer hover:text-red-300'><IoLogoTwitter className='mr-2'/>Telegram</h1>
                <h1 className='text-gray-200 text-xl flex items-center mx-1 my-2 cursor-pointer hover:text-red-300'><IoLogoFirebase className='mr-2'/>BeatStars</h1>

                </div>
            </div>
        </footer>
    )
}
