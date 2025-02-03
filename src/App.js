import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import AddEventModal from "./components/AddEventModal";
import EventListModal from "./components/EventListModal";

function App() {
  const [userEvents, setUserEvents] = useState([]);
  const [holidayEvents, setHolidayEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "" });

  useEffect(() => {
    const fetchHolidays = async () => {
      const calendarId = "japanese@holiday.calendar.google.com";
      const API_KEY = "AIzaSyCQnbcKesskstueb6LmnkLdYYX5QsfVbAs"; // APIキーを設定
      if (!API_KEY) {
        console.error("APIキーが設定されていません");
        return;
      }
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("取得した祝日データ:", data.items); // デバッグ
        if (data.items) {
          const holidays = data.items.map((event) => ({
            title: event.summary || "祝日",
            start: event.start?.date || event.start?.dateTime, // ここは `date` ではなく `start` に統一
            backgroundColor: "#FFDADA", // 背景色を適用
            className: "holiday-event", // カスタムクラスを追加（必要ならCSSで設定）
          }));
          setHolidayEvents(holidays);
        }
      } catch (error) {
        console.error("祝日の取得中にエラーが発生しました:", error);
      }
    };

    fetchHolidays();
  }, []);

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      const eventDateTime = `${newEvent.date}T${newEvent.time}`;
      setUserEvents([
        ...userEvents,
        {
          title: newEvent.title,
          start: eventDateTime,
          backgroundColor: "#007bff",
        },
      ]);
      setIsModalOpen(false);
      setNewEvent({ title: "", date: "", time: "" });
    } else {
      alert("イベント名,日付,時間を入力してください");
    }
  };

  return (
    <div className="App">
      <Calendar
        events={[...userEvents, ...holidayEvents]}
        onOpenAddModal={() => {
          console.log("予定追加モーダルを開きます"); // デバッグ用
          setIsModalOpen(true);
        }}
        onOpenListModal={() => {
          console.log("予定一覧モーダルを開きます"); // デバッグ用
          setIsListModalOpen(true);
        }}
      />
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        onAddEvent={addEvent}
      />
      <EventListModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        events={userEvents}
      />
    </div>
  );
}

export default App;
