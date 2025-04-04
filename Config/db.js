import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nothsn:nothsn@cluster0.4h47m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

export { connectDB };