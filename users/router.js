const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUserById } = require('./module');
const {authMiddleware}= require("../utils/auth")

router.post("/", async (req, res) => {
    try {
        res.status(201).send({
            token: await createUser(req.body)
        })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

router.post("/login", async (req, res, next) => {
    try {
        res.status(200).send({
            token: await loginUser(req.body)
        })
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
})

router.get("/me",authMiddleware, async(req, res, next)=>{
    try{
        res.status(200).send(await getUserById(req.user.userId));
    }catch(err){
        res.status(400).send({ message: err.message });
    }
})
module.exports = router;