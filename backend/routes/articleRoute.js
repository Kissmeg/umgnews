import express from 'express'

import {createArticle, getArticle, getArticleId, getCategory } from '../controller/articleController.js'
import upload from '../middleware/multer.js'
import { ensureToken, login, register } from '../controller/adminController.js'
const articleRoute = express.Router()

articleRoute.post('/createArticle', ensureToken, upload.single('image'), createArticle)
articleRoute.get('/getArticle', getArticle)
articleRoute.get('/getArticleId', getArticleId)
articleRoute.get('/getCategory', getCategory)

articleRoute.post('/login', login)
articleRoute.post('/register', register)
export default articleRoute