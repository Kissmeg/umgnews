import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
    heading: { type: String, required: true }, // Naslov
    headingslug: { type: String, required: true }, // Slug verzija naslova
    image: { type: String, required: true }, // URL slike
    description: { type: String, required: true }, // Glavni sadržaj
    location: { type: String, required: true }, // Lokacija vesti
    date: { type: String, requried:true }, // Datum objave
    category: { 
        type: [String], 
        enum: [
            'politics', 'economy', 'society', 'world', 'local-news', 
            'technology', 'science', 'sports', 'culture', 'entertainment', 
            'music', 'movies-series', 'health', 'travel', 'cars', 'business'
        ],
        required: true 
    },
})

export default mongoose.model("article",articleSchema)