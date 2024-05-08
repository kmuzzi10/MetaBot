import CardModel from "../models/newsCardModel.js";

export const createCardController = async (req, res) => {
    try {
        let card = await new CardModel(
            {
                title: req.body.title,
                text: req.body.text
            }
        )
        if (req.file) {
            card.image = process.env.PORT_URL + req.file.path
        }
        card.save()
        res.status(201).send({
            success: true,
            message: 'new card created',
            card
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in creating cards'
        })
    }
}



export const getSingleCardsController = async (req,res)=>{
    try {
        const id = req.params.id
        const cardsData = await CardModel.findById({'_id':id})
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
        const cardsData = await CardModel.find({}).sort({ cardId: -1 });
        res.status(200).send({
            success: true,
            message: "All news card details ",
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



export const updateCardController = async (req, res) => {
    try {
        const cardId = req.params.id;
        const { title, text } = req.body;

        // Check if the card exists
        const card = await CardModel.findById(cardId);
        if (!card) {
            return res.status(404).send({
                success: false,
                message: 'Card not found'
            });
        }

        // Update the card fields
        if (title) {
            card.title = title;
        }
        if (text) {
            card.text = text;
        }
        if (req.file) {
            card.image = process.env.PORT_URL + req.file.path;
        }

        // Save the updated card
        await card.save();

        res.status(200).send({
            success: true,
            message: 'Card updated successfully',
            card
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating card',
            error
        });
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
