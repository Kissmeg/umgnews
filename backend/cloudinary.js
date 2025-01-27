import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () =>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME2,
        api_key: process.env.CLOUDINARY_API_KEY2,
        api_secret: process.env.CLOUDINARY_API_SECRET2
    
    })
    console.log("Cloudinary Name:", process.env.CLOUDINARY_NAME);
    console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
    console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_SECRET);
}


export default connectCloudinary