import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { Context } from '../../Context/JSXContext'
import { assets } from '../assets/assets';
const Navbar = () => {
  const {handleScrollLink} = useContext(Context);
  const [mobileMenu, setMobileMenu] = useState(false)
  return (
    <div className=''>
      <div className='fixed -translate-x-1/2 left-1/2 lg:w-[80%] xl:w-[62%] z-50'>
        <div className='hidden lg:flex justify-between  bg-black text-white p-4 text-2xl navbar gap-4 border-b-4 border-b-neutral-400 items-center'>
          <div>
            <Link to={'/'} onClick={()=>handleScrollLink('home')}>
              <img className='w-[80px] h-[80px] object-cover hover:scale-110 ease-in-out transition-all' src={assets.logo} alt="" />
            </Link>
          </div>

          <div className='group'>
            <Link to={'/'} onClick={()=>handleScrollLink('home')}>Home</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>

          <div className='group'>
            <Link to={'/world'} onClick={()=>handleScrollLink('category')}>World</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>

          <div className='group'>
            <Link to={'/politics'} onClick={()=>handleScrollLink('category')}>Politics</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>

          <div className='group'>
            <Link to={'/business'} onClick={()=>handleScrollLink('category')}>Business</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>

          <div className='group'>
            <Link to={'/entertainment'} onClick={()=>handleScrollLink('category')}>Entertainment</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>

          <div className='group'>
            <Link to={'/who-is'} onClick={()=>handleScrollLink('category')}>Who is?</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>
        </div>
      </div>
      <div className='fixed z-40 top-0 left-0 w-full lg:hidden bg-black text-white p-4 text-2xl navbar gap-4 border-b-4 border-b-neutral-400 items-center'>
        <div className='flex justify-between items-center'>
          <div>
            <Link to={'/'} onClick={()=>handleScrollLink('home')}>
              <img className='w-[50px] h-[50px] object-cover' src={assets.logo} alt="" />
            </Link>
          </div>
          <div>
            <img className='w-[40px] h-[40px] object-cover' src={assets.menu} alt="" onClick={()=>setMobileMenu(!mobileMenu)}/>
          </div>
        </div>
      </div>

      <div className={`fixed left-0 top-0 z-50 text-white ease-in-out transition-all bg-black w-3/4 h-full border-r-2 border-neutral-500 ${mobileMenu ? `translate-x-0` : `-translate-x-full`}`}>
        <div className='p-8 text-2xl'>
          <div className='my-4'>
            <Link to={'/'} onClick={()=>{handleScrollLink('home'), setMobileMenu(false)}}>
              <p>Home</p>
            </Link>
          </div>
          <div className='my-4'>
            <Link to={'/world'} onClick={()=>{handleScrollLink('category'), setMobileMenu(false)}}>
              <p>World</p>
            </Link>
          </div>
          <div className='my-4'>
            <Link to={'/politics'} onClick={()=>{handleScrollLink('category'), setMobileMenu(false)}}>
              <p>Politics</p>
            </Link>
          </div>
          <div className='my-4'>
            <Link to={'/business'} onClick={()=>{handleScrollLink('category'), setMobileMenu(false)}}>
              <p>Business</p>
            </Link>
          </div>
          <div className='my-4'>
            <Link to={'/entertainment'} onClick={()=>{handleScrollLink('category'), setMobileMenu(false)}}>
              <p>Entertainment</p>
            </Link>
          </div>
          <div className='my-4'>
            <Link to={'/who-is'} onClick={()=>{handleScrollLink('category'), setMobileMenu(false)}}>
              <p>Who is?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
