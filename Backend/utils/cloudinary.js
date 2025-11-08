import {v2 as cloudinary} from 'cloudinary'
import { getBase64 } from './feature.js';
import dotenv from 'dotenv'
dotenv.config();


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const uploadFileToCloudinary = async (file) => {
 try {
     const result = await cloudinary.uploader.upload(getBase64(file),{
       resource_type:'auto',
       folder:'social-post'
     });
     console.log("File has been uploaded on cloudinary");
     return result?.secure_url;
 } catch (error) {
    console.log('Error uploading file ',error)
 }
};