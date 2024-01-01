import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js";

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8000;

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("🚀 ~ Conected to mongodb");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });

if (process.env.NODE_ENV === "development") {
    mongoose.set("debug", true);
}

app.listen(PORT, () => {
    console.log(
        `🚀 ~ Mode: ${process.env.NODE_ENV} ~ Running on port: ${PORT}`
    );
});

process.on("uncaughtExeption", (err) => {
    console.error("Uncaught Exeption:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
});

process.on("SIGTERM", () => {
    console.log("Received SIGTERM signal. Shutting down gracefully...");
    app.close(() => {
        console.log("Server gracefully closed.");
        process.exit(0);
    });
});
