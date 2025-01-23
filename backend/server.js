// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import articleRoute from './routes/articleRoute.js';  // Importuj rute
import connectCloudinary from './cloudinary.js';
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
connectCloudinary()
// Ruta za članke
app.use('/api', articleRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server je pokrenut na portu ${PORT}`);
});
