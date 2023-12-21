const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config()
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
// const jwt = require("jsonwebtoken")
const port = process.env.PORT || 5000;



// middeleware
app.use(cors());
app.use(express.json());
console.log(process.env.DB_PASS);




// mongo db start

// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ww7s5no.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        //  client.connect();
        // Send a ping to confirm a successful connection
        //  client.db("admin").command({ ping: 1 });

        // dbs
        const database = client.db("todo");
        const todolist = database.collection("lists");

        // pst api for storing lists
        app.post("/v1/lists", async (req, res) => {
            const lists = req.body;
            console.log(lists, "lists ");
            const result = await todolist.insertOne(lists)
            // const timestamp = new Date()
            res.send(result)
        })
        // get api for getting all lists info
        app.get("/v1/listsInfo", async (req, res) => {
            

            const cursor = todolist.find()
            const result = await cursor.toArray()
            res.send(result)

        })



        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

//  mngdb end
// testing api
app.get("/", (req, res) => {
    res.send("todo server")
})

app.listen(port, () => {
    console.log(`to do server at port ${port}`)
})