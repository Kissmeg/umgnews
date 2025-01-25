const getAId = () => {
  const getArticleId = async (id) => {
    try {
      console.log(`Fetching article ID: ${id}`);

      const res = await fetch(`http://localhost:4000/api/getArticleId?id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log("API Response:", data);

        // Ako je "image" kolona string, parsiraj je u niz
        const parsedData = data.data.map(article => ({
            ...article,
            // Ako je image u formatu stringa, parsiraj ga u niz
            image: Array.isArray(article.image) ? article.image : JSON.parse(article.image),
        }));

        return parsedData

    } else {
        console.error("Hook Error: Unable to fetch data.");
    }
    } catch (error) {
      console.error("Fetch Error:", error);
      return null; // Vraćamo null u slučaju greške
    }
  };

  return { getArticleId };
};

export default getAId;
