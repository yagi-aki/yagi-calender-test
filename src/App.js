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
  const [calendarKey, setCalendarKey] = useState(0); // 再描画用のキー

  useEffect(() => {
    const fetchHolidays = async () => {
      const calendarId = "japanese@holiday.calendar.google.com";
      const API_KEY = "AIzaSyCQnbcKesskstueb6LmnkLdYYX5QsfVbAs"; // APIキーを設定
      if (!API_KEY) {
        console.error("APIキーが設定されていません");
        return;
      }
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}&hl=ja`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("取得した祝日データ:", data.items); // デバッグ
        console.log(data);
        if (data.items) {
          const holidayTranslations = {
            "New Year's Day": "元日",
            "January 1 Bank Holiday": " ",
            "January 2 Bank Holiday": " ",
            "January 3 Bank Holiday": " ",
            "December 31 Bank Holiday": "大晦日",
            "Coming of Age Day": "成人の日",
            "National Foundation Day": "建国記念の日",
            "Emperor's Birthday observed": "振り返り休日",
            "Dolls' Festival/Girls' Festival": "ひな祭り",
            "Spring Equinox": "春分の日",
            "Shōwa Day": "昭和の日",
            "Constitution Memorial Day": "憲法記念日",
            "Greenery Day": "みどりの日",
            "Children's Day": "こどもの日",
            "Greenery Day observed": "振り返り休日",
            "Mother's Day": "母の日",
            "Star Festival": "七夕",
            "Sea Day": "海の日",
            "Mountain Day": "山の日",
            "Respect for the Aged Day": "敬老の日",
            "Autumn Equinox": "秋分の日",
            "Sports Day": "体育の日",
            "Culture Day": "文化の日",
            "7-5-3 Day": "七五三",
            "Labor Thanksgiving Day": "勤労感謝の日",
            "Labor Thanksgiving Day observed": "振り返り休日",
            "Emperor's Birthday": "天皇誕生日",
          };
          const holidays = data.items.map((event) => ({
            title: holidayTranslations[event.summary] || event.summary, // 日本語があれば変換
            start: event.start?.date || event.start?.dateTime, // ここは `date` ではなく `start` に統一
            display: "background", // ここで背景イベントにする！
            backgroundColor: "#FFDADA", // 祝日の背景をピンクにする
            className: "holiday-event", // カスタムクラスを追加（必要ならCSSで設定）
          }));
          console.log("変換後の祝日イベント", holidays); // ここで確認！

          setHolidayEvents(holidays);
          console.log("祝日データが更新されました:", holidays);
        }
      } catch (error) {
        console.error("祝日の取得中にエラーが発生しました:", error);
      }
    };

    fetchHolidays();
  }, []);

  // holidayEvents が更新されたら、カレンダーを再描画する
  useEffect(() => {
    setCalendarKey((prevKey) => prevKey + 1);
  }, [holidayEvents]);

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
        key={calendarKey} // 変更: カレンダーを強制的に再描画
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
