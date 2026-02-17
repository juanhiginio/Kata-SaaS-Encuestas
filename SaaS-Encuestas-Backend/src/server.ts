import dotenv from "dotenv";

import { connectDB } from "./config/database";
import app from "./app";

dotenv.config();

const { PORT } = process.env;

// Validar que PORT esté definido en env
if (!PORT) {
    throw new Error("PORT is not defined in environment variables");
}

const startServer = async (): Promise<void> => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    }catch(error: unknown) {
        if (error instanceof Error) {
            console.error("Error starting server:", error.message);
        } else {
            console.error("An unknown error occurred while starting the server");
        }

        process.exit(1); // Salir del proceso con código de error
    }
};

startServer();
