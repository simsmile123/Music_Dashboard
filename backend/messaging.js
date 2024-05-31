const express = require("express");
const { collection, getDocs, getDoc, doc, updateDoc, arrayUnion} = require("firebase/firestore");
const router = express.Router(); // Create a router instance
router.use(express.json());
const db = require("./firebase");

//get my chat history
router.get("/users", async (req, res) => {
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

//get conversation from chat id
router.get("/chat/:chatID", async (req, res) => {
    const id = req.params.chatID;
    console.log(id)
    try {
        let ret = [];
        const querySnapshot = await getDoc(doc(db, "chats", id));
        if (querySnapshot.exists()) {
            res.status(200).json({
                id: querySnapshot.id,
                ...querySnapshot.data()
            });
        } else {
            res.status(404).json({ error: "Chat not found" });
        res.status(200).json(ret)};
    } catch (e) {
        res.status(400).json({error: e.message});
    }
})

//add message to an existing chat
router.put("/chat/:chatID", async (req, res) => {
    const id = req.params.chatID
    const message = req.body.message
    const time = req.body.time 
    const user = req.body.user

    try {
        const docRef = doc(db, "chats", id); 
        await updateDoc(docRef, {
            history: arrayUnion({message:message, time:time, user:user})
        })
    res.status(200).json({message: `Successfully updated chat with id ${id}`})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
})

module.exports = router;