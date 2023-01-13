const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 5000
require("dotenv").config()

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ltefwui.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

const run = async () => {
    try {
        const tasksWentWell = client.db("retrospective").collection("tasksWentWell")
        const tasksCanBeImproved = client.db("retrospective").collection("tasksCanBeImproved")
        const tasksStartDoing = client.db("retrospective").collection("tasksStartDoing")
        const actionTasks = client.db("retrospective").collection("actionTasks")


        // Task Went Well Section

        app.get("/tasksWentWell", async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const tasks = tasksWentWell.find(query).sort({ _id: -1 })
            const result = await tasks.toArray()
            res.send(result)
        })

        app.post("/tasksWentWell", async (req, res) => {
            const task = req.body;
            const result = await tasksWentWell.insertOne(task);
            res.send(result)
        })

        app.put("/tasksWentWell/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const currentTask = req.body
            const options = {
                upsert: true
            }
            const updatedDoc = {
                $set: {
                    completed: true,
                    title: currentTask.title,
                    task: currentTask.description
                }
            }
            const updatedTask = await tasksWentWell.updateOne(filter, updatedDoc, options)
            res.send(updatedTask)
        })

        app.patch("/updatedLike/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updatedLiked = req.body;
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    totalLiked: updatedLiked.totalLiked
                }
            }
            const updatedTask = await tasksWentWell.updateOne(filter, updatedDoc, options)
            res.send(updatedTask)
        })

        app.delete("/tasksWentWell/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const deletedTask = await tasksWentWell.deleteOne(query);
            res.send(deletedTask)
        })

        // Task Can be Improved Section

        app.get("/taskCanBeImprove", async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const tasks = tasksCanBeImproved.find(query).sort({ _id: -1 })
            const result = await tasks.toArray()
            res.send(result)
        })

        app.post("/taskCanBeImprove", async (req, res) => {
            const task = req.body;
            const result = await tasksCanBeImproved.insertOne(task);
            res.send(result)
        })

        app.put("/taskCanBeImprove/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const currentTask = req.body
            const options = {
                upsert: true
            }
            const updatedDoc = {
                $set: {
                    completed: true,
                    title: currentTask.title,
                    task: currentTask.description
                }
            }
            const updatedTask = await tasksCanBeImproved.updateOne(filter, updatedDoc, options)
            res.send(updatedTask)
        })

        app.patch("/upvoteImprovementTask/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updatedLiked = req.body;
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    totalLiked: updatedLiked.totalLiked
                }
            }
            const updatedTask = await tasksCanBeImproved.updateOne(filter, updatedDoc, options)
            res.send(updatedTask)
        })

        app.delete("/taskCanBeImprove/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const deletedTask = await tasksCanBeImproved.deleteOne(query);
            res.send(deletedTask)
        })

        // Task Start doing Section

        app.get("/tasksStartDoing", async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const tasks = tasksStartDoing.find(query).sort({ _id: -1 })
            const result = await tasks.toArray()
            res.send(result)
        })

        app.post("/tasksStartDoing", async (req, res) => {
            const task = req.body;
            const result = await tasksStartDoing.insertOne(task);
            res.send(result)
        })

        app.put("/tasksStartDoing/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const currentTask = req.body
            const options = {
                upsert: true
            }
            const updatedDoc = {
                $set: {
                    completed: true,
                    title: currentTask.title,
                    task: currentTask.description
                }
            }
            const updatedTask = await tasksStartDoing.updateOne(filter, updatedDoc, options)
            res.send(updatedTask)
        })

        app.patch("/upvoteStartDoingTask/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updatedLiked = req.body;
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    totalLiked: updatedLiked.totalLiked
                }
            }
            const updatedTask = await tasksStartDoing.updateOne(filter, updatedDoc, options)
            res.send(updatedTask)
        })

        app.delete("/tasksStartDoing/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const deletedTask = await tasksStartDoing.deleteOne(query);
            res.send(deletedTask)
        })

        // Action Task Section

        app.get("/actionTasks", async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const tasks = actionTasks.find(query).sort({ _id: -1 })
            const result = await tasks.toArray()
            res.send(result)
        })

        app.post("/actionTasks", async (req, res) => {
            const task = req.body;
            const result = await actionTasks.insertOne(task);
            res.send(result)
        })

        app.put("/actionTasks/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const currentTask = req.body
            const options = {
                upsert: true
            }
            const updatedDoc = {
                $set: {
                    completed: true,
                    title: currentTask.title,
                    task: currentTask.description
                }
            }
            const updatedTask = await actionTasks.updateOne(filter, updatedDoc, options)
            res.send(updatedTask)
        })

        app.patch("/upvoteActionTasks/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updatedLiked = req.body;
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    totalLiked: updatedLiked.totalLiked
                }
            }
            const updatedTask = await actionTasks.updateOne(filter, updatedDoc, options)
            res.send(updatedTask)
        })

        app.delete("/actionTasks/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const deletedTask = await actionTasks.deleteOne(query);
            res.send(deletedTask)
        })


    }
    finally {

    }
}
run().catch(err => console.error(err))

app.get("/", (req, res) => {
    res.send("Server is running Successfully")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})