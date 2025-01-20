import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getArticle from '../../hooks/getArticle';
import getCat from '../../hooks/getCategory';

const Category = () => {
    const {getCategory} = getCat()
    const [data, setData] = useState([]);
    const { category } = useParams();

    useEffect(()=>{
        const fetchData = async () => {
            const fetchedArticle = await getCategory(category);
            if (Array.isArray(fetchedArticle)) {
              setData(fetchedArticle)
            }
          }
          fetchData();
    },[category])
    return (
    <div>
        {data.length === 0 ? (
            <div>
                Loading...
            </div>
        ) : (
            <div>
                <div className='flex justify-between '>
                    {data.slice(-3).reverse().map((item, index)=>(
                        <div className='relative ' key={index}>
                            <div className='absolute text-neutral-700 p-4 z-10 bg-gradient-to-t from-neutral-900 w-full h-full'>
                                <p className='text-end 
                                bottom-0'>{item.heading}</p>dddd
                            </div>
                            <div className=''>
                                <img className=' w-[350px] h-[350px] object-cover' src={item.image} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-2'>
                    {data.reverse().slice(3).map((item, index)=>(
                        <div className=''>
                            {item.heading}
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default Category
