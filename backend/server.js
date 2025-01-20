import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import articleRoute from './routes/articleRoute.js';
import connectCloudinary from './cloudinary.js';
const app = express();

app.use(express.json())
app.use(cors())
dotenv.config()
connectCloudinary()
const PORT = process.env.PORT || 5000
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(()=>{
    console.log('Mongodb Atlas is running');
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
        
    })
    
}).catch((error)=>console.log(error));

app.use('/api', articleRoute)