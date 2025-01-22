import Article from "../model/articleMode.js";
import {v2 as cloudinary} from 'cloudinary'
const getArticle = async (req, res) => {
   try {
     const article = await Article.find()

     if(article.length === 0){
        return res.status(404).json({message: "No articles available."})
     }
     res.status(200).json(article)
   } catch (error) {
    return res.status(400).json({message:"Error", error})
   }
}
const getArticleId = async (req, res) => {
    try {
        const { _id } = req.query;
        
        if(!_id){
            return res.status(400).json({message:"Article ID required."})
        }
        const article = await Article.find({ _id })

        if(article.length === 0){
            return res.status(404).json({message:"Article Not Found."})
        }
        res.status(200).json(article);
    } catch (error) {
        return res.status(500).json({message:"Server error", error});
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
        const totalArticles = await Article.countDocuments({ category });

        if (totalArticles === 0) {
            console.log("Nema podataka za ovu kategoriju!");
            return res.json({
                data: [],
                currentPage: page,
                totalPages: 0,
                hasMore: false,
            });
        }

        // Pretraga sa sortiranje prema _id (najnoviji prvi)
        const articles = await Article.find({ category })
            .skip(skip)
            .limit(limit)
            .sort({ _id: -1 }); // Sortiranje prema _id polju, -1 znači najnoviji prvi

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

export {getArticle, getArticleId, getCategory}