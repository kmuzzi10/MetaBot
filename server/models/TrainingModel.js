import express from "express";
import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
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
    text: {
        type: String
    }
});

// Middleware to assign cardId before saving
trainingSchema.pre('save', async function (next) {
    if (!this.cardId) {
        const lastCard = await this.constructor.findOne({}, {}, { sort: { 'cardId': -1 } });
        this.cardId = lastCard ? lastCard.cardId + 1 : 1;
    }
    next();
});

export default mongoose.model('Training', trainingSchema);
