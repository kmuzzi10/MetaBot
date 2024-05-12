import mongoose from "mongoose"


//card model

const PdfModelSchema = new mongoose.Schema({
    Id: {
        type: Number,
        unique: true
    },
    name: {
       type:String
    },
    email: {
        type: String
    },
    phone:{
        type:Number
    },
    areaOfInterest:{
        type:String
    },
    file:{
        type:String
    }
});

PdfModelSchema.pre('save', async function(next) {
    if (!this.Id) {
        const lastCard = await this.constructor.findOne({}, {}, { sort: { 'Id': -1 } });
        this.Id = lastCard ? lastCard.Id + 1 : 1;
    }
    next();
});

export default mongoose.model('Pdfupload', PdfModelSchema);