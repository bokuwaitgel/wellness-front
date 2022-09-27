import React, { useEffect } from 'react';

import { calendarList } from '../../../api/amitaApi';
import { RotatingLines } from 'react-loader-spinner';
function RevereseTimeConvertor(time) {
  return (
    (parseInt(time / 3600).toString() < 10 ? '0' : '') +
    parseInt(time / 3600).toString() +
    ':' +
    (parseInt((time % 3600) / 60) < 10 ? '0' : '') +
    parseInt((time % 3600) / 60).toString()
  );
}
function timeConvertor(time) {
  if (!time) return 0;
  const [hours, minutes, seconds] = time.split(':');
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
}
function gTimeConcertor(time) {
  if (!time) return 0;
  const tmp = time.split('T');
  const res = tmp[1].split('+');
  return timeConvertor(res[0]);
}

export const TimeList = (props) => {
  const {
    day,
    time,
    selected,
    setSelected,
    start,
    end,
    delay,
    calendarData,
    setCalendarData,
    loader = true,
    setLoader
  } = props || {};

  useEffect(() => {
    const st = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const ed = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const hm = start.split(':');
    const dl = end.split(':');
    st.setHours(parseInt(hm[0]));
    ed.setHours(parseInt(dl[0]));
    st.setMinutes(parseInt(hm[1]));
    ed.setMinutes(parseInt(dl[1]));
    calendarList(st, ed).then((res) => setCalendarData(res));
  }, [day]);
  console.log(setLoader);
  const currentDay = new Date();
  const limit =
    currentDay.getHours() * 3600 + currentDay.getMinutes() * 60 + currentDay.getSeconds();
  const today = currentDay.getDate() === day.getDate();
  const [filteredTime, setFilteredTime] = React.useState(
    time.filter(
      (data) => findTime(data, data + timeConvertor(delay)) && (today ? limit < data : true)
    )
  );

  useEffect(() => {
    setFilteredTime(
      time.filter(
        (data) => findTime(data, data + timeConvertor(delay)) && (today ? limit < data : true)
      )
    );
    setLoader(false);
  }, [calendarData]);

  function findTime(Start, End) {
    for (let i = 0; i < calendarData.length; i++) {
      const data = calendarData[i];
      const s = gTimeConcertor(data.start.dateTime),
        e = gTimeConcertor(data.end.dateTime);
      if (s === Start && e === End) return false;
      if (s < Start && e > End) return false;
      if (s < Start && e > Start) return false;
      if (s < End && e > End) return false;
      if (s > Start && e < End) return false;
    }
    return true;
  }
  return (
    <div className="px-8">
      <div className="text-left  ml-5">Боломжит цагууд</div>
      <div className="pt-4 grid grid-cols-3 grid-flow-row gap-4 place-items-center">
        {loader ? (
          <div className="col-span-full center">
            <RotatingLines
              strokeColor="green"
              strokeWidth="5"
              animationDuration="0.50"
              width="100"
              visible={true}
            />
          </div>
        ) : filteredTime.length > 0 && !(day.getDay() == 0 || day.getDay() == 6) ? (
          filteredTime.map((t, idx) => {
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
          })
        ) : (
          <div className="col-span-full time-button">Боломжит цаг байхгүй байна</div>
        )}
      </div>
      <div className="text-left text-xs p-5">
        Жич:
        <br />
        1. Таны захиалсан цаг төлбөр төлж баталгаажсан тохиолдолд цагаасаа хоцрох болон цаг цуцлахад
        буцааж олгогдохгүйг анхаарна уу! <br />
        2. Захиалсан цагаас 1-3 минут хоцорсон тохиолдолд оношилгоо болон бусад үйлчилгээ авах
        боломжгүй болохыг анхаарна уу!
      </div>
    </div>
  );
};
