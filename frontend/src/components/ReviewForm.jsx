import React, { useState } from "react";

const ReviewForm = ({ userId, doctorId, bookingId, reviewsDb, validateBooking }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleStarClick = (starValue) => {
        setRating(starValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateBooking(userId, doctorId, bookingId)) {
            setErrorMessage("You cannot review this doctor because the booking is not valid.");
            return;
        }

        if (rating < 1 || rating > 5) {
            setErrorMessage("Please select a rating between 1 and 5 stars.");
            return;
        }

        const newReview = {
            userId,
            doctorId,
            bookingId,
            rating,
            review: reviewText,
            timestamp: new Date().toISOString(),
        };

        reviewsDb.push(newReview);
        setSuccessMessage("Thank you! Your review has been submitted.");
        setErrorMessage("");
        setRating(0);
        setReviewText("");
    };

    return (
        <div>
            <h2>Write a Review</h2>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <p>Rating:</p>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleStarClick(star)}
                            style={{
                                cursor: "pointer",
                                color: star <= rating ? "gold" : "gray",
                                fontSize: "24px",
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <label>
                    Review:
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    ></textarea>
                </label>
                <br />

                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

const validateBooking = (userId, doctorId, bookingId) => {
    // Simulate a database of bookings
    const mockBookings = [
        { userId: 1, doctorId: 101, bookingId: 1001 },
        { userId: 2, doctorId: 102, bookingId: 1002 },
        { userId: 3, doctorId: 103, bookingId: 1003 },
    ];

    // Check if the booking exists in the database
    return mockBookings.some(
        (booking) =>
            booking.userId === userId &&
            booking.doctorId === doctorId &&
            booking.bookingId === bookingId
    );
};

export default ReviewForm;
