
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    doctorId: { type: String },
    userId: { type: String },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    totalRating: { type: Number, default: 0 }, 
    ratingCount: { type: Number, default: 0 }, 
    createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

module.exports = Review