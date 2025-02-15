const getCat = () => {
    const getCategory = async (category, page = 1) => {
        try {
            

            const res = await fetch(`${import.meta.env.VITE_URL}/api/getCategory?category=${category}&page=${page}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            // Proverite da li je odgovor uspešan
            if (res.status === 200) {
                const data = await res.json();
                

                // Ako je "image" kolona string, parsiraj je u niz
                const parsedData = data.data.map(article => ({
                    ...article,
                    // Ako je image u formatu stringa, parsiraj ga u niz
                    image: Array.isArray(article.image) ? article.image : JSON.parse(article.image),
                }));

                return {
                    data: parsedData, // Vraća podatke sa parsed slikama
                    currentPage: data.currentPage,
                    totalPages: data.totalPages,
                    hasMore: data.hasMore,
                };
            } else {
                console.error("Hook Error: Unable to fetch data.");
                return { data: [], totalPages: 0, hasMore: false }; // Vraća default vrednosti ako nije uspešno
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            return { data: [], totalPages: 0, hasMore: false }; // Vraća default vrednosti ako dođe do greške
        }
    };

    return { getCategory };  // Vraća funkciju
};

export default getCat;
