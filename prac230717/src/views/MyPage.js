import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import '../views/CSS/mypage.css';
import Pentagon from './Pentagon'; // Pentagon 컴포넌트 import

const MyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>My Page</h1>
      <h2>Calendar</h2>
      <Calendar
        onChange={handleDateSelection}
        value={selectedDate}
        tileClassName="custom-calendar-tile"
      />
      <h2>Exercise Types</h2>
      
      {/* Pentagon 컴포넌트 사용 */}
      <div>
        <Pentagon>
            </Pentagon>
      </div>
    </div>
  );
};

export default MyPage;
