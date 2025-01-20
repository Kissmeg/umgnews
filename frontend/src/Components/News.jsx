import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import getArticle from '../../hooks/getArticleId';

const News = () => {
  const { headingslug } = useParams();  // Preuzimanje headingslug iz URL-a
  const location = useLocation();  // Pristupanje stanju koje je poslano preko Link-a
  const { getArticleId } = getArticle();
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      const _id = location.state?._id;  // Dohvatanje _id iz state
      if (_id) {
        const fetchedArticle = await getArticleId(_id);  // Pretraga po _id
        setData(fetchedArticle);
      }
    }
    fetchArticle();
  }, [location.state]);
  const cleanDescription = (description) => {
    return description.replace(/<\/?p>/g, '');
  };
  return (
    <div>
      {data ? (
        <div className='p-4'>
            {data.map((item, index)=>(
                <div className='' key={index}>
                    <div>
                      <p className='text-4xl font-semibold'>{item.heading}</p>
                      <p className='text-neutral-500 text-xs'>{item.date}</p>
                    </div>
                    <div className='mt-4'>
                      <img className='max-w-[500px] max-h-[500px] object-cover' src={item.image} alt="" />
                      {item.category}
                    </div>
                    <div className=''>
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
