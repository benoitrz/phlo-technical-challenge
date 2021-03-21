import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useVisible from "../../hooks/useVisible";
import BookingConfirmation from "./BookingConfirmation";
import BookingForm from "./BookingForm";
import "./Modal.css";

const Modal = ({ show, doctor, onClose }) => {
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [hasBooked, setHasBooked] = useState(false);
  const { ref, isVisible } = useVisible(show);

  const bookedAppointment = (details) => {
    setAppointmentDetails(details);
    setHasBooked(true);
  };

  useEffect(() => {
    if (!isVisible) onClose();
    else return null;
  }, [isVisible, onClose]);

  if (!show) return null;
  return createPortal(
    <div className="modal">
      <div className="modal-content" ref={ref}>
        {hasBooked ? (
          <BookingConfirmation
            doctor={doctor}
            details={appointmentDetails}
          ></BookingConfirmation>
        ) : (
          <BookingForm doctor={doctor} submit={bookedAppointment}></BookingForm>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
