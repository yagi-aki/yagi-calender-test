import React from "react";

const EventListModal = ({ isOpen, onClose, events }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>予定一覧</h2>
        {events.length > 0 ? (
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                {event.start.replace("T", " ")}: {event.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>現在予定はありません</p>
        )}
        <div className="modal-buttons">
          <button onClick={onClose}>閉じる</button>
        </div>
      </div>
    </div>
  );
};

export default EventListModal;
