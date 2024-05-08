import express from "express"
import { forgotPasswordController, loginController, registerController } from "../controllers/authController.js";

//router object

const router = express.Router();

//routing

//register user
router.post("/register", registerController);

//login user

router.post("/login", loginController);

//forgot password

router.post('/forgot-password', forgotPasswordController)


export default router;