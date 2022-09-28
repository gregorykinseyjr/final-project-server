const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//REGISTER USER
exports.signup = async (req, res) => {

    try {
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({ message: "Email already exist, Try another", })
        }
        const { firstName, lastName, email, password } = req.body;

        const hash_password = await bcrypt.hash(password, 10);

        const newUser = new User({ firstName, lastName, email, hash_password });

        await newUser.save();
        res.status(201).json({ message: "User register successfully" })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error })
    }
};

//LOGIN USER
exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const isMatch = await bcrypt.compare(req.body.password, user.hash_password);
            if (isMatch && user.role === "user") {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1d" });

                const { _id, firstName, lastName, email, role } = user;

                res.cookie("token", token, { expiresIn: "1d" });

                res.status(200).json({ token, user: { _id, firstName, lastName, email, role } });
            } else {
                res.status(400).json({ message: "Invalid credential" });
            }
        } else {
            res.status(400).json({ message: "Invalid credential" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

