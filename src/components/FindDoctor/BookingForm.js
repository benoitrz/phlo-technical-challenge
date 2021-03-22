import { useState } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";

const BookingForm = ({ doctor, submit }) => {
  const [dateTime, setDateTime] = useState(new Date());
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [nhsNumber, setNhsNumber] = useState("");
  const [makeBooking, setMakeBooking] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMakeBooking(true);
    const response = await axios.post("/appointments", {
      dateTime,
      name,
      address,
      nhsNumber,
    });
    setMakeBooking(false);
    submit({
      dateTime,
      name,
      address,
      nhsNumber,
      id: response.data.id,
    });
  };

  return (
    <div className="booking-modal">
      <div className="modal-panel">
        <h2>Book an appointment</h2>
        <p>Booking with...</p>
        <h3>{doctor.name}</h3>
        <p>{doctor.vicinity}</p>
        {doctor.rating && (
          <p>
            {doctor.rating} &#9733; ({doctor.user_ratings_total} ratings)
          </p>
        )}
      </div>
      <form className="appointment-form modal-panel" onSubmit={handleSubmit}>
        <p>Please fill out the form below to create your appointment</p>
        <div className="form-group">
          <label className="form-label">Select a day and timeslot:</label>
          <DateTimePicker
            onChange={setDateTime}
            value={dateTime}
            required={true}
            className="date-time-picker-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            Full name
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Email address
            <input
              type="text"
              placeholder="Enter your email address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            NHS Number (optional)
            <input
              type="number"
              placeholder="This is the 10-digit number unique to you"
              value={nhsNumber}
              min="1000000000"
              max="9999999999"
              step="1"
              onChange={(e) => setNhsNumber(e.target.value)}
              className="form-input"
            />
          </label>
        </div>
        {makeBooking ? (
          <input
            type="submit"
            value="Booking your appointment..."
            className="submit main-button loading"
          />
        ) : (
          <input
            type="submit"
            value="Book Appointment"
            disabled={!name || !address}
            className="submit main-button"
          />
        )}
      </form>
    </div>
  );
};

export default BookingForm;
