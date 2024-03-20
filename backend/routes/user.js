const express = require('express');

const router = express.Router();

const zod = require('zod');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const signUpBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post("/signup", async(req, res) => {
    const { success } = signUpBody.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message: "Email Exist / Incorrect Inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser) {
        return res.status(411).json({
            message: "Email Exist / Incorrect Inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User Created Successfully",
        token: token
    })
})

module.exports = router;
