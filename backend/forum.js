const express = require('express');
const router = express.Router();
const db = require("./firebase");
const { collection, getDoc, doc, addDoc, updateDoc, arrayUnion, arrayRemove} = require("firebase/firestore");

router.get("/forum/:id", async (req, res) => {
    try {
        const forums = await getDoc(collection(db, "forums"));
        const forumData = forums.data()
        res.status(200).json(chats);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.delete("/forum/:id/:forumId", async (req, res) => {
    try {
        const id = req.params.id;
        const forumId = req.params.forumId;
        await deleteDoc(doc(db, "forums", forumId))
        res.status(200).json();
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.post("/forum/:id", async (req, res) => {
    try {
        const title = req.params.body
        await addDoc(collection(db, 'forums'), {
            history: [],
            title: title,
        });
        res.status(200).json();
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})