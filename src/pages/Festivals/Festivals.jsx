import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Festivals.scss";

function Festivals() {
    const [festivals, setFestivals] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFestivals = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/festivals");
                setFestivals(response.data);
            } catch (err) {
                setError("Failed to fetch festivals");
                console.error(err);
            }
        };
        fetchFestivals();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/festivals/${id}`); 
    };

    if (error) return <div className="festival__error">{error}</div>;
    if (!festivals.length) return <div className="festival__loading">Loading...</div>;

    return (
        <section className="festival">
            <div className="festival__top">
                <h1 className="festival__top-title">Upcoming Festivals</h1>
                <h3 className="festival__top-subtitle">Festication Planning Most Favourited Festivals</h3>
            </div>
            <div className="festival__card-container">
                {festivals.map((festival) => (
                    <div
                        className="festival__card"
                        key={festival.id}
                        onClick={() => handleCardClick(festival.id)}
                    >
                        <h2 className="festival__card-title">{festival.festival_name}</h2>
                        <p className="festival__card-location">{festival.location}</p>
                        <p className="festival__card-dates">
                            Start Date: {new Date(festival.start_date).toLocaleDateString()} -{" "}
                            End Date: {new Date(festival.end_date).toLocaleDateString()}
                        </p>
                        <a
                            className="festival__card-link"
                            href={festival.webpage}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // Prevent navigation to details page
                        >
                            Official Page
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Festivals;
