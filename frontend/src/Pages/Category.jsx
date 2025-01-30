import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getCat from '../../hooks/getCategory';
import { assets } from '../assets/assets';

const Category = () => {
    const { category } = useParams();
    const { getCategory } = getCat();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [pageUpdated, setPageUpdated] = useState(false); // Flag za praćenje stranice

    // Funkcija za učitavanje podataka
    const loadCategoryData = async (category, page) => {
        setLoading(true);
        setPageUpdated(false);  // Resetovanje pageUpdated flag-a

        try {
            const response = await getCategory(category, page);

            // Provera da li su podaci niz i ako postoje, dodajemo ih na prethodno učitane
            if (Array.isArray(response.data) && response.data.length > 0) {
                setData((prevData) => [...prevData, ...response.data]);
                setHasMore(response.hasMore);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error loading category data:", error);
        } finally {
            setLoading(false);
            setPageUpdated(false);  // Postavljanje na false nakon učitavanja
        }
    };
    // Resetovanje podataka i početak sa prve stranice prilikom promene kategorije
    useEffect(() => {
        setData([]); // Resetovanje prethodnih podataka
        setPage(1); // Resetovanje stranice na 1
        setHasMore(true); // Resetovanje hasMore na true
        loadCategoryData(category, 1); // Učitavanje novih podataka za kategoriju i stranu 1
    }, [category]);

    // Funkcija za učitavanje sledeće stranice kada je korisnik na dnu stranice
    const loadMoreData = () => {
        if (!hasMore || loading || pageUpdated) return; // Sprečavanje više poziva u isto vreme
        setPageUpdated(true);
        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            loadCategoryData(category, nextPage);
            return nextPage;
        });
    };

    const cleanDescription = (description) => {
        return description.replace(/<\/?p>/g, '');
    };

    return (
        <div className="main-font pt-4" id='category'>
            {loading && page === 1 ? (
                <div className='pt-44'>
                    <div className='md:flex justify-between'>
                        <div className='p-4'>
                            <div className='p-40 border rounded-lg bg-neutral-100 animate-pulse'>

                            </div>
                        </div>
                        <div className='p-4'>
                            <div className='p-40 border rounded-lg bg-neutral-100 animate-pulse'>

                            </div>
                        </div>
                        <div className='p-4'>
                            <div className='p-40 border rounded-lg bg-neutral-100 animate-pulse'>

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border-x lg:border mt-24">
                    <div className="m-8">
                        <p className="text-4xl border-b-4 w-fit border-neutral-950">
                            {category.toUpperCase()}
                        </p>
                    </div>
    
                    {data.length === 0 ? (
                        <div className="flex justify-center mt-10 text-xl font-semibold h-[50vh]">
                            <div>
                                <p className='text-center text-2xl'>Currently there is no article for this category.</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between flex-wrap gap-4 p-4">
                                {/* Prikaz najnovijih 3 vesti */}
                                {data.slice(0, 3).map((item, index) => (
                                    <div className="relative h-[250px] md:w-[350px] md:h-[350px] lg:w-[280px] lg:h-[280px] xl:w-[320px] xl:h-[320px]" key={index}>
                                        <Link to={`/news/${item.headingslug}/${item.id} `}>
                                            <div className="relative group w-full h-full overflow-hidden ease-in-out transition-all">
                                                <img className="w-full h-full group-hover:scale-[1.18] object-cover ease-in-out transition-all duration-300" src={item.image[0]} alt="" />
                                                <div className="absolute z-10 inset-0 bg-gradient-to-t from-neutral-950/60 group-hover:from-neutral-950/70 via-neutral-50/10 to-transparent ease-in-out transition-all"></div>
                                            </div>
                                        </Link>
                                        <div className="absolute text-white z-10 bottom-4 left-2 w-[80%] px-4 py-2">
                                            <Link to={`/news/${item.headingslug}/${item.id} `}>
                                                <p className="text-lg font-semibold">{item.heading}</p>
                                                <p className='text-xs'>{item.date} | {item.time}</p>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
    
                            <div className="flex-col lg:ml-8 mt-16 justify-center">
                                {/* Prikaz preostalih vesti */}
                                {data.slice(3).map((item, index) => (
                                    <div className="m-4 lg:flex" key={index}>
                                        <Link className='' to={`/news/${item.headingslug}/${item.id} `}>
                                            <div className='flex sm:justify-center md:justify-start'>
                                                <div className='md:w-[200px] md:h-[200px] lg:w-[150px] lg:h-[150px] group overflow-hidden'>
                                                    <img className="w-[200px] h-[200px] lg:w-[150px] lg:h-[150px] group-hover:scale-[1.1] object-cover ease-in-out transition-all" src={item.image[0]} alt="" />
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="m-2 lg:ml-4">
                                            <p className="text-xl font-bold md:w-1/2">{item.heading}</p>
                                            <div className="hidden lg:block font-normal text-sm mt-2 w-[75%] overflow-hidden after:inline-flex text-ellipsis" dangerouslySetInnerHTML={{ __html: cleanDescription(item.description.slice(0, 200).concat(' ...')) }} />
                                            <div className="lg:hidden font-normal text-sm mt-2 w-[75%] overflow-hidden after:inline-flex text-ellipsis" dangerouslySetInnerHTML={{ __html: cleanDescription(item.description.slice(0, 100).concat(' ...')) }} />
                                            <p className="text-xs mb-8 mt-2 text-neutral-500">{item.date} | {item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
    
                            {hasMore && !loading && (
                                <div className="flex justify-center m-4">
                                    <button className='px-4 py-2 border rounded border-black bg-black text-white hover:bg-white hover:text-black cursor-pointer ease-in-out transition-all ' onClick={loadMoreData}>Load More</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
            {loading && page > 1 && (
                <div className='flex justify-center'>
                    <div className='h-8 w-8 flex justify-center rounded-full animate-spin '> 
                        <img src={assets.loading} alt="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
