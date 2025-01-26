import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import getArticle from '../../hooks/getArticleId';
import { assets } from '../assets/assets';

const News = () => {
  const { headingslug, id } = useParams();  // Preuzimanje headingslug iz URL-a
  const location = useLocation();  // Pristupanje stanju koje je poslano preko Link-a
  const { getArticleId } = getArticle();
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(false);
      try {
        if (id) {
          const fetchedArticle = await getArticleId(id);  // Pretraga po _id
          setData(fetchedArticle);
        }
      }
      catch (error) {
        
      }
      finally{
        setLoading(true)
        }
      }
      fetchArticle() 
  }, [location.state, headingslug]);
  const cleanDescription = (description) => {
    return description.replace(/<\/?p>/g, '');
  };
  return (
    <div className='main-font'>
      {loading ? (
        <div className='p-4'>
          <div>
          </div>
            {data.map((item, index)=>(
                <div className='mt-28' key={index}>
                    <div className='mb-4'>
                      <div className='flex text-neutral-500 text-xs items-center '>
                        <Link to={'/'}>
                          <p className='hover:underline'>Heading</p>
                        </Link>
                        <img className='size-4' src={assets.rightarrow} alt="" />
                        
                        <Link className='hover:underline' to={`/${item.category}`}>
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </Link>
                        <img className='size-4' src={assets.rightarrow} alt="" />
                        <p>{item.heading}</p>
                      </div>
                    </div>
                    <div className=''>
                      <p className='text-2xl lg:text-4xl font-semibold'>{item.heading}</p>
                      <p className='text-neutral-500 text-xs'>{item.date} | {item.time}</p>
                    </div>
                    <div className='mt-4'>
                      <img className='lg:max-w-[500px] lg:max-h-[500px] object-cover' src={item.image[0]} alt="" />
                    </div>
                    <div className=' w-[50%]'>
                      <div className="overflow-hidden" dangerouslySetInnerHTML={{ __html: cleanDescription(item.description) }} />
                    </div>
                    <div className='mt-4'>
                      <img className='lg:max-w-[500px] lg:max-h-[500px] object-cover' src={item.image[1]} alt="" />
                    </div>
                    <div className=' w-[50%]'>
                      <div className="overflow-hidden" dangerouslySetInnerHTML={{ __html: cleanDescription(item.description2) }} />
                    </div>
                    <div className='mt-4'>
                      <img className='lg:max-w-[500px] lg:max-h-[500px] object-cover' src={item.image[2]} alt="" />
                    </div>
                    <div className='mt-4'>
                      <img className='lg:max-w-[500px] lg:max-h-[500px] object-cover' src={item.image[3]} alt="" />
                    </div>
                    <div className='mt-4'>
                      <img className='lg:max-w-[500px] lg:max-h-[500px] object-cover' src={item.image[4]} alt="" />
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <div className='pt-32 pb-4'>
          <div className='hidden lg:block'>
            <div className='w-[60%] border p-2 rounded-lg bg-neutral-100 animate-pulse'>

            </div>
            <div className='w-1/2  mt-4 border lg:p-6 rounded-lg bg-neutral-100 animate-pulse'>

            </div>
            <div className='border lg:w-[550px] lg:h-[550px] rounded-lg my-4 bg-neutral-100 animate-pulse'>

            </div>
            <div className='lg:w-[500px] rounded-lg border p-2 bg-neutral-100 animate-pulse'>

            </div>
          </div>
          <div className='lg:hidden mx-4'>
            <div className='border p-2 w-3/4 rounded-lg bg-neutral-100 animate-pulse'>

            </div>
            <div className='border p-3 mt-6 w-full rounded-lg bg-neutral-100 animate-pulse'>

            </div>
            <div className='border p-3 mt-2 w-[60%] rounded-lg bg-neutral-100 animate-pulse'>

            </div>
            <div className='p-40 mt-4 border rounded-lg bg-neutral-100 animate-pulse'>

            </div>
            <div className='border p-2 mt-2 w-full rounded-lg bg-neutral-100 animate-pulse'>

            </div>
            <div className='border p-2 mt-2 w-full rounded-lg bg-neutral-100 animate-pulse'>

            </div>
            <div className='border p-2 mt-2 w-full rounded-lg bg-neutral-100 animate-pulse'>

            </div>
            <div className='border p-2 mt-2 w-[30%] rounded-lg bg-neutral-100 animate-pulse'>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default News
