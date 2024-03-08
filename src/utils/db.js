import mongoose from "mongoose";

export async function connectToDatabase() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
}

export async function disconnectDatabase() {
    await mongoose.disconnect(process.env.DB_URL);
    console.log("Disonnected from database");
}
