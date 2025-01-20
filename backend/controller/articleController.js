import Article from "../model/articleMode.js";
import {v2 as cloudinary} from 'cloudinary'
const createArticle = async (req,res) => {
    try {
        console.log("Received data:", req.body);
        console.log("Received delivery data:", req.body);

        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;
        console.log(req.body);
        
        const newArticle = await Article.create({
            ...req.body,  // Ovdje će biti svi podaci, uključujući delivery
            image: imageUrl
        });

        res.status(200).json({
            message: "success",
            item: newArticle, // Možete poslati i novokreirani item kao odgovor
        });

    } catch (error) {
         res.status(500).json({
            message: "error", 
            error: error.message,  // Bolje je uputiti tačnu grešku
        });
    }
}
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

        if(!category){
            return res.status(400).json({message:"None category is available."})
        }
        const article = await Article.find({ category })

        if (article.length === 0) {
            return res.status(404).json({message:"Article Not Found."})
        }
        res.status(200).json(article);
    } catch (error) {
        return res.status(500).json({message:"Server error", error});
    }
}
export {createArticle, getArticle, getArticleId, getCategory}