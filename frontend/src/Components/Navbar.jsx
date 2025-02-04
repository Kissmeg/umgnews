import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { Context } from '../../Context/JSXContext'
import { assets } from '../assets/assets';
const Navbar = () => {
  const {handleScrollLink, upButton, handleTop} = useContext(Context);
  const [mobileMenu, setMobileMenu] = useState(false)
  return (
    <div className=''>
      <div className={`fixed ease-in-out transition-all bottom-12 right-12 cursor-pointer animate-up ${upButton}`} onClick={()=>handleTop()}>
        <img src={assets.arrowup} alt=""/>
      </div>
      <div className='fixed -translate-x-1/2 left-1/2 lg:w-[80%] xl:w-[60%] z-40'>
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
            <Link to={'/category/world'} onClick={()=>handleScrollLink('category')}>World</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>

          <div className='group'>
            <Link to={'/category/politics'} onClick={()=>handleScrollLink('category')}>Politics</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>

          <div className='group'>
            <Link to={'/category/business'} onClick={()=>handleScrollLink('category')}>Business</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>

          <div className='group'>
            <Link to={'/category/entertainment'} onClick={()=>handleScrollLink('category')}>Entertainment</Link>
            <div className='group-hover:w-full w-0 border-2 border-black group-hover:border-b-white ease-in-out transition-all'>

            </div>
          </div>

          <div className='group'>
            <Link to={'/category/who-is'} onClick={()=>handleScrollLink('category')}>Who is?</Link>
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
      <div className={`fixed left-0 top-0 z-40 text-white ease-in-out transition-all bg-black opacity-25 w-full h-full border-r-2 border-neutral-500 ${mobileMenu ? `translate-x-0` : `-translate-x-full`}`} onClick={()=>setMobileMenu(!mobileMenu)}>

      </div>
      <div className={`fixed left-0 top-0 z-50 text-white ease-in-out transition-all bg-black w-[60%] h-full border-r-2 border-neutral-500 ${mobileMenu ? `translate-x-0` : `-translate-x-full`}`}>
        <div className='p-8 text-2xl'>
          <div className='my-4 w-fit'>
            <Link to={'/'} onClick={()=>{handleScrollLink('home'), setMobileMenu(false)}}>
              <p>Home</p>
            </Link>
          </div>
          <div className='my-4 w-fit'>
            <Link to={'/category/world'} onClick={()=>{handleScrollLink('category'), setMobileMenu(false)}}>
              <p>World</p>
            </Link>
          </div>
          <div className='my-4 w-fit'>
            <Link to={'/category/politics'} onClick={()=>{handleScrollLink('category'), setMobileMenu(false)}}>
              <p>Politics</p>
            </Link>
          </div>
          <div className='my-4 w-fit'>
            <Link to={'/category/business'} onClick={()=>{handleScrollLink('category'), setMobileMenu(false)}}>
              <p>Business</p>
            </Link>
          </div>
          <div className='my-4 w-fit'>
            <Link to={'/category/entertainment'} onClick={()=>{handleScrollLink('category'), setMobileMenu(false)}}>
              <p>Entertainment</p>
            </Link>
          </div>
          <div className='my-4 w-fit'>
            <Link to={'/category/who-is'} onClick={()=>{handleScrollLink('category'), setMobileMenu(false)}}>
              <p>Who is?</p>
            </Link>
          </div>
          <hr />
          <div className='mt-4 w-fit'>
            <Link to={'/category'} onClick={()=>{handleScrollLink('category'), setMobileMenu(false)}}>
              <p className='text-lg'>All categories</p>
            </Link>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Navbar
