import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { Context } from '../../Context/JSXContext'
import { assets } from '../assets/assets';
const Navbar = () => {
  const {handleScrollLink} = useContext(Context);

  return (
    <div>
      <div className='hidden lg:flex justify-between bg-black text-white p-4 text-2xl navbar gap-4 border-b-4 border-b-neutral-400 items-center'>
       
          <div className='group'>
            <Link to={'/'} onClick={()=>handleScrollLink()}>Home</Link>
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
            <Link to={'/entertainment'} onClick={()=>handleScrollLink()}>Entertainment</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>

          <div className='group'>
            <Link to={'/who-is'} onClick={()=>handleScrollLink()}>Who is?</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>

          <div className='group'>
            <Link to={'/test'} onClick={()=>handleScrollLink()}>More</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>
        
        <div>
          <img className='w-[80px] h-[80px] object-cover' src={assets.logo} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
