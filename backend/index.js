import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import bookRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json()); // middlewware to parse request body

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to the tutorial");
});

app.use("/book", bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`App listening at: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
