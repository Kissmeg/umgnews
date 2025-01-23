import Article from "../model/articleMode.js";
import {v2 as cloudinary} from 'cloudinary'
import promisePool from '../db.js';  // Importuj pool iz db.js

const createArticle = async (req, res) => {
    try {
        console.log("Received data:", req.body);
        console.log("Received file:", req.file); // Logujte fajl koji je primljen

        const { heading, headingslug, description, location, date, category, time } = req.body;

        const imageFile = req.file;

        // Proveri da li je slika poslata
        if (!imageFile) {
            return res.status(400).json({ message: "Image file is required." });
        }
        // Upload slike na Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;
        // SQL upit za unos članka u bazu
        const query = `
            INSERT INTO article (heading, headingslug, image, description, location, date, category, time) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [heading, headingslug, imageUrl, description, location, date, category, time];

        // Izvrši SQL upit
        const [result] = await promisePool.query(query, values);

        console.log("Inserted ID:", result.insertId);

        // Vraćamo novokreirani članak sa njegovim ID-jem
        res.status(200).json({
            message: "success",
            article: {
                id: result.insertId,
                heading,
                headingslug,
                image: imageUrl,
                description,
                location,
                date,
                category,
                time
            },
        });

    } catch (error) {
        console.error("Error in createArticle:", error);
        res.status(500).json({
            message: "error",
            error: error.message, // Prikazuje tačnu grešku
        });
    }
};

const getArticle = async (req, res) => {
    try {
        // Izvrši upit za sve članke
        const [results] = await promisePool.query('SELECT * FROM article');
        res.status(200).json(results);  // Pošaljite rezultate kao JSON
    } catch (err) {
        console.error('Greška u upitu: ', err);
        res.status(500).json({ message: 'Greška u upitu' });
    }
};
const getArticleId = async (req, res) => {
    try {
        const { id } = req.query;
        
        if (!id) {
            return res.status(400).json({ message: "Article ID required." });
        }
        console.log('Received ID:', id); // Provera da li id dolazi ispravno

        // Prvo upit za pronalaženje članka po ID-u
        const [article] = await promisePool.query(
            'SELECT * FROM article WHERE id = ?', // Ako je "id" int, proverite tip
            [id] // Parametri za SQL upit
        );

        console.log('Query result:', article); // Prikazuje rezultate iz baze

        if (article.length === 0) {
            return res.status(404).json({ message: "Article Not Found." });
        }

        res.status(200).json(article[0]); // Vraća prvi (i jedini) rezultat iz upita
    } catch (error) {
        console.error('Error fetching article:', error); // Detaljno logovanje greške
        return res.status(500).json({ message: "Server error", error });
    }
}

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

        res.json({
            data: articles,
            currentPage: page,
            totalPages: Math.ceil(totalArticles / limit),
            hasMore: skip + limit < totalArticles,
        });
    } catch (error) {
        console.error("Greška u API-ju:", error);
        res.status(500).json({ message: "Greška pri dohvaćanju podataka", error });
    }
};


export {getArticle, getArticleId, getCategory, createArticle}