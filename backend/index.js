import express from "express";
import { MongoClient, GridFSBucket } from "mongodb";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import multer from "multer";
import { Readable } from "stream";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function startServer() {
    try {
        const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
        await mongoClient.connect();

        const database = mongoClient.db("narekdb");
        const myCollections = database.collection("products");

        const bucket = new GridFSBucket(database, {
            bucketName: "images"
        });

        app.post("/addProduct", upload.single("image"), async (req, res) => {
            const { title, price, desc, category } = req.body;
            const base64Image = req.file.buffer.toString('base64');
            const image = `data:${req.file.mimetype};base64,${base64Image}`;
            await myCollections.insertOne({
                title,
                price,
                desc,
                category,
                image
            });
            
        }); 

        app.get("/products", async (req, res) => {
            const resBody = await myCollections.find().toArray();
            res.status(200).send(resBody);
        });

        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "/public", "index.html"));
        });

        app.listen(3015, () => {
            console.log("Server is running on port 3015");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

startServer();
