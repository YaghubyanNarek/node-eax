import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Manually set __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
    try {
        const mongoClient = new MongoClient("mongodb://localhost:27017");

        await mongoClient.connect();

        const database = mongoClient.db("narekdb");
        const myCollections = database.collection("products");

        app.post("/addProduct", async (req, res) => {
            try {
                console.log("Request body:", req.body);
                const result = await myCollections.insertOne(req.body);
                console.log(result);
                res.status(200).send("Data received and stored");
            } catch (error) {
                console.error("Error inserting data:", error);
                res.status(500).send("Internal Server Error");
            }
        });

        app.get("/products", async (req, res) => {
            const resBody = await myCollections.find().toArray();
            console.log(resBody);
            res.status(200).send(resBody);
        });

        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname,  "../public", "index.html"));
        });

        app.listen(3015, () => {
            console.log("Server is running on port 3015");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

startServer();
