import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "react-modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../../components/Sidebar";

const localizer = momentLocalizer(moment);

const BookAppointment = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [appointmentTitle, setAppointmentTitle] = useState("");

  // Handle slot selection
  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot({
      start: new Date(slotInfo.start),
      end: new Date(slotInfo.end),
    });
    setModalIsOpen(true);
  };

  // Handle booking an appointment
  const handleBookAppointment = () => {
    if (selectedSlot && appointmentTitle.trim() !== "") {
      const newEvent = {
        title: appointmentTitle,
        start: selectedSlot.start,
        end: selectedSlot.end,
      };
      setEvents([...events, newEvent]);
      setSelectedSlot(null);
      setModalIsOpen(false);
      setAppointmentTitle("");
    }
  };

  return (
    <>
      <div className="flex">
        <div className="h-screen fixed z-10 w-[250px]">
          <Sidebar />
        </div>

        {/* Main Section */}
        <section className="flex-1 sm:ml-[70px] lg:ml-[256px] ml-0 p-6 bg-white">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Book Appointment</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={handleSelectSlot}
              defaultView="week"
              views={["month", "week", "day"]}
              style={{ height: 600 }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: "#5770ff", // Purple accents
                  color: "white",
                  borderRadius: "5px",
                  padding: "5px",
                },
              })}
            />
          </div>
        </section>
      </div>

      {/* Modal for entering appointment title */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        ariaHideApp={false}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
          <h2 className="text-xl font-medium text-gray-800 mb-4">Enter Appointment Name</h2>
          <input
            type="text"
            value={appointmentTitle}
            onChange={(e) => setAppointmentTitle(e.target.value)}
            placeholder="Enter appointment title"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={handleBookAppointment}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
            >
              Book Appointment
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookAppointment;
