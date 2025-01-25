const delArticle = ()=>{
    const deleteArticle = async (id) => {
        try {
            const userData = localStorage.getItem('admin_data');

            const parsedData = JSON.parse(userData);

            if(!parsedData){
            return parsedData.token || null
            
            }
            const response = await fetch(`http://localhost:4000/api/deleteArticle?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${parsedData.token}`,  // Razmak između Bearer i tokena
                  },
            });
    
            if (response.ok) {
                // Osvježavanje liste članaka ako je potrebno
            } else {
                console.error("Error deleting article");
            }
        } catch (error) {
            console.error("Server error:", error);
        }
    };
    return { deleteArticle }    
}
export default delArticle