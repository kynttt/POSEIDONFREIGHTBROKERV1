import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';

type CalendarProps = {
  value?: string;
  onChange?: (date: string) => void;
  className?: string;
};

const Calendar: React.FC<CalendarProps> = ({ value, onChange, className }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(value ? dayjs(value) : null);

  useEffect(() => {
    if (value) {
      setSelectedDate(dayjs(value));
    }
  }, [value]);

  const today = dayjs();
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDayOfWeek = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const daysArray = Array.from({ length: 42 }, (_, index) => {
    const day = index - startDayOfWeek + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const handleDateClick = (day: number | null) => {
    if (day !== null) {
      const selected = dayjs(new Date(currentDate.year(), currentDate.month(), day));
      setSelectedDate(selected);
      if (onChange) {
        onChange(selected.format('YYYY-MM-DD'));
      }
    }
  };

  const isSameDay = (date1: Dayjs, date2: Dayjs) => {
    return date1.isSame(date2, 'day');
  };

  return (
    <div className={`w-full text-primary max-w-md mx-auto bg-white shadow-lg rounded-lg ${className}`}>
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}
          className="text-gray-600 hover:text-gray-900"
        >
          &lt;
        </button>
        <div className="text-lg font-semibold">
          {currentDate.format('MMMM YYYY')}
        </div>
        <button
          onClick={() => setCurrentDate(currentDate.add(1, 'month'))}
          className="text-gray-600 hover:text-gray-900"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 p-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="text-center font-bold text-gray-600">
            {day}
          </div>
        ))}
        {daysArray.map((day, index) => (
          <div
            key={index}
            className={`text-center p-2 rounded-full cursor-pointer text-secondary ${
              day ? 
                isSameDay(dayjs(new Date(currentDate.year(), currentDate.month(), day)), today) ? 'bg-secondary text-white' :
                (selectedDate && isSameDay(dayjs(new Date(currentDate.year(), currentDate.month(), day)), selectedDate) ? 'bg-primary text-white' : 'hover:bg-blue-200 text-gray-700') 
              : 'bg-gray-100 cursor-default'
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
