import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";

const Calendar = ({ events, onOpenAddModal, onOpenListModal }) => {
  return (
    <FullCalendar
      events={events}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev title next",
        right: "customAddEvent customViewEvents",
      }}
      customButtons={{
        customAddEvent: {
          text: "追加",
          click: onOpenAddModal,
        },
        customViewEvents: {
          text: "予定一覧",
          click: onOpenListModal,
        },
      }}
      locales={[jaLocale]}
      locale="ja"
      dayMaxEventRows={5}
      // eventDidMount={(info) => {
      //   // 通常のイベントの背景色を適用
      //   const bgColor = info.event.extendedProps?.backgroundColor || "#007bff";
      //   info.el.style.backgroundColor = bgColor;
      // }}
      dayCellDidMount={(info) => {
        const date = info.date;
        const day = date.getDay(); // 0: 日曜, 6: 土曜
        const formattedDate = info.date
          .toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "-");

        // 祝日リストにその日が含まれていたら背景色を変更
        if (
          events.some(
            (event) =>
              event.start === formattedDate &&
              event.backgroundColor === "#FFDADA"
          )
        ) {
          info.el.style.backgroundColor = "#FFDADA"; // 祝日の背景色、あとで変更
        }

        // 土曜日は薄い青、日曜日は薄い赤
        if (day === 6) {
          info.el.style.backgroundColor = "#E0F7FA"; // 土曜の背景色（薄い水色）
        } else if (day === 0) {
          info.el.style.backgroundColor = "#FFDADA"; // 日曜の背景色（薄い赤）
        }
      }}
    />
  );
};

export default Calendar;
