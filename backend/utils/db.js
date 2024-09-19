import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error in DB connection:', error.message); // Log actual error message
        process.exit(1); // Optional: Exit the process if the DB connection fails
    }
}

export default connectDB;
