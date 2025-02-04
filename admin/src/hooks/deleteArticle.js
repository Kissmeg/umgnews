const delArticle = () => {
    const deleteArticle = async (id) => {
      try {
        const userData = localStorage.getItem('admin_data');
        if (!userData) {
          console.error("No user data found");
          return;
        }
  
        const parsedData = JSON.parse(userData);
        if (!parsedData.token) {
          console.error("No token found in user data");
          return;
        }
  
        const response = await fetch(`${import.meta.env.VITE_URL}/api/deleteArticle?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${parsedData.token}`,  // Slanje tokena u Authorization headeru
          },
        });
  
        if (response.ok) {
          console.log("Article deleted successfully");
          // Osvježavanje liste članaka ili nešto drugo...
        } else {
          console.error("Error deleting article", response.status);
          if (response.status === 401) {
            console.error("Unauthorized access. Please log in again.");
            // Možda preusmeriti korisnika na login stranu ili obrisati token iz localStorage
          }
        }
      } catch (error) {
        console.error("Server error:", error);
      }
    };
  
    return { deleteArticle };
  }
  
  export default delArticle;
  