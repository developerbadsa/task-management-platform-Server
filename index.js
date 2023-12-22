const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
const uri = process.env.MongoDB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    //     const TasksDB = client.db('taskDB').collection('taskDBCollection');

    app.get('/', (req, res) => {
      res.send('go');
    });

    //---------------------GET REQ -------------------------//
    app.get('/tasks', async (req, res) => {
      // const {email, status} = req.body
      const {status, email} = req.query;
      const query = {status: status};

      const result = await client
        .db('taskDB')
        .collection(email)
        .find(query)
        .toArray();
      // console.log('task', result, status);
      res.send(result);
    });

    //---------------------POST REQ -------------------------//
    app.post('/create-task', async (req, res) => {
      const {formData, email, status} = req.body;

      const result = await client
        .db('taskDB')
        .collection(email)
        .insertOne({formData, status});
      console.log(result);
      res.send(result);
    });

    //---------------------UPDATE REQ -------------------------//
    app.put('/task-status', async (req, res) => {
      const {shouldgo, email, id} = req?.query;

      const updateDoc = {
        $set: {
          status: shouldgo,
        },
      };
      const query = {
            _id: new ObjectId(id)
      }

      const result = await client
        .db('taskDB')
        .collection(email)
        .updateOne(query, updateDoc);
      res.send(result)
    });


        //---------------------DELETE REQ -------------------------//
        app.delete('/task-delete', async (req, res) => {
            const { email, id} = req?.query;
      
            // const updateDoc = {
            //   $set: {
            //     status: shouldgo,
            //   },
            // };
            const query = {
                  _id: new ObjectId(id)
            }
      
            const result = await client
              .db('taskDB').collection(email).deleteOne(query)
            console.log(email, id)
            res.send(result)
          });











  } finally {
    // Close the MongoDB client connection
    //     await client.close();
  }
}
// Run the function and handle any errors
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
