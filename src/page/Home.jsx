import React, { useEffect } from 'react';

import { Head } from '../components/Head';
import { TimeList } from '../components/Home/TimeList';
import { DayCont } from '../components/Home/DayCont';
import { CompanyInfo } from '../components/Home/CompanyInfo';
import { CompanyHeader } from '../components/Home/CompanyHeader';
import { insertOrder, FetchTimeRule } from '../api/amitaApi';
//import { ButtonMain } from '../components/Buttons/Button';
//import { Link } from 'react-router-dom';
//import clsx from 'clsx';
function timeConvertor(time) {
  if (!time) return 0;
  const [hours, minutes, seconds] = time.split(':');
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
}

export const Home = () => {
  const [day, setDay] = React.useState(new Date());
  const [time, setTime] = React.useState(null);
  const [timeList, setTimeList] = React.useState([]);
  //const [orderList, setOrderList] = React.useState([]);

  useEffect(() => {
    FetchTimeRule().then((res) => {
      const start = timeConvertor(res[0]?.start);
      const end = timeConvertor(res[0]?.end);
      const delay = timeConvertor(res[0]?.delay);
      for (let s = start; s < end; s += delay) {
        setTimeList((i) => [...i, s]);
      }
    });
  }, []);

  const saveOrder = () => {
    console.log('test', time);

    if (time !== null) {
      const date = day.getMonth() + 1 + '/' + day.getDate();
      insertOrder(date, time)
        .then((res) => alert(res))
        .catch((err) => alert(err));
    } else alert('choose time');
  };
  return (
    <>
      <Head title="Home" description="hello" />
      <div className="flex-col text-center">
        <div className="inline self-center">
          <CompanyHeader />
        </div>
        <form>
          <div>
            <DayCont day={day} onChange={setDay} timeList={timeList} />
          </div>
          <div>
            <TimeList selected={time} setSelected={setTime} day={day} time={timeList} />
          </div>
          <div className="center">
            <div className="button mt-5" onClick={() => saveOrder()}>
              Захиалах
            </div>
          </div>
        </form>

        <div>
          <CompanyInfo />
        </div>
      </div>
    </>
  );
};
