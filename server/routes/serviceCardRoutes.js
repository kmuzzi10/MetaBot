import express from "express"
import { cardPhotoController, createCardController, deleteCardController, getCardsController, getSingleCardsController, updateCardController } from "../controllers/serviceCardControllers.js";
// import { upload } from "../Middlewares/upload.js";
import formidable from "express-formidable";

const router = express.Router();


//post card details
router.post('/create-card',formidable(),createCardController)

//get cards details
router.get('/get-cards',getCardsController)


//get single cards details
router.get('/get-cards/:id',getSingleCardsController)

//update cards controller

router.put('/update-cards/:id',formidable(),updateCardController)


//delete cards controller
router.delete('/delete-cards/:id',deleteCardController)


//get photo

router.get('/card-photo/:id', cardPhotoController)

export default router;