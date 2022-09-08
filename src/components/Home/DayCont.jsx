import React, { useEffect } from 'react';
import Calendar from 'react-calendar';

//import { findDate } from '../../api/amitaApi';

function timeConvertor(time) {
  if (!time) return 0;
  const [hours, minutes, seconds] = time.split(':');
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
}
// function RevereseTimeConvertor(time) {
//   return (
//     parseInt(time / 3600).toString() +
//     ':' +
//     (parseInt((time % 3600) / 60) < 10 ? '0' : '') +
//     parseInt((time % 3600) / 60).toString()
//   );
// }
export const DayCont = (props) => {
  const { rule, day, onChange, setTimeList } = props;
  const currentDay = new Date();
  const [selected, setSelected] = React.useState(false);
  //const today = new Date();
  // const limit = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
  // const data = day.getMonth() + 1 + '/' + day.getDate() + ' ';
  useEffect(() => {
    const start = timeConvertor(rule[0]?.start);
    const end = timeConvertor(rule[0]?.end);
    const delay = timeConvertor(rule[0]?.delay);
    const res = [];
    for (let s = start; s < end; s += delay) {
      res.push(s);
    }
    console.log(res);
    setTimeList(res);
  }, []);
  const handleEvent = (value) => {
    onChange(value);
    setSelected(false);
    const start = timeConvertor(rule[0]?.start);
    const end = timeConvertor(rule[0]?.end);
    const delay = timeConvertor(rule[0]?.delay);
    const res = [];
    for (let s = start; s < end; s += delay) {
      res.push(s);
    }
    setTimeList(res);
    console.log(res);
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
