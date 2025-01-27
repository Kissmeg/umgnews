import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div className='mt-32 h-[70vh]'>
      <div>
        <p className='text-center font-bold text-5xl'>404 Error page</p>
        <Link to={'/'}><p className='text-center mt-8 animate-pulse text-3xl'>Return to main page</p></Link>
      </div>
    </div>
  )
}

export default Notfound
