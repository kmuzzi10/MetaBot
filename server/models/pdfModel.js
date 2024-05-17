import mongoose from "mongoose";

// PDF upload model
const PdfModelSchema = new mongoose.Schema({
    Id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    areaOfInterest: {
        type: String,
        required: true
    },
    file: {
        data: Buffer,
        contentType: String
    }
});

// Auto-increment for Id field before saving a new document
PdfModelSchema.pre('save', async function (next) {
    if (!this.isNew) return next();
    
    const lastEntry = await this.constructor.findOne({}, {}, { sort: { 'Id': -1 } });
    this.Id = lastEntry ? lastEntry.Id + 1 : 1;
    next();
});

export default mongoose.model('PdfUpload', PdfModelSchema);
