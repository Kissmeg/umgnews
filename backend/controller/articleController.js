import Article from "../model/articleMode.js";
import {v2 as cloudinary} from 'cloudinary'
import promisePool from '../db.js';  // Importuj pool iz db.js

const createArticle = async (req, res) => {
    try {
      console.log("Received data:", req.body);
      console.log("Received files:", req.files);
  
      const { heading, headingslug, description, description2, location, date, category, time} = req.body;
      const imageFiles = req.files;
  
      if (!imageFiles || imageFiles.length === 0) {
        return res.status(400).json({ message: "At least one image is required." });
      }
  
      // Upload svih slika na Cloudinary
      const imageUploadPromises = imageFiles.map((file) =>
        cloudinary.uploader.upload(file.path, { resource_type: "image" })
      );
  
      const imageUploads = await Promise.all(imageUploadPromises);
      const imageUrls = imageUploads.map((upload) => upload.secure_url); // Svi URL-ovi slika
      
      
      // SQL upit za unos članka u bazu, polje image treba biti tipa JSON
      const query = `
    INSERT INTO article (heading, headingslug, image, description, description2, location, date, category, time) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
const values = [
    heading, 
    headingslug, 
    JSON.stringify(imageUrls), 
    description, 
    description2,  // Dodajemo novu vrednost
    location, 
    date, 
    category, 
    time
];
      console.log(values);
      const [result] = await promisePool.query(query, values);
      
      res.status(200).json({
        message: "success",
        article: {
          id: result.insertId,
          heading,
          headingslug,
          images: imageUrls, // Vraćaš niz slika kao odgovor
          description,
          description2,
          location,
          date,
          category,
          time
        },
      });
  
    } catch (error) {
      console.error("Error in createArticle:", error);
      res.status(500).json({ message: "error", error: error.message });
    }
  };
  


const deleteArticle = async (req, res) => {
    try {
        const { id } = req.query;

        // Proveri da li ID postoji u bazi
        const checkQuery = `SELECT * FROM article WHERE id = ?`;
        const [existingArticle] = await promisePool.query(checkQuery, [id]);

        if (existingArticle.length === 0) {
            return res.status(404).json({ message: "Article not found" });
        }

        // Brišemo članak iz baze
        const deleteQuery = `DELETE FROM article WHERE id = ?`;
        await promisePool.query(deleteQuery, [id]);

        res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
        console.error("Error in deleteArticle:", error);
        res.status(500).json({
            message: "error",
            error: error.message,
        });
    }
};

const getArticleId = async (req, res) => {
    try {
        const { id, headingslug } = req.query;
        
        if (!id) {
            return res.status(400).json({ message: "Article ID required." });
        }
        if (!headingslug) {
            return res.status(400).json({ message: "Article slug required." });
        }

        const [article] = await promisePool.query(
            'SELECT * FROM article WHERE id = ? AND headingslug = ?', 
            [id, headingslug]
        );

        console.log('Query result:', article); // Proverava šta tačno baza vraća

        if (article.length === 0) {
            return res.status(404).json({ message: "Article Not Found." });
        }

        let articleData = article[0];

        // **Osiguraj da je `image` polje pravilno parsirano**
        if (typeof articleData.image === "string") {
            try {
                articleData.image = JSON.parse(articleData.image);
            } catch (parseError) {
                console.error("Greška pri parsiranju slike:", parseError);
                articleData.image = []; // Postavi default vrednost ako parsiranje ne uspe
            }
        }

        // **Vraćanje odgovora u istom formatu kao `getCategory`**
        res.status(200).json({
            data: [articleData], // Vraćamo podatke kao niz
        });

    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ message: "Server error", error });
    }
};

const getAnalitics = async (req, res) => {
    try {
        const sql = "SELECT page, COUNT(*) as count FROM visits GROUP BY page";
            db.query(sql, (err, results) => {
                if (err) {
                res.status(500).json({ message: "Greška prilikom učitavanja podataka" });
                } else {
                res.json(results);
                }
            });
    } catch (error) {
        
    }
}
const getAllArticles = async (req, res) => {
    try {
        const [results] = await promisePool.query('SELECT * FROM `article` ORDER BY id DESC;',
        );

        res.status(200).json(results);  // Pošaljite rezultate kao JSON
    } catch (err) {
        console.error('Greška u upitu: ', err);
        res.status(500).json({ message: 'Greška u upitu' });
    }
};
const getArticle = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit =  20; 
        const skip = (page - 1) * limit;

        const [results] = await promisePool.query('SELECT * FROM `article` ORDER BY id DESC LIMIT ? OFFSET ?;',
            [limit, skip]
        );

        res.status(200).json(results);  // Pošaljite rezultate kao JSON
    } catch (err) {
        console.error('Greška u upitu: ', err);
        res.status(500).json({ message: 'Greška u upitu', error: err });
    }
};
const getCategory = async (req, res) => {
    try {
        const { category } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;  // Broj artikala po stranici
        const skip = (page - 1) * limit;

        console.log("Kategorija primljena u API:", category);
        console.log("Trenutna strana:", page);
        console.log("Preskačem prvih:", skip);

        // Proveri da li postoji podataka za zadatu kategoriju
        const [totalArticlesResult] = await promisePool.query(
            'SELECT COUNT(*) AS total FROM article WHERE category = ?',
            [category]
        );

        const totalArticles = totalArticlesResult[0].total;

        if (totalArticles === 0) {
            console.log("Nema podataka za ovu kategoriju!");
            return res.json({
                data: [],
                currentPage: page,
                totalPages: 0,
                hasMore: false,
            });
        }

        // Pretraga sa sortiranje prema id (najnoviji prvi)
        const [articles] = await promisePool.query(
            'SELECT * FROM article WHERE category = ? ORDER BY id DESC LIMIT ? OFFSET ?',
            [category, limit, skip]
        );

        console.log("Broj pronađenih artikala:", articles.length);

        // Provera da li su artikli u formatu niza
        if (!Array.isArray(articles)) {
            return res.status(500).json({ message: "Greška: Vraćeni podaci nisu niz" });
        }

        res.json({
            data: articles, // Vraćamo artikle kao niz
            currentPage: page,
            totalPages: Math.ceil(totalArticles / limit),
            hasMore: skip + limit < totalArticles,
        });
    } catch (error) {
        console.error("Greška u API-ju:", error);
        res.status(500).json({ message: "Greška pri dohvaćanju podataka", error });
    }
};



export {getArticle, getArticleId, getCategory, getAnalitics, createArticle, deleteArticle, getAllArticles}