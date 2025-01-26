import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/JSXContext'

const Footer = () => {
    const {handleScrollLink} = useContext(Context);
  return (
    <div>
      <div className='bg-black p-4'>
        <div className='lg:flex lg:justify-between mx-8 text-white'>
                <div>
                    <img className='w-[100px] h-[100px] object-cover hover:scale-110 ease-in-out transition-all cursor-pointer' src={assets.logo} alt="" onClick={()=> handleScrollLink('home')}/>
                    <Link className='' to={'https://www.instagram.com/umgnews.usa'} target='_blank'><img className='w-8 h-8 mt-4 hover:scale-110 ease-in-out transition-all' src={assets.instagram} alt="" /></Link>
                </div>
            <div>
                <div className='lg:mt-0 mt-4'>
                    <p className='text-xl'>Navigation</p>
                    <div className='ml-2'>
                        <Link to={`/`}><p className='              mt-2 lg:mt-0 hover:translate-x-2 text-neutral-400 hover:text-neutral-500 ease-in-out transition-all'>Home</p></Link>
                        <Link to={`/world`}><p className='         mt-2 lg:mt-0 hover:translate-x-2 text-neutral-400 hover:text-neutral-500 ease-in-out transition-all'>World</p></Link>
                        <Link to={`/politics`}><p className='      mt-2 lg:mt-0 hover:translate-x-2 text-neutral-400 hover:text-neutral-500 ease-in-out transition-all'>Politics</p></Link>
                        <Link to={`/business`}><p className='      mt-2 lg:mt-0 hover:translate-x-2 text-neutral-400 hover:text-neutral-500 ease-in-out transition-all'>Business</p></Link>
                        <Link to={`/entertainment`}><p className=' mt-2 lg:mt-0 hover:translate-x-2 text-neutral-400 hover:text-neutral-500 ease-in-out transition-all'>Entertainment</p></Link>
                        <Link to={`/who-is`}><p className='        mt-2 lg:mt-0 hover:translate-x-2 text-neutral-400 hover:text-neutral-500 ease-in-out transition-all'>Who is?</p></Link>
                    </div>
                </div>
            </div>
            <div>
                <div className='lg:mt-0 mt-4'>
                    <p>Contact</p>
                    <div className='ml-2'>
                        <Link to={`/contact`}><p className='mt-2 lg:mt-0 hover:translate-x-2 text-neutral-400 hover:text-neutral-500 ease-in-out transition-all' onClick={()=> handleScrollLink('contact')}>Contact us</p></Link>
                        <Link to={`/faq`}><p className='    mt-2 lg:mt-0 hover:translate-x-2 text-neutral-400 hover:text-neutral-500 ease-in-out transition-all' onClick={()=> handleScrollLink('faq')}>FAQ</p></Link>
                        <Link to={`/policy`}><p className=' mt-2 lg:mt-0 hover:translate-x-2 text-neutral-400 hover:text-neutral-500 ease-in-out transition-all' onClick={()=> handleScrollLink('policy')}>Policy</p></Link>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex justify-center text-white pt-16'>
            <p>All Rights Reserved 2025.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
