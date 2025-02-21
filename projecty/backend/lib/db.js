import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Database Connected: " + conn.connection.host);
    } catch (error) {
        console.error("Connection failed: " + error.message);
        process.exit(1); // Exit process if connection fails
    }
};

// Handle unexpected database disconnection
mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB Disconnected! Reconnecting...");
    connectDB();
});

// Handle unexpected errors
mongoose.connection.on("error", (err) => {
    console.error("MongoDB Connection Error: ", err);
});