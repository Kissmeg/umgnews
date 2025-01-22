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
export {createArticle}