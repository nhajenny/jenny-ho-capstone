import { useState } from "react";
import cancelIcon from '../../assets/cancel_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import './AddCommentModal.scss';

function AddCommentModal({ onClose, onAddComment }) {
    const [formData, setFormData] = useState({ name: "", comment: "", rating: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = "";
        if (name === "name" && value.trim().length < 3) {
            error = "Name must be at least 3 characters.";
        } else if (name === "comment" && value.trim().length < 10) {
            error = "Comment must be at least 10 characters.";
        } else if (name === "rating") {
            const ratingNum = parseFloat(value);
            if (!value || isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
                error = "Rating must be a number between 1 and 5.";
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error || undefined,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (formData.name.trim().length < 3) {
            newErrors.name = "Name must be at least 3 characters.";
        }
        if (formData.comment.trim().length < 10) {
            newErrors.comment = "Comment must be at least 10 characters.";
        }
        const ratingNum = parseFloat(formData.rating);
        if (!formData.rating || isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
            newErrors.rating = "Rating must be a number between 1 and 5.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onAddComment({ ...formData, created_at: new Date().toISOString() }); 
            onClose(); 
            setFormData({ name: "", comment: "", rating: "" }); 
        }
    };

    const isFormValid =
        Object.keys(errors).every((key) => !errors[key]) &&
        Object.values(formData).every((value) => value.trim());

    return (
        <div className="comment-modal">
            <div className="comment-modal__content">
                <button className="comment-modal__close" onClick={onClose}>
                    <img src={cancelIcon} alt="Cancel button" />
                </button>
                <h2 className="comment-modal__title">Add a Comment</h2>
                <form className="comment-modal__form" onSubmit={handleSubmit}>
                    <label className="comment-modal__label">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <p className="comment-modal__error">{errors.name}</p>}
                    </label>
                    <label className="comment-modal__label">
                        Comment:
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            required
                        />
                        {errors.comment && <p className="comment-modal__error">{errors.comment}</p>}
                    </label>
                    <label className="comment-modal__label">
                        Rating:
                        <input
                            type="number"
                            name="rating"
                            min="1"
                            max="5"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                        />
                        {errors.rating && <p className="comment-modal__error">{errors.rating}</p>}
                    </label>
                    <button
                        className="comment-modal__button"
                        type="submit"
                        disabled={!isFormValid}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddCommentModal;
