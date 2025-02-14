import { useEffect, useState } from "react";
import {
  createCalendar,
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from "@schedule-x/calendar";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import "@schedule-x/theme-default/dist/index.css";
import "./appcss.css";
import Sidebar from "../../components/Sidebar";

const BookAppointment = () => {
  const [calendar, setCalendar] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const newCalendar = createCalendar({
      views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
      selectedDate: "2025-02-14", // Set default selected date
      defaultView: viewWeek.name,
      events: [
        {
          id: "1",
          title: "Bone Appointment",
          start: "2025-02-16",
          end: "2025-02-21",
        },
        {
          id: "2",
          title: "Heart Appointment",
          start: "2025-02-16",
          end: "2025-02-16",
        },
      ],
      plugins: [
        createDragAndDropPlugin(),
        createEventModalPlugin({
          onEventClick: (event) => {
            setSelectedEvent(event);
            setIsModalOpen(true);
          },
        }),
      ],
    });

    setCalendar(newCalendar);

    const calendarEl = document.getElementById("calendar");
    if (calendarEl) newCalendar.render(calendarEl);

    return () => {
      newCalendar.destroy();
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="h-screen w-[250px] fixed z-10">
        <Sidebar />
      </div>

      {/* Calendar */}
      <div className="flex-grow ml-[250px] p-4">
        <div id="calendar" className="bg-white shadow-md rounded-lg p-4" />
      </div>

      {/* Event Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
            <p>
              <strong>Start:</strong> {selectedEvent.start}
            </p>
            <p>
              <strong>End:</strong> {selectedEvent.end}
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
