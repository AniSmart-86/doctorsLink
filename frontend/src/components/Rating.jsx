import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Rating = () => {
    const Base_URL = 'http://localhost:5000/api/users';
    const { docId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);
    

    // Fetch reviews on component mount
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${Base_URL}/getreview?doctorId=${docId}`);
                if (response.data.success) {
                    setReviews(response.data.reviews || []);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [docId]);

    // Handle review submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (newReview && rating > 0) {
            try {
                const response = await axios.post(`${Base_URL}/review`, {
                    doctorId: docId,
                    text: newReview,
                    rating,
                });

                if (response.data.success && response.data.review) {
                    setReviews((prevReviews) => [...prevReviews, response.data.review]); // Append the new review
                    setNewReview(''); // Clear the form
                    setRating(0); // Reset the rating
                } else {
                    console.error('Failed to save review');
                }
            } catch (error) {
                console.error('Error submitting review:', error);
            }
        }
    };

   
    const validReviews = reviews.filter((review) => review && review._id);

    return (
        <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-800">User Reviews</h3>
            <div className="mt-4">
                {validReviews.map((item) => (
                    <div key={item._id} className="border-b border-gray-300 pb-2 mb-2">
                        <p className="text-gray-700">{item.text ? item.text : 'No review text'}</p>
                        <p className="text-yellow-500">Rating: {item.rating || 'No rating'} ★</p>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <form onSubmit={handleReviewSubmit}>
                    <textarea
                        className="w-full border rounded p-2"
                        placeholder="Write a review..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    />
                    <div className="flex items-center mt-2">
                        <p className="mr-2">Rating:</p>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`cursor-pointer text-xl ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <button
                        className="mt-2 bg-green-700 text-white px-4 py-2 rounded"
                        type="submit"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Rating;
