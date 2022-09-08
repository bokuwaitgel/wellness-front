import React, { useEffect } from 'react';

import { Head } from '../components/Head';
import { TimeList } from '../components/Home/TimeList';
import { DayCont } from '../components/Home/DayCont';
import { CompanyInfo } from '../components/Home/CompanyInfo';
import { insertOrder, FetchTimeRule } from '../api/amitaApi';
//import { ButtonMain } from '../components/Buttons/Button';
//import { Link } from 'react-router-dom';
//import clsx from 'clsx';

export const Home = () => {
  const [rule, setRule] = React.useState([]);
  const [day, setDay] = React.useState(new Date());
  const [time, setTime] = React.useState(null);
  const [timeList, setTimeList] = React.useState([]);
  useEffect(() => {
    FetchTimeRule().then((res) => {
      setRule(res);
    });
  }, []);
  const saveOrder = () => {
    console.log('test', time);

    if (time !== null) {
      const data = day.getMonth() + 1 + '/' + day.getDate() + ' ' + time;
      insertOrder(data).then((res) => alert(res));
    } else alert('choose time');
  };
  return (
    <>
      <Head title="Home" description="hello" />
      <div className="flex-col text-center">
        <div className="inline self-center">
          <h2>Company Name</h2>
        </div>
        <form>
          <div>
            <DayCont
              rule={rule}
              day={day}
              onChange={setDay}
              setTimeList={setTimeList}
              timeList={timeList}
            />
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
