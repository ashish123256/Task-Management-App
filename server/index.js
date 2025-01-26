import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
import cors from "cors"
import cloudinary from "cloudinary";
import multer from 'multer';

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('DB connected');

}).catch((err)=>{
    console.log(err);
});




const app = express();
// Set Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
    res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
    next();
});


app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
}));

const PORT = process.env.PORT || 4000;

app.use(cookieParser());


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);   
})


//Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), async (req, res)=>{
    try {
        
        if(!req.file){
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
       
         // Upload the file to Cloudinary
    const result = await cloudinary.v2.uploader.upload_stream(
        { resource_type: 'auto' }, // auto-detects the resource type (image, video, etc.)
        (error, result) => {
          if (error) {
            return res.status(500).json({ success: false, message: 'Error uploading to Cloudinary', error });
          }
          // Return the secure URL of the uploaded image
          res.status(200).json({ success: true, imageUrl: result.secure_url });
        }
      );
      // Pipe the file to Cloudinary upload stream
    result.end(req.file.buffer);

    } catch (error) {
        console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})
app.use('/api/auth', authRoutes);
app.use('/api/task',taskRoutes)

app.use((err, req, res, next)=> {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
         success:false,
         statusCode,
         message
         });
})