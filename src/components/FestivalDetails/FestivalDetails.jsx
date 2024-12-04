import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./FestivalDetails.scss";
import AddCommentModal from "../../components/AddCommentModal/AddCommentModal";
import pencilIcon from "../../assets/edit_note_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

function FestivalDetails() {
    const { id } = useParams(); // `id` corresponds to the festivalId
    const [festival, setFestival] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [comments, setComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFestivalData = async () => {
            try {
                console.log(`Fetching festival data for ID: ${id}`);
                // Updated API endpoints to align with your backend
                const [festivalRes, ticketsRes, hotelsRes, commentsRes] =
                    await Promise.all([
                        axios.get(`http://localhost:8080/api/festivals/${id}`),
                        axios.get(`http://localhost:8080/api/tickets/festival/${id}`),
                        axios.get(`http://localhost:8080/api/hotels/festival/${id}`),
                        axios.get(`http://localhost:8080/api/festivals/${id}/comments`),
                    ]);

                console.log("Data fetched successfully:", {
                    festival: festivalRes.data,
                    tickets: ticketsRes.data,
                    hotels: hotelsRes.data,
                    comments: commentsRes.data,
                });

                setFestival(festivalRes.data);
                setTickets(ticketsRes.data);
                setHotels(hotelsRes.data);
                setComments(commentsRes.data);
            } catch (err) {
                setError("Failed to fetch festival details");
                console.error("Error fetching festival data:", err.response?.data || err.message);
            }
        };

        fetchFestivalData();
    }, [id]);

    const handleAddComment = async (newComment) => {
        try {
            console.log("Adding a new comment:", newComment);
            const response = await axios.post(
                `http://localhost:8080/api/festivals/${id}/comments`,
                newComment
            );
            console.log("Comment added successfully:", response.data);
            setComments((prevComments) => [response.data, ...prevComments]);
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error adding comment:", err.response?.data || err.message);
            alert("Failed to add comment. Please try again.");
        }
    };

    if (error) return <div className="festival-details__error">{error}</div>;

    if (!festival) return <div className="festival-details__loading">Loading...</div>;

    return (
        <section className="festival-details">
            <div className="festival-details__header">
                <h1 className="festival-details__title">{festival.festival_name}</h1>
                <p className="festival-details__location">📍 {festival.location}</p>
                <p className="festival-details__dates">
                    📅 {new Date(festival.start_date).toLocaleDateString()} -{" "}
                    {new Date(festival.end_date).toLocaleDateString()}
                </p>
                <a
                    className="festival-details__link"
                    href={festival.webpage}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Official Page
                </a>
            </div>

            <div className="festival-details__content">
                {/* Tickets Section */}
                <div className="festival-details__section">
                    <h2 className="festival-details__section-title">Tickets 🎟️</h2>
                    <div className="festival-details__tickets">
                        {tickets.length > 0 ? (
                            tickets.map((ticket) => (
                                <div key={ticket.id} className="festival-details__ticket-box">
                                    <p>
                                        <strong>Type:</strong> {ticket.ticket_type}
                                    </p>
                                    <p>
                                        <strong>Price:</strong> {ticket.price} {ticket.currency}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="festival-details__message">No tickets available.</p>
                        )}
                    </div>
                </div>

                {/* Hotels Section */}
                <div className="festival-details__section">
                    <h2 className="festival-details__section-title">Hotels 🏨</h2>
                    <div className="festival-details__hotels">
                        {hotels.length > 0 ? (
                            hotels.map((hotel) => (
                                <div key={hotel.id} className="festival-details__hotel-box">
                                    <p>
                                        <strong>Hotel:</strong> {hotel.hotel_name}
                                    </p>
                                    <p>
                                        <strong>Distance:</strong> {hotel.distance} km
                                    </p>
                                    <p>
                                        <strong>Cost:</strong> {hotel.cost_per_night} {hotel.currency}
                                    </p>
                                    <p>
                                        <strong>Stars:</strong> {hotel.stars} ⭐
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="festival-details__message">No hotels listed.</p>
                        )}
                    </div>
                </div>

                {/* Comments Section */}
                <div className="festival-details__section">
                    <div className="festival-details__section-container">
                        <h2 className="festival-details__section-title">Comments 💬</h2>
                        <button
                            className="festival-details__section-button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <img src={pencilIcon} alt="icon with pencil" />
                            Add Comment
                        </button>
                        {isModalOpen && (
                            <AddCommentModal
                                onClose={() => setIsModalOpen(false)}
                                onAddComment={handleAddComment}
                            />
                        )}
                    </div>
                    <div className="festival-details__comments">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="festival-details__comment-box">
                                    <p>
                                        <strong>Name:</strong> {comment.name}
                                    </p>
                                    <p>
                                        <strong>Comment:</strong> {comment.comment}
                                    </p>
                                    <p>
                                        <strong>Rating:</strong> {comment.rating} ⭐
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="festival-details__message">No comments yet. Be the first to add one!</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FestivalDetails;
