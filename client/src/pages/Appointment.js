import React, { useState } from 'react';
import moment from 'moment';
import './Calendar.css';

const Appointment = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [events, setEvents] = useState({});

  const startOfMonth = currentMonth.clone().startOf('month').startOf('week');
  const endOfMonth = currentMonth.clone().endOf('month').endOf('week');

  const addEvent = (date) => {
    const title = prompt('Enter event title:');
    if (title) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setEvents((prevEvents) => ({
        ...prevEvents,
        [formattedDate]: [...(prevEvents[formattedDate] || []), title],
      }));
    }
  };

  const days = [];
  let day = startOfMonth.clone();
  while (day.isBefore(endOfMonth, 'day')) {
    const week = Array(7)
      .fill(0)
      .map(() => day.add(1, 'day').clone());
    days.push(week);
  }

  const renderEvents = (day) => {
    const formattedDate = moment(day).format('YYYY-MM-DD');
    return events[formattedDate]?.map((event, index) => (
      <div key={index} className="event">{event}</div>
    ));
  };

  return (
    <div className="scheduler-container">
      {/* Left Side: Events and Modern Small Calendar */}
      <div className="left-panel">
        <div className="events-list">
          <h3>Events on {selectedDate.format('MMMM Do, YYYY')}</h3>
          <ul>
            {events[selectedDate.format('YYYY-MM-DD')]?.map((event, index) => (
              <li key={index}>{event}</li>
            )) || <p>No events for this date.</p>}
          </ul>
        </div>

        {/* Small Calendar with Modern Design */}
        <div className="small-calendar">
          <div className="calendar-header">
            <button onClick={() => setCurrentMonth(currentMonth.clone().subtract(1, 'month'))}>
              {'<'}
            </button>
            <span>{currentMonth.format('MMMM YYYY')}</span>
            <button onClick={() => setCurrentMonth(currentMonth.clone().add(1, 'month'))}>
              {'>'}
            </button>
          </div>
          <div className="calendar-grid">
            {days.map((week, i) => (
              <div key={i} className="calendar-week">
                {week.map((day, idx) => (
                  <div
                    key={idx}
                    className={`calendar-day ${day.isSame(selectedDate, 'day') ? 'selected' : ''} ${day.isSame(moment(), 'day') ? 'today' : ''}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="day-number">{day.format('D')}</div>
                    <div className="events">{renderEvents(day)}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Full Month Scheduler */}
      <div className="right-panel">
        <header className="month-header">
          <button onClick={() => setCurrentMonth(currentMonth.clone().subtract(1, 'month'))}>
            {'<'}
          </button>
          <h2>{currentMonth.format('MMMM YYYY')}</h2>
          <button onClick={() => setCurrentMonth(currentMonth.clone().add(1, 'month'))}>
            {'>'}
          </button>
        </header>

        <div className="calendar-grid">
          <div className="calendar-days">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div className="calendar-day-header" key={d}>{d}</div>
            ))}
          </div>

          {days.map((week, i) => (
            <div className="calendar-week" key={i}>
              {week.map((day, idx) => (
                <div
                  key={idx}
                  className={`calendar-day ${day.isSame(selectedDate, 'day') ? 'selected' : ''}`}
                  onClick={() => addEvent(day)}
                >
                  <div className="day-number">{day.format('D')}</div>
                  <div className="events">{renderEvents(day)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
