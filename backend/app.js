const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Imported and configured clientid and secret of spotify API
require("dotenv").config();
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;

const spotify = require("./spotify.js");
app.use("/spotify", spotify);

const messagingRouter = require("./messaging.js");
app.use("/messages", messagingRouter);

// // Import our firebase: We still need to import out firebase methods later such as collection, getDocs..etc...
const db = require("./firebase");
const {
  /* <firebase methods>*/
} = require("firebase/firestore");
const { collection } = require("firebase/firestore");

// Routes will go below
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

const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
