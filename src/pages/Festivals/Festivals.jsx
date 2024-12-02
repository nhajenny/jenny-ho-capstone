import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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

    const highlightFestivalDates = ({ date, view }) => {
        if (view !== "month") return null;

        const isFestivalDate = festivals.some((festival) => {
            const startDate = new Date(festival.start_date);
            const endDate = new Date(festival.end_date);
            return date >= startDate && date <= endDate;
        });

        return isFestivalDate ? "highlight" : null;
    };

    const renderTileContent = ({ date, view }) => {
        if (view !== "month") return null;

        const festivalOnDate = festivals.find((festival) => {
            const startDate = new Date(festival.start_date);
            const endDate = new Date(festival.end_date);
            return date >= startDate && date <= endDate;
        });

        return festivalOnDate ? (
            <div className="tooltip">{festivalOnDate.festival_name}</div>
        ) : null;
    };

    if (error) return <div className="festivals__error">{error}</div>;
    if (!festivals.length) return <div className="festivals__loading">Loading...</div>;

    return (
        <section className="festivals">
            <div className="festivals__header">
                <h1 className="festivals__header-title">Upcoming Festivals</h1>
                <h3 className="festivals_header-subtitle">Festication Planning's most favorite festivals</h3>
            </div>
            <div className="festivals__calendar">
                <Calendar
                    tileClassName={highlightFestivalDates}
                    tileContent={renderTileContent}
                />
            </div>
            <div className="festivals__list">
                {festivals.map((festival) => (
                    <div
                        className="festivals__card"
                        key={festival.id}
                        onClick={() => navigate(`/festivals/${festival.id}`)}
                    >
                        <h2 className="festivals__card-title">{festival.festival_name}</h2>
                        <p className="festivals__card-location">📍 {festival.location}</p>
                        <p className="festivals__card-dates">
                            📅 {new Date(festival.start_date).toLocaleDateString()} -{" "}
                            {new Date(festival.end_date).toLocaleDateString()}
                        </p>
                        <a
                            className="festivals__card-link"
                            href={festival.webpage}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            Visit Official Page
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Festivals;
