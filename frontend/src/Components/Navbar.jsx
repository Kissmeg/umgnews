import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { Context } from '../../Context/JSXContext'
const Navbar = () => {
  const {handleScrollLink} = useContext(Context);

  return (
    <div>
      <div className='hidden lg:flex bg-neutral-950 text-white p-4 text-2xl navbar gap-4 border-b-4 border-b-neutral-400'>
        <div>
          <Link to={'/'}><img src="" alt="Logo" /></Link>
        </div>
        <div className='group'>
          <Link to={'/'} onClick={()=>handleScrollLink()}>Heading</Link>
          <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

          </div>
        </div>

        <div className='group'>
          <Link to={'/world'} onClick={()=>handleScrollLink()}>World</Link>
          <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

          </div>
        </div>

        <div className='group'>
          <Link to={'/politics'} onClick={()=>handleScrollLink()}>Politics</Link>
          <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

          </div>
        </div>

        <div className='group'>
          <Link to={'/business'} onClick={()=>handleScrollLink()}>Business</Link>
          <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

          </div>
        </div>

        <div className='group'>
          <Link to={'/health'} onClick={()=>handleScrollLink()}>Health</Link>
          <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

          </div>
        </div>

        <div className='group'>
          <Link to={'/entertainment'} onClick={()=>handleScrollLink()}>Entertainment</Link>
          <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

          </div>
        </div>

        <div className='group'>
          <Link to={'/travel'} onClick={()=>handleScrollLink()}>Travel</Link>
          <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

          </div>
        </div>

        <div className='group'>
          <Link to={'/test'} onClick={()=>handleScrollLink()}>More</Link>
          <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
