import React from 'react';
import Calendar from 'react-calendar';
import { stateDefinitions } from '../../constants/calendar';
import 'react-calendar/dist/Calendar.css';
//import styled from 'styled-components';
//const CalendarContainer = styled.div``;

export const DayCont = (props) => {
  const { day, onChange, check = true } = props;
  const currentDay = new Date();
  const [selected, setSelected] = React.useState(false);
  //const today = new Date();
  // const limit = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
  // const data = day.getMonth() + 1 + '/' + day.getDate() + ' ';
  const handleEvent = (value) => {
    onChange(value);
    setSelected(false);
  };
  return (
    <div className="px-2">
      <div className="day-cont box-content" onClick={() => setSelected(true)}>
        <div className="w-1/2">Үзлэгийн өдөр</div>
        <div className="w-1/2">
          {day.getMonth() + 1} сарын {day.getDate()}
        </div>
      </div>
      {selected && (
        <div className="center">
          <Calendar
            stateDefinitions={stateDefinitions}
            onChange={(value) => {
              handleEvent(value);
            }}
            value={day}
            minDate={check ? currentDay : null}
          />
        </div>
      )}
    </div>
  );
};