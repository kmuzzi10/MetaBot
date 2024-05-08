import mongoose from "mongoose"


//card model

const NewsCardSchema = new mongoose.Schema({
    cardId: {
        type: Number,
        unique: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    title: {
        type: String
    },
    text:{
        type:String
    }
});

NewsCardSchema.pre('save', async function(next) {
    if (!this.cardId) {
        const lastCard = await this.constructor.findOne({}, {}, { sort: { 'cardId': -1 } });
        this.cardId = lastCard ? lastCard.cardId + 1 : 1;
    }
    next();
});

export default mongoose.model('NewsCard', NewsCardSchema);