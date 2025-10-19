const { Router } = require("express");
const { UserModel } = require("../database/db");
const JWT = require('jsonwebtoken');
const jwtkey = process.env.JWT_KEY;
const UserRouter = Router();
const bcrypt = require('bcrypt')


UserRouter.post("/signup", async (req, res) => {

    const { email, name, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        await UserModel.create({
            email, name, password: hashedPassword
        });
        res.json({ message: "User Information Saved , Login !" })
    } catch (e) {
        console.log(e);
        res.status(403).json({ message: "User already Exsist" })
    }
})

UserRouter.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const findUser = await UserModel.findOne({ email });
        if (!findUser) {
            return res.status(403).json({ message: "Email Not Found , Signup" })
        }

        const verifyPassword = await bcrypt.compare(password, findUser.password);
        if (!verifyPassword) return res.status(403).json({ message: 'Invalid Credentials' });

        const token = JWT.sign({
            id: findUser._id
        }, jwtkey);
        const name = findUser.name;
        res.json({ message: "Login Complete" , token , name});

    } catch (e) {
        console.error('Login error', e.message || e);
        res.status(500).json({ message: 'Server error' });
    }
})




module.exports={
    UserRouter
}
