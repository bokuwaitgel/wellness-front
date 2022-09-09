import React from 'react';
import Calendar from 'react-calendar';

export const DayCont = (props) => {
  const { day, onChange } = props;
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
    <div>
      <div className="day-cont" onClick={() => setSelected(true)}>
        <div>Үзлэгийн өдөр</div>
        <div>
          {day.getMonth() + 1} сарын {day.getDate()}
        </div>
      </div>
      {selected && (
        <div className="center">
          <Calendar
            onChange={(value) => {
              handleEvent(value);
            }}
            value={day}
            minDate={currentDay}
          />
        </div>
      )}
    </div>
  );
};
