import React from "react";
import "./AddEventModal.css"; // 🎨 CSSファイルを適用

const EventListModal = ({ isOpen, onClose, events }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="back-button">
          ←
        </button>
        <h2>予定一覧</h2>
        {events.length > 0 ? (
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <div className="event-date">
                  {event.start.replace("T", " ")}
                </div>
                <div className="event-title">{event.title}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>現在予定はありません</p>
        )}
      </div>
    </div>
  );
};

export default EventListModal;
