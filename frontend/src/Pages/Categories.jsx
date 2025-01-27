import React from 'react'
import { categories } from '../assets/assets'
import { Link } from 'react-router-dom'

const Categories = () => {
  return (
    <div className='pt-32'>
      <div className='p-4 flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {categories.map((item, index)=>(
                <div className='w-[200px] h-[200px]'>
                <Link to={`/category/${item.slug}`}>
                    <div className='w-[200px] h-[200px] overflow-hidden bg-black relative group' key={index}>
                        <img className='w-[200px] h-[200px] object-cover group-hover:mix-blend-luminosity group-hover:scale-110 ease-in-out transition-all' src={item.image} alt="" />
                        <div className='absolute text-white -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:top-1/2 ease-in-out transition-all'>
                            <p className='border px-4 py-2 rounded-tr-lg rounded-bl-lg bg-black text-lg'>{item.name}</p>
                        </div>
                    </div>
                </Link>
            </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Categories
