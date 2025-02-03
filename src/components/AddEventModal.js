import React from "react";
import "./AddEventModal.css"; // 🎨 CSSを読み込む

const AddEventModal = ({
  isOpen,
  onClose,
  newEvent,
  setNewEvent,
  onAddEvent,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>予定追加</h2>
        <div className="form-group">
          <label>日付:</label>
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>時間:</label>
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>予定:</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
        </div>
        <div className="modal-button">
          <button onClick={onAddEvent} className="add-btn">
            追加
          </button>
          <button onClick={onClose} className="cancel-btn">
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
