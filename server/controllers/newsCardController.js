import CardModel from "../models/newsCardModel.js";
import fs from "fs"

export const createCardController = async (req, res) => {
    try {
        console.log('Reached in create card controller')
        const { title, text } = req.fields
        const { image } = req.files

        //validation
        if (!title) {
            return res.status(500).send({
                success: false,
                message: 'Name is required'
            })
        }
        if (!text) {
            return res.status(500).send({
                success: false,
                message: 'Description is required'
            })
        }
        if (image && image.size > 205800000000000000) {
            return res.status(500).send({
                success: false,
                message: 'Image is required and it should be less than 200mb'
            })
        }

        const cards = new CardModel({ ...req.fields })
        if (image) {
            cards.image.data = fs.readFileSync(image.path)
            cards.image.contentType = image.type

        }
        await cards.save()
        res.status(201).send({
            success: true,
            mesage: 'card created successfully',
            cards
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in creating card',
            error
        })
    }
}



export const getSingleCardsController = async (req, res) => {
    try {
        const id = req.params.id
        const cardsData = await CardModel.findById({ '_id': id }).select("-image")
        res.status(200).send({
            success: true,
            message: "Card details",
            cardsData
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting cards data",
            error
        });
    }
}




export const getCardsController = async (req, res) => {
    try {
        const cardsData = await CardModel.find({}).select("-image").sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "All card details",
            cardsData
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting cards data",
            error
        });
    }
};

//card image controller

export const cardPhotoController = async (req, res) => {
    try {
        console.log('Reached card image controller');
        const card = await CardModel.findById(req.params.id).select("image");
        if (!card || !card.image) {
            return res.status(404).send({
                message: "No card image found"
            });
        }
        res.set("Content-type", card.image.contentType);
        res.status(200).send(card.image.data);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting card image',
            error
        });
    }
};




export const updateCardController = async (req, res) => {
    try {
        console.log('Reached in update Card controller')
        const { title, text } = req.fields
        const { image } = req.files

        //validation
        if (!title) {
            return res.status(500).send({
                success: false,
                message: 'Title is required'
            })
        }
        if (!text) {
            return res.status(500).send({
                success: false,
                message: 'text is required'
            })
        }
        if (image && image.size > 2058000000000000) {
            return res.status(500).send({
                success: false,
                message: 'Image is required and it should be less than 200mb'
            })
        }

        const cards = await CardModel.findByIdAndUpdate(req.params.id,
            { ...req.fields },
            { new: true }
        )
        if (image) {
            cards.image.data = fs.readFileSync(image.path)
            cards.image.contentType = image.type

        }
        await cards.save()
        res.status(201).send({
            success: true,
            mesage: 'Card updated successfully',
            cards
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating Card image',
            error
        })
    }
}




export const deleteCardController = async (req, res) => {
    try {
        const cardId = req.params.id;
        console.log(cardId)
        // Check if the card exists
        const card = await CardModel.findByIdAndDelete(cardId);
        if (!card) {
            return res.status(404).send({
                success: false,
                message: 'Card not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Card deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting card',
            error
        });
    }
}
