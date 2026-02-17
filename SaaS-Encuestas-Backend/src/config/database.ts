import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { DB_URI } = process.env;

// Validar que DB_URI esté definido en env
if (!DB_URI) {
  throw new Error("DB_URI is not defined in environment variables");
}

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connection established successfully");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error connecting to database:", error.message);
        } else {
            console.error("An unknown error occurred while connecting to the database");
        }

        process.exit(1); // Salir del proceso con código de error
    }
};