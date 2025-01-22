const getCat = () => {
    const getCategory = async (category, page = 1) => {
        try {
            console.log(`Fetching category: ${category}, page: ${page}`);

            const res = await fetch(`http://localhost:4000/api/getCategory?category=${category}&page=${page}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();
            console.log("API Response:", data);

            if (res.status === 200) {
                return data;
            } else {
                console.error("Hook Error.");
                return { data: [], totalPages: 0, hasMore: false };
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            return { data: [], totalPages: 0, hasMore: false };
        }
    };

    return { getCategory };
};

export default getCat;
