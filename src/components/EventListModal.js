import React from "react";

const EventListModal = ({ isOpen, onClose, events }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>予定一覧</h2>
        <div className="event-list">
          {events.length > 0 ? (
            <ul className="event-items">
              {events.map((event, index) => (
                <li key={index} className="event-item">
                  {event.start.replace("T", " ")}: {event.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>現在予定はありません</p>
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>閉じる</button>
        </div>
      </div>
    </div>
  );
};

export default EventListModal;
