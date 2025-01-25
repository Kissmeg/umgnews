const getArticle = () =>{
    const getAllArticles = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/getArticle', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (res.status === 200) {
                // Ako je "image" kolona još uvek string, parsiraj je u niz
                const parsedData = data.map(article => ({
                    ...article,
                    image: JSON.parse(article.image), // Parsiraj sliku iz JSON stringa
                }));
                return parsedData;
            } else {
                console.error("Hook Error.");
                return [];
            }
        } catch (error) {
            console.error('Server side error.');
            return [];
        }
    };
    return { getAllArticles };
}
export default getArticle