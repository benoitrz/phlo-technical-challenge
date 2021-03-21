const DoctorPopupTemplate = ({ place, onButtonClick }) => {
  return (
    <div className="popup-template">
      <h2>{place.name}</h2>
      <p>{place.vicinity}</p>
      {place.rating && (
        <p>
          {place.rating} &#9733; ({place.user_ratings_total} ratings)
        </p>
      )}
      <button onClick={() => onButtonClick()} className="main-button">
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorPopupTemplate;
