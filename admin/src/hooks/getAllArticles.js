const getAarticles = () =>{
    const getArticles = async () => {
        try {

            const userData = localStorage.getItem('admin_data');

            const parsedData = JSON.parse(userData);
            console.log(parsedData.token);
            
            const res = await fetch(`${import.meta.env.VITE_URL}/api/getAllArticles`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedData.token}`,
                 },
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
    return { getArticles };
}
export default getAarticles