import React, { useEffect } from 'react';

import { findDate } from '../../../api/amitaApi';
function RevereseTimeConvertor(time) {
  return (
    parseInt(time / 3600).toString() +
    ':' +
    (parseInt((time % 3600) / 60) < 10 ? '0' : '') +
    parseInt((time % 3600) / 60).toString()
  );
}

export const TimeList = (props) => {
  const { day, time, selected, setSelected } = props || {};
  const data = day.getMonth() + 1 + '/' + day.getDate();
  const currentDay = new Date();
  const limit =
    currentDay.getHours() * 3600 + currentDay.getMinutes() * 60 + currentDay.getSeconds();
  const today = currentDay.getDate() === day.getDate();
  const [orderList, setOrderList] = React.useState([]);
  const [filteredTime, setFilteredTime] = React.useState(time);

  useEffect(() => {
    findDate(data).then((res) => {
      setOrderList(res);
    });
  }, [day]);
  const findTime = (hour) => {
    const t = orderList.find((data) => data.hour === hour);
    if (t) return false;
    return true;
  };

  useEffect(() => {
    setFilteredTime(
      time.filter((d) => findTime(RevereseTimeConvertor(d)) && (today ? limit < d : true))
    );
  }, [orderList]);

  return (
    <div className="px-8">
      <div className="text-left  ml-5">Боломжит цагууд</div>
      <div className="pt-4 grid grid-cols-3 grid-flow-row gap-4 place-items-center">
        {filteredTime?.map((t, idx) => {
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
