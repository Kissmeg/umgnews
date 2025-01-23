const getAId = () => {
    const getArticleId = async (id) => {
        try {
          const res = await fetch(`http://localhost:4000/api/getArticleId?id=${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': "application/json",
            },
          });
          
          const data = await res.json();
          if (res.status === 200) {
            // Ako je odgovor objekat, postavite ga kao niz sa jednim članom
            return Array.isArray(data) ? data : [data];
          } else {
            console.log('Baza je prazna');
          }
        } catch (error) {
          console.error('Greška pri dobijanju podataka:', error);
          return [];
        }
      };
      
  
    return { getArticleId }
  }
  
  export default getAId;
  