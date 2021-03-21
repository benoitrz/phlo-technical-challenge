import axios from "axios";
import { useState } from "react";

const BookingConfirmation = ({ doctor, details }) => {
  const [resentEmail, setResentEmail] = useState(false);
  const [sending, setSending] = useState(false);

  const sendEmail = async () => {
    setSending(true);
    await axios.post(`/confirmations?appointmentId=${details.id}`);
    setSending(false);
    setResentEmail(true);
  };

  return (
    <div className="confirmation">
      <h2>Appointment booked</h2>
      <p>Thanks, you've made a booking with...</p>
      <h3>{doctor.name}</h3>
      <h3>{details.dateTime.toLocaleString()}</h3>
      <h3>{doctor.vicinity}</h3>
      <p>
        We've sent a booking confirmation to the email to the email address you
        provided.
      </p>
      {resentEmail ? (
        <h3>An email confirmation has been sent to your inbox!</h3>
      ) : (
        <div>
          <p>Didn't receive an email?</p>
          <button onClick={sendEmail} className="main-button">
            {sending ? (
              <span>Sending email...</span>
            ) : (
              <span>Resend email</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;
