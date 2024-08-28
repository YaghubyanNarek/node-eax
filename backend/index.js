import express, { application } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import bodyParser from "body-parser"

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

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
        })

        app.listen(3015, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

startServer();
