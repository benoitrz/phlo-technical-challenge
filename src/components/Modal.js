import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import BookingConfirmation from './BookingConfirmation';
import BookingForm from './BookingForm';

const Modal = ({ show, doctor, onClose }) => {
  const [hasBooked, setHasBooked] = useState(false);

  if (!show) return null;
  return createPortal(
    <div className="modal">
      <div className="modal-content">
        {hasBooked ? (
          <BookingConfirmation doctor={doctor}></BookingConfirmation>
        ) : (
          <BookingForm
            doctor={doctor}
            submit={() => setHasBooked(true)}
          ></BookingForm>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
