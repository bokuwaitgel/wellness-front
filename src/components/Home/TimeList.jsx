import React, { useEffect } from 'react';
import { findDate } from '../../api/amitaApi';

function timeConvertor(time) {
  if (!time) return 0;
  const [hours, minutes, seconds] = time.split(':');
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
}
function RevereseTimeConvertor(time) {
  return (
    parseInt(time / 3600).toString() +
    ':' +
    (parseInt((time % 3600) / 60) < 10 ? '0' : '') +
    parseInt((time % 3600) / 60).toString()
  );
}

export const TimeList = (props) => {
  const [time, setTime] = React.useState([]);
  const initialState = [];
  const { rule, selected, setSelected, day } = props;
  const today = new Date();
  const limit = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
  const data = day.getMonth() + 1 + '/' + day.getDate() + ' ';
  const resetState = () => {
    setTime(initialState);
  };
  const FetchTime = () => {
    resetState();
    const start = timeConvertor(rule[0]?.start);
    const end = timeConvertor(rule[0]?.end);
    const delay = timeConvertor(rule[0]?.delay);
    for (let s = start; s < end; s += delay) {
      if (today.getDate() === day.getDate()) {
        if (s > limit) {
          findDate(data + RevereseTimeConvertor(s)).then((result) => {
            !result &&
              setTime((existingItems) => {
                return [...existingItems, s];
              });
          });
        }
      } else {
        findDate(data + RevereseTimeConvertor(s)).then((result) => {
          !result &&
            setTime((existingItems) => {
              return [...existingItems, s];
            });
        });
      }
    }
  };

  useEffect(() => {
    if (rule) {
      FetchTime();
    }
  }, [rule, day]);
  return (
    <div>
      <div className="text-left  ml-5">Боломжит цагууд</div>
      <div className="grid grid-cols-3 grid-flow-row gap-4 place-items-center">
        {time.map((t, idx) => {
          const converted = RevereseTimeConvertor(t);
          const check = selected === converted;
          return (
            <div
              key={parseInt(idx) + 1}
              onClick={() => (check ? setSelected(null) : setSelected(converted))}
              className={check ? 'selected-time-button' : 'time-button'}>
              {converted}
            </div>
          );
        })}
      </div>
    </div>
  );
};
