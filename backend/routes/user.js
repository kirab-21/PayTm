const express = require('express');

const router = express.Router();

const zod = require('zod');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

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
});

const singinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async(req, res) => {
    const { success } = singinBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "Incorrect Input"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
        
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging"
    })
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lasttName: zod.string().optional()
});

router.put("/", authMiddleware, async(req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if(!success) {
        res.status(411).json({
            message:"Eror while updating"
        })
    }

    await User.updateOne(req.body,{
        id: req.userId
    })

    res.json({
        message: "Updated Sucessfully"
    })
});

router.get("/bulk", async(req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName:{
                "$regex": filter
            }
        }, {
            lastName:{
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
});


module.exports = router;
