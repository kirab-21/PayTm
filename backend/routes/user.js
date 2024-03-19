const express = require('express');;
const router = express.Router();
const zod = require('zod');
const { User } = require('./db');
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
        return.res.status(411).json({
            message: "Email Exist / Incorrect Inputs"
        })
    }

})

exports.module = router;
