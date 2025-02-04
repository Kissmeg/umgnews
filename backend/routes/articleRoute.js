import express from 'express'

import {createArticle, deleteArticle, getAllArticles, getAnalitics, getArticle, getArticleId, getCategory } from '../controller/articleController.js'
import upload from '../middleware/multer.js'
import { ensureToken, login, register } from '../controller/adminController.js'
const articleRoute = express.Router()

articleRoute.post('/createArticle', ensureToken, upload.array('images', 5), createArticle);
articleRoute.get('/getArticle', getArticle)
articleRoute.get('/getAllArticles', ensureToken, getAllArticles)
articleRoute.get('/getArticleId', getArticleId)
articleRoute.get('/getCategory', getCategory)
articleRoute.delete('/deleteArticle',ensureToken, deleteArticle)
articleRoute.post('/login', login)
articleRoute.get('/getAnalitics', getAnalitics)  
export default articleRoute