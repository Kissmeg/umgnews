import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getCat from '../../hooks/getCategory';

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
        <div className="main-font">
            {loading && page === 1 ? (
                <div>Loading...</div>
            ) : (
                <div className="border">
                    <div className="m-8">
                        <p className="text-4xl border-b-4 w-fit border-neutral-950">
                            {category.toUpperCase()}
                        </p>
                    </div>
                    <div className="flex justify-between flex-wrap gap-4 p-4">
                        {/* Prikaz najnovijih 3 vesti */}
                        {data.slice(0, 3).map((item, index) => (
                            <div className="relative w-[350px] h-[350px]" key={index}>
                                <Link to={`/news/${item.headingslug}`} state={{ id: item.id }}>
                                    <div className="relative group w-full h-full overflow-hidden ease-in-out transition-all">
                                        <img className="w-full h-full group-hover:scale-[1.18] object-cover ease-in-out transition-all duration-300" src={item.image} alt="" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 group-hover:from-neutral-950/70 via-neutral-50/10 to-transparent ease-in-out transition-all"></div>
                                    </div>
                                </Link>
                                <div className="absolute text-white z-10 bottom-4 left-2 w-[80%] px-4 py-2">
                                    <Link to={`/news/${item.headingslug}`} state={{ id: item.id }}>
                                        <p className="text-lg font-semibold">{item.heading}</p>
                                        <p className='text-xs'>{item.date} | {item.time}</p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex-col ml-8 mt-8 justify-center">
                        {/* Prikaz preostalih vesti */}
                        {data.slice(3).map((item, index) => (
                            <div className="m-8 flex" key={index}>
                                <Link to={`/news/${item.headingslug}`} state={{ id: item.id }}>
                                    <div className='w-[150px] h-[150px] group overflow-hidden'>
                                        <img className="w-[150px] h-[150px] group-hover:scale-[1.1] object-cover ease-in-out transition-all" src={item.image} alt="" />
                                    </div>
                                </Link>
                                <div className="ml-4">
                                    <p className="text-xl">{item.heading}</p>
                                    <p className="text-xs text-neutral-500">{item.date} | {item.time}</p>
                                    <div className="font-normal text-sm mt-2 w-[75%] overflow-hidden after:inline-flex text-ellipsis" dangerouslySetInnerHTML={{ __html: cleanDescription(item.description.slice(0, 200).concat(' ...')) }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {hasMore && !loading && (
                        <div
                            onClick={loadMoreData}
                            className="text-center cursor-pointer py-4 text-blue-500 hover:underline"
                        >
                            Load more...
                        </div>
                    )}
                </div>
            )}
            {loading && page > 1 && (
                <div className="text-center py-4">Loading more...</div>
            )}
        </div>
    );
};

export default Category;
