import { useEffect, useState } from "react";
import axios from "axios";
import "./TipsPage.scss";
import pencilIcon from '../../assets/edit_note_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';

function TipsPage() {
    const [tips, setTips] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/tips");
                setTips(response.data);
            } catch (err) {
                setError("Failed to fetch tips");
                console.error(err);
            }
        };
        fetchTips();
    }, []);

    if (error) return <div className="tips__error">{error}</div>;
    if (!tips.length) return <div className="tips__loading">Loading...</div>;

    return (
        <section className="tips">
            <div className="tips__top-container">
                <h1 className="tips__top-title">TIPS AND TRICKS 🥰</h1>
                <div className="tips__top-add">
                    <button className="tips__top-add-button"> 
                        <img 
                            className="tips__top-add-icon"
                            src={pencilIcon}
                        />
                        Add your tips!</button>
                </div>
            </div>
            
            <div className="tips__card-container">
                {tips.map((tip) => (
                    <div className="tips__card" key={tip.id}>
                        <h2 className="tips__card-author"> {tip.name}</h2>
                        <h3 className="tips__card-title">{tip.festival_name}</h3>
                        <p className="tips__card-text">{tip.tip}</p>
                        <p className="tips__card-year">Years Attended: {tip.year_attended}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default TipsPage;
