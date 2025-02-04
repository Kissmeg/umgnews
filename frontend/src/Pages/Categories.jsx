import React, { useContext } from 'react'
import { categories } from '../assets/assets'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/JSXContext';

const Categories = () => {
  const {handleScrollLink} = useContext(Context);
  return (
    <div className='pt-32' id='categories'>
      <div className='text-4xl font-semibold p-4 border-b-4 w-fit border-neutral-950 uppercase'>
          <p>All Categories</p>
        </div>
      <div className='p-4 flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12'>
            {categories.map((item, index)=>(
                <div className="relative h-[220px] md:w-[220px]" key={index}>
                  <Link to={`/category/${item.slug}`}>
                      <div className="relative group w-full h-full overflow-hidden ease-in-out transition-all">
                          <img className="w-full h-full group-hover:scale-[1.18] object-cover ease-in-out transition-all duration-300" src={item.image[0]} alt="" />
                          <div className="absolute z-10 inset-0 bg-gradient-to-t from-neutral-950/60 group-hover:from-neutral-950/70 via-neutral-50/10 to-transparent ease-in-out transition-all"></div>
                      </div>
                  </Link>
                  <div className="absolute text-white z-10 bottom-4 left-2 w-[80%] px-4 py-2">
                      <Link to={`/category/${item.slug}`}>
                          <p className="text-xl font-semibold">{item.name}</p>
                      </Link>
                  </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Categories
