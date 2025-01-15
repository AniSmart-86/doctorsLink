const Review = require("../Models/ratingModel.js");

// POST /reviews - Add a new review
const reviews = async (req, res) => {
    try {
        const {text, rating, doctorId} = req.body
        if(!text || !rating){
            res.status(400).json({ success: false, message: 'Comment and Rating is Required' });
        }

        doctor.reviews.push({ text, rating });

        // Update total rating and count
        doctor.totalRating += rating;
        doctor.ratingCount += 1;

        const review = new Review({text, rating, doctorId});
        await review.save();
        res.status(201).json({success: true, review});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// GET /reviews - Fetch reviews for a specific doctor
const getReviews = async (req, res) => {
    const { doctorId } = req.query;
    try {
        const reviews = await Review.find({ doctorId });
        res.json({success: true, reviews});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {reviews, getReviews}