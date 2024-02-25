import mongoose from "mongoose";

export default async function connectToDatabase() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
}
