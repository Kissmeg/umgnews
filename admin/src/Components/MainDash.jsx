import React, { useEffect, useState } from 'react';
import getAarticles from '../hooks/getAllArticles';

const MainDash = () => {
  const { getArticles } = getAarticles();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const fetchedArticle = await getArticles();
      if (Array.isArray(fetchedArticle)) {
        setData(fetchedArticle);
      }
    };
    fetchData();
  }, []);

  // Brojimo artikle po kategorijama
  const politicsCount = data.filter(item => item.category === 'politics').length;
  const economyCount = data.filter(item => item.category === 'economy').length;
  const worldCount = data.filter(item => item.category === 'world').length;
  const techCount = data.filter(item => item.category === 'technology').length;
  const scienceCount = data.filter(item => item.category === 'science').length;
  const sportsCount = data.filter(item => item.category === 'sports').length;
  const entertainementCount = data.filter(item => item.category === 'entertainment').length;
  const seriesCount = data.filter(item => item.category === 'series').length;
  const healthCount = data.filter(item => item.category === 'health').length;
  const businessCount = data.filter(item => item.category === 'business').length;
  return (
    <div className='code'>
      <div className="grid grid-cols-6 grid-rows-4 gap-4 ">
        <div className="col-span-2 border p-4 rounded-xl">
          <p className='text-2xl mb-1 text-center'>Total Articles</p>
          <div className='flex items-center w-full justify-center size-24 rounded-full'>
            <div className='flex justify-center border-2 size-24 items-center rounded-full'>
              <p className='text-4xl'>{data.length}</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 border p-4 rounded-xl">
          <p className='text-2xl mb-1 text-center'>Total Articles By Category</p>
            <div className='text-xs code grid grid-cols-5 mt-2 gap-4'>
                <div className='lg:w-[80px] lg:h-[50px] bg-blue-100 w-fit flex flex-col justify-center items-center p-2 rounded-xl'> 
                    <p>Politics</p>
                    <p>{politicsCount}</p>
                </div>
                <div className='lg:w-[80px] lg:h-[50px] bg-blue-100 w-fit flex flex-col justify-center items-center p-2 rounded-xl'> 
                    <p>Economoy</p>
                    <p>{economyCount}</p>
                </div>
                <div className='lg:w-[80px] lg:h-[50px] bg-blue-100 w-fit flex flex-col justify-center items-center p-2 rounded-xl'> 
                    <p>World</p>
                    <p>{worldCount}</p>
                </div>
                <div className='lg:w-[80px] lg:h-[50px] bg-blue-100 w-fit flex flex-col justify-center items-center p-2 rounded-xl'> 
                    <p>Technology</p>
                    <p>{techCount}</p>
                </div>
                <div className='lg:w-[80px] lg:h-[50px] bg-blue-100 w-fit flex flex-col justify-center items-center p-2 rounded-xl'> 
                    <p>Science</p>
                    <p>{scienceCount}</p>
                </div>
                <div className='lg:w-[80px] lg:h-[50px] bg-blue-100 w-fit flex flex-col justify-center items-center p-2 rounded-xl'> 
                    <p>Sports</p>
                    <p>{sportsCount}</p>
                </div>
                <div className='lg:w-[80px] lg:h-[50px] bg-blue-100 w-fit flex flex-col justify-center items-center p-2 rounded-xl'> 
                    <p>Fun </p>
                    <p>{entertainementCount}</p>
                </div>
                <div className='lg:w-[80px] lg:h-[50px] bg-blue-100 w-fit flex flex-col justify-center items-center p-2 rounded-xl'> 
                    <p>Series</p>
                    <p>{seriesCount}</p>
                </div>
                <div className='lg:w-[80px] lg:h-[50px] bg-blue-100 w-fit flex flex-col justify-center items-center p-2 rounded-xl'> 
                    <p>Health</p>
                    <p>{healthCount}</p>
                </div>
                <div className='lg:w-[80px] lg:h-[50px] bg-blue-100 w-fit flex flex-col justify-center items-center p-2 rounded-xl'> 
                    <p>Business</p>
                    <p>{businessCount}</p>
                </div>
            </div>
        </div>

        <div className="col-span-6 row-start-2 border">
          {/* Dodaj bilo koji sadržaj koji treba biti ovde */}
        </div>
      </div>
    </div>
  );
};

export default MainDash;
