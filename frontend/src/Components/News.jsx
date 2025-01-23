import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import getArticle from '../../hooks/getArticleId';
import { assets } from '../assets/assets';

const News = () => {
  const { headingslug } = useParams();  // Preuzimanje headingslug iz URL-a
  const location = useLocation();  // Pristupanje stanju koje je poslano preko Link-a
  const { getArticleId } = getArticle();
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      const id = location.state?.id;  // Dohvatanje _id iz state
      if (id) {
        const fetchedArticle = await getArticleId(id);  // Pretraga po _id
        setData(fetchedArticle);
      }
    }
    fetchArticle();
  }, [location.state]);
  const cleanDescription = (description) => {
    return description.replace(/<\/?p>/g, '');
  };
  return (
    <div className='main-font'>
      {data ? (
        <div className='p-4'>
          <div>
          </div>
            {data.map((item, index)=>(
                <div className='' key={index}>
                    <div className='mb-4'>
                      <div className='flex text-neutral-500 text-xs items-center'>
                        <Link to={'/'}>
                          <p className=''>Heading</p>
                        </Link>
                        <img className='size-4' src={assets.rightarrow} alt="" />
                        
                        <Link to={`/${item.category}`}>
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </Link>
                        <img className='size-4' src={assets.rightarrow} alt="" />
                        <p>{item.heading}</p>
                      </div>
                    </div>
                    <div>
                      <p className='text-4xl font-semibold'>{item.heading}</p>
                      <p className='text-neutral-500 text-xs'>{item.date} | {item.time}</p>
                    </div>
                    <div className='mt-4'>
                      <img className='max-w-[500px] max-h-[500px] object-cover' src={item.image} alt="" />
                    </div>
                    <div className=' w-[50%] font-light'>
                      <div className="overflow-hidden" dangerouslySetInnerHTML={{ __html: cleanDescription(item.description) }} />
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default News
