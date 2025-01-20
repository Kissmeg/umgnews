import express from 'express'
import { createArticle, getArticle, getArticleId, getCategory } from '../controller/articleController.js'
import upload from '../middleware/multer.js'
const articleRoute = express.Router()

articleRoute.post('/createArticle', upload.single('image'), createArticle)
articleRoute.get('/getArticle', getArticle)
articleRoute.get('/getArticleId', getArticleId)
articleRoute.get('/getCategory', getCategory)

export default articleRoute