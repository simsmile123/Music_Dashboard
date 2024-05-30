const express = require("express");
const { collection, getDocs } = require("firebase/firestore");
const router = express.Router(); // Create a router instance
router.use(express.json());
const db = require("./firebase");

//get all users
router.get("/", async (req, res) => {
    try {
        let ret = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            ret.push({
                id: doc.id,
                ...doc.data(),
            })
        });
        console.log("Reached this endpoint!");
        res.status(200).json(ret);
    }
    catch (e) {
        res.status(400).json({error: e.message});
    }
  });

  module.exports = router;