import React, { useEffect } from 'react';

import { Head } from '../components/Head';
import Navbar from '../components/sidebars/Navbar';
import { TimeList } from '../components/Home/time/TimeList';
import { DayCont } from '../components/Home/time/DayCont';
import { Order } from '../components/Home/buttons/Order';
import { FetchTimeRule } from '../api/amitaApi';

function timeConvertor(time) {
  if (!time) return 0;
  const [hours, minutes, seconds] = time.split(':');
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
}

export const DayCancel = () => {
  const [day, setDay] = React.useState(new Date());
  const [time, setTime] = React.useState(null);
  const [timeList, setTimeList] = React.useState([]);
  //const [orderList, setOrderList] = React.useState([]);

  useEffect(() => {
    if (timeList.length === 0) {
      FetchTimeRule().then((res) => {
        const start = timeConvertor(res[0]?.start);
        const end = timeConvertor(res[0]?.end);
        const delay = timeConvertor(res[0]?.delay);
        for (let s = start; s < end; s += delay) {
          setTimeList((i) => [...i, s]);
        }
      });
    }
  }, []);

  return (
    <>
      <Head title="Day" description="hello" />
      <Navbar />
      <div className="flex-col text-center">
        <form>
          <div>
            <DayCont day={day} onChange={setDay} timeList={timeList} />
          </div>
          <div>
            <TimeList selected={time} setSelected={setTime} day={day} time={timeList} />
          </div>
          <div className="center text-center">
            <Order day={day} time={time} text={'Цуцлах'} type={'cancel'} />
          </div>
        </form>
      </div>
    </>
  );
};
