import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';  
import { urlencoded } from 'express';       
import dotenv from "dotenv";
import userRoute from './routes/user-routes.js';
import recipeRoute from './routes/recipe-routes.js';
import commentRoute from './routes/comment-routes.js';
import connectDB from './utils/db.js';
import bodyParser from 'body-parser';
import path from 'path'

dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


// Middleware Connections 
const app = express();
app.use(cookieParser());                      
app.use(urlencoded({ extended: true }));      
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data

// CORS Options
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true // Crucial for cookie sending and receiving
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/recipe", recipeRoute); // Protect recipe routes
app.use("/api/v1/comment", commentRoute); // Protect comment routes

app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})

// Connection to MongoDB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('App running on port: ' + PORT);
    });
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});
