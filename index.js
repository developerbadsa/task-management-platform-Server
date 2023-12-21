const express = require('express');
const { MongoClient } = require('mongodb');
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
      // res.send('');
    });
    
    //---------------------POST REQ -------------------------//
    app.post('/create-task', async (req, res) => {
      const {formData, email} = req.body
          
    const result = await client.db('taskDB').collection(email).insertOne(formData);
      console.log(result);
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
