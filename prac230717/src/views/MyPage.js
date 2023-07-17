import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../views/CSS/mypage.css';
import Pentagon from './Pentagon'; // Pentagon 컴포넌트 import

const MyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };
  const handleDateChange = (date) => {
    console.log('Selected Date:', date);
  };
  return (
    <div>
      <h1>My Page: JooHyeong</h1>
      <h2>Calendar</h2>
      <Calendar
        onChange={handleDateSelection}
        value={selectedDate}
        tileClassName="custom-calendar-tile"
      />

      {/* Pentagon 컴포넌트 사용 */}
      <h2>Exercise Types</h2>
      <Pentagon />

    
    </div>
  );
};

export default MyPage;
