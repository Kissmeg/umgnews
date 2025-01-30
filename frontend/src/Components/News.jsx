import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link, Navigate } from 'react-router-dom'
import getArticle from '../../hooks/getArticleId';
import { assets } from '../assets/assets';

const News = () => {
  const { id, headingslug } = useParams();  // Preuzimanje headingslug iz URL-a
  const location = useLocation();  // Pristupanje stanju koje je poslano preko Link-a
  const { getArticleId } = getArticle();
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [bigImage, setBigImage] = useState();
  const [notFound, setNotFound] = useState(false);  // Dodato za 404 redirekciju

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(false);
      try {
        if (id && headingslug) {
          const fetchedArticle = await getArticleId(id, headingslug);
          if (!fetchedArticle || fetchedArticle.length === 0) {
            setNotFound(true);  // Ako nema članka, označi kao 404
          } else {
            setData(fetchedArticle);
          }
        }
      } catch (error) {
        setNotFound(true); // Ako API poziv pukne, tretiramo ga kao 404
      } finally {
        setLoading(true);
      }
    };
    fetchArticle();
  }, [location.state, headingslug, id]);

  // Ako članak ne postoji, preusmeri na 404
  if (notFound) {
    return <Navigate to="/404" replace />;
  }

  const cleanDescription = (description) => {
    return description.replace(/<\/?p>/g, '');
  };

  const clickImage = (image) =>{
    setBigImage(image)
    console.log(image);
    
  }
  return (
    <div className='main-font'>
      {bigImage && (
       <div>
        <div className='fixed z-50 left-0 bg-black w-full h-full opacity-50' onClick={()=>setBigImage(!bigImage)}>
          <div className=''>

          </div>
        </div>
          <div className='fixed z-50 p-4 top-1/2 -translate-y-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:top-1/2'>
            <img className='cursor-pointer' src={bigImage} onClick={()=>setBigImage(!bigImage)} alt="" />
          </div>
       </div>
      )}
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
                        
                        <Link className='hover:underline' to={`/category/${item.category}`}>
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
                      <img className='md:max-w-[500px] md:max-h-[500px] object-cover cursor-pointer' src={item.image[0]} onClick={()=>clickImage(item.image[0])} alt="" />
                    </div>
                    <div className='mt-8 lg:w-[50%]'>
                      <div className="overflow-hidden" dangerouslySetInnerHTML={{ __html: cleanDescription(item.description) }} />
                    </div>
                    <div className='mt-4'>
                      <img className='md:max-w-[500px] md:max-h-[500px] object-cover cursor-pointer' src={item.image[1]} alt="" onClick={()=>clickImage(item.image[1])}/>
                    </div>
                    <div className='mt-8 lg:w-[50%]'>
                      <div className="overflow-hidden" dangerouslySetInnerHTML={{ __html: cleanDescription(item.description2) }} />
                    </div>
                    <div className='mt-4'>
                      <img className='md:max-w-[500px] md:max-h-[500px] object-cover cursor-pointer' src={item.image[2]} alt="" onClick={()=>clickImage(item.image[2])}/>
                    </div>
                    <div className='mt-4'>
                      <img className='md:max-w-[500px] md:max-h-[500px] object-cover cursor-pointer' src={item.image[3]} alt="" onClick={()=>clickImage(item.image[3])}/>
                    </div>
                    <div className='mt-4'>
                      <img className='md:max-w-[500px] md:max-h-[500px] object-cover cursor-pointer' src={item.image[4]} alt="" onClick={()=>clickImage(item.image[4])}/>
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
