import React from 'react';
import Calendar from 'react-calendar';

export const DayCont = (props) => {
  const { day, onChange } = props;
  const currentDay = new Date();
  const [selected, setSelected] = React.useState(false);
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
              onChange(value);
              setSelected(false);
            }}
            value={day}
            minDate={currentDay}
          />
        </div>
      )}
    </div>
  );
};
