import Hero from "../../components/Hero/Hero";
import './Homepage.scss';
import { useNavigate } from "react-router-dom";


function Homepage () {
    const navigate = useNavigate();

    const handleNavigateToFestivals = () => {
        navigate("/festivals"); 
    };

    const handleNavigateToTips = () => {
        navigate("/tips"); 
    };

    return (
        <>
            <Hero/>
            <section className="homepage">
                <div className="homepage__button-container">
                    <button onClick={handleNavigateToFestivals} className="homepage__button">Upcoming Festivals</button>
                    <button onClick={handleNavigateToTips} className="homepage__button">Tips and Tricks</button>
                </div>
            </section>
  
        </>
     
    )
}

export default Homepage