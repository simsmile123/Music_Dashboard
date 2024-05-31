const express = require('express');
const router = express.Router();
const db = require("./firebase");
const { collection, getDoc, doc, addDoc, updateDoc, arrayUnion, arrayRemove} = require("firebase/firestore");

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        console.log('ID:', id);
        const user = await getDoc(doc(db, "users", id));
        const chats = user.data()
        console.log('Data', chats)
        res.status(200).json(chats);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

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

router.get("/:chatid", async (req, res) => {
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

router.delete("/:id/:chatid", async (req, res) => {
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

router.post("/:id", async (req, res) => {
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

module.exports = router;