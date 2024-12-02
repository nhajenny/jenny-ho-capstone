import React, { useState } from "react";
import axios from "axios";
import "./AddTipsModal.scss";
import cancelIcon from "../../assets/cancel_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

function AddTipsModal({ isOpen, onClose, festivals, onSuccess }) {
  const [formData, setFormData] = useState({
    festival_id: "",
    name: "",
    tip: "",
    year_attended: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "festival_id" && !value) {
      error = "Please select a festival.";
    } else if (name === "name" && value.trim().length < 3) {
      error = "Name must be at least 3 characters.";
    } else if (
      name === "year_attended" &&
      !/^\d{4}(,\s*\d{4})*$/.test(value.trim())
    ) {
      error = "Enter years as 4-digit numbers separated by commas (e.g., 2022, 2023).";
    } else if (name === "tip" && value.trim().length < 10) {
      error = "Tip must be at least 10 characters long.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    const isValid = validateForm();
    if (!isValid) {
      console.log("Form validation failed", errors);
      return;
    }

    try {
      console.log("Submitting data...");
      const response = await axios.post("http://localhost:8080/api/tips", formData);
      console.log("Data submitted successfully:", response.data);
      onSuccess(); // Refresh the tips list in parent
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding tip:", error);
      alert("Failed to add tip. Please try again.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.festival_id) newErrors.festival_id = "Please select a festival.";
    if (!formData.name || formData.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    if (
      !formData.year_attended ||
      !/^\d{4}(,\s*\d{4})*$/.test(formData.year_attended.trim())
    )
      newErrors.year_attended =
        "Enter years as 4-digit numbers separated by commas (e.g., 2022, 2023).";
    if (!formData.tip || formData.tip.trim().length < 10)
      newErrors.tip = "Tip must be at least 10 characters long.";

    setErrors(newErrors);
    console.log("Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <img src={cancelIcon} alt="Close modal" />
        </button>
        <h2 className="modal__title">Add Your Tip</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Festival:
            <select
              name="festival_id"
              value={formData.festival_id}
              onChange={handleChange}
              required
              className="modal__input"
            >
              <option value="" disabled>
                Select a Festival
              </option>
              {festivals.map((festival) => (
                <option key={festival.id} value={festival.id}>
                  {festival.festival_name}
                </option>
              ))}
            </select>
            {errors.festival_id && <p className="modal__error">{errors.festival_id}</p>}
          </label>

          <label className="modal__label">
            Your Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="modal__input"
            />
            {errors.name && <p className="modal__error">{errors.name}</p>}
          </label>

          <label className="modal__label">
            Your Tip:
            <textarea
              name="tip"
              value={formData.tip}
              onChange={handleChange}
              required
              className="modal__textarea"
            />
            {errors.tip && <p className="modal__error">{errors.tip}</p>}
          </label>
          <label className="modal__label">
            Year Attended:
            <input
              type="text"
              name="year_attended"
              value={formData.year_attended}
              onChange={handleChange}
              required
              className="modal__input"
            />
            {errors.year_attended && (
              <p className="modal__error">{errors.year_attended}</p>
            )}
          </label>

          <button
            type="submit"
            className="modal__button"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTipsModal;
