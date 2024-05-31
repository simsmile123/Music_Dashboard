const express = require('express');
const router = express.Router();
const db = require("./firebase");
const { collection, getDoc, doc, addDoc, updateDoc, arrayUnion, arrayRemove} = require("firebase/firestore");

router.get("/inbox/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const user = await getDoc(collection(db, "users", id));
        const chats = user.data().chats
        res.status(200).json(chats);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.get("/inbox/:id/:chatid", async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const chat = await getDoc(collection(db, "chats", chatId));
        const chatData = chat.data();
        res.status(200).json(chatData);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.delete("/inbox/:id/:chatid", async (req, res) => {
    try {
        const id = req.params.id;
        const chatId = req.params.chatId;
        const userRef = doc(db, "users", id);
        await deleteDoc(doc(db, "chats", chatId))
        await updateDoc(userRef, {
            chats: arrayRemove(chatId)
        });
        res.status(200).json();
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.post("/inbox/:id", async (req, res) => {
    try {
        const u1 = req.params.body.u1
        const u2 = req.params.body.u2
        const chatId = await addDoc(collection(db, 'chats'), {
            history: [],
            user1: u1,
            user2: u2
        });

        const id = req.params.id;
        const userRef = doc(db, "users", id);
        await addDoc(doc(db, "chats", chatId))
        await updateDoc(userRef, {
            chats: arrayUnion(chatId)
        });  
        res.status(200).json();
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})