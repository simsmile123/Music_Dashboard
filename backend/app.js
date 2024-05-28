const express = require("express");
const app = express();
const port = 5002;
app.use(express.json());


// // Import our firebase: We still need to import out firebase methods later such as collection, getDocs..etc...
// const db = require("./firebase");
// // const {/* <firebase methods>*/} = require("firebase/firestore")
// const { collection } = require("firebase/firestore");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Routes will go below; templates are below

// Create a route and a handler for GET /posts
app.get("/posts", (req, res) => {
  let ret = [];
  // Do things to get the data...
  // Send the data array as a JSON response
  res.status(200).json(ret);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  // Do the same as before
});
