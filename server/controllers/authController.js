import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";



//register route
export const registerController = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { email, password, answer } = req.body;

        // Validations
        if (!email) {
            return res.status(400).json({ message: "Email is Required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is Required" });
        }
        if (!answer) {
            return res.status(400).json({ message: "Answer is Required" });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ // 409 Conflict might be more appropriate here
                success: false,
                message: "Already registered, please login",
            });
        }

        // Register the user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            email,
            password: hashedPassword,
            answer
        }).save();

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: {
                userId: user.userId, // Assuming you'd still like to return the userId
                email: user.email,
                answer: user.answer
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};




//login route for login

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email is not registered",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
            });
        }
        // generate token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                userId: user.userId,
                email: user.email
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in login",
            error: error.message,
        });
    }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }
        if (!answer) {
            return res.status(400).send({ message: 'Answer is required' });
        }
        if (!newPassword) {
            return res.status(400).send({ message: 'New password is required' });
        }

        // Check if user exists with the provided email and answer
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong email or answer'
            });
        }

        // Hash the new password
        const hashed = await hashPassword(newPassword);

        // Update user's password
        await userModel.findByIdAndUpdate(user._id, { password: hashed });

        // Send success response
        res.status(200).send({
            success: true,
            message: 'Password has been successfully changed'
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            err
        });
    }
}
