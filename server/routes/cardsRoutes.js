import express from "express"
import { createCardController, deleteCardController, getCardsController, getSingleCardsController, updateCardController } from "../controllers/CardController.js";
import { upload } from "../Middlewares/upload.js";

const router = express.Router();


//post card details
router.post('/create-card',upload.single('image'),createCardController)

//get cards details
router.get('/get-cards',getCardsController)


//get single cards details
router.get('/get-cards/:id',getSingleCardsController)

//update cards controller

router.put('/update-cards/:id',upload.single('image'),updateCardController)


//delete cards controller
router.delete('/delete-cards/:id',deleteCardController)

export default router;