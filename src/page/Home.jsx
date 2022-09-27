import React, { useEffect } from 'react';

import { Head } from '../components/Head';
import { CompanyInfo } from '../components/Home/company/CompanyInfo';
import { CompanyHeader } from '../components/Home/company/CompanyHeader';
import { ChangeButton } from '../components/Home/buttons/changeButton';
import { FetchTimeRule, findUser, insertUser, calendarList } from '../api/amitaApi';
import { getAccessTokenV2, getUserInfo } from '../api/miniAppApi';
import { OrderList } from '../components/Home/order/OrderList';
import { OrderCont } from '../components/Home/order/OrderCont';

function timeConvertor(time) {
  if (!time) return 0;
  const [hours, minutes, seconds] = time.split(':');
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
}

export const Home = () => {
  var query = window.location.search.substring(1).split('=');
  const userID = query[query.length - 1];
  const [day, setDay] = React.useState(new Date());
  const [time, setTime] = React.useState(null);
  const [timeList, setTimeList] = React.useState([]);
  const [token, setToken] = React.useState(null);
  const [type, setType] = React.useState(0);
  const [orderList, setOrderList] = React.useState([]);
  const [delay, setDelay] = React.useState('01:00:00');
  const [start, setStart] = React.useState('08:00:00');
  const [end, setEnd] = React.useState('18:00:00');
  const [calendarData, setCalendarData] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    getAccessTokenV2(userID).then((tk) => setToken(tk));
    if (timeList.length === 0) {
      FetchTimeRule().then((res) => {
        const start = timeConvertor(res[0]?.start);
        const end = timeConvertor(res[0]?.end);
        const delay = timeConvertor(res[0]?.delay);
        setDelay(res[0]?.delay);
        setStart(res[0]?.start);
        setEnd(res[0]?.end);
        const st = new Date(day.getFullYear(), day.getMonth(), day.getDate());
        const ed = new Date(day.getFullYear(), day.getMonth(), day.getDate());
        const hm = res[0]?.start.split(':');
        const dl = res[0]?.end.split(':');
        st.setHours(parseInt(hm[0]));
        ed.setHours(parseInt(dl[0]));
        st.setMinutes(parseInt(hm[1]));
        ed.setMinutes(parseInt(dl[1]));

        calendarList(st, ed).then((res) => {
          setCalendarData(res);
        });
        for (let s = start; s < end; s += delay) {
          setTimeList((i) => [...i, s]);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (token)
      getUserInfo(token).then((res) => {
        if (res.code === 1)
          findUser(userID).then((result) => {
            if (result.length === 0) {
              insertUser(userID, res.firstname, res.lastname, res.phone, res.email);
            }
          });
      });
  }, [token]);

  return (
    <div className="overflow">
      <Head title="Home" description="hello" />
      <div className="flex-col text-center">
        <div className="inline self-center">
          <CompanyHeader />
        </div>
        <div>
          <ChangeButton type={type} setType={setType} />
        </div>
        {type === 0 ? (
          <div>
            <OrderCont
              loader={loader}
              setLoader={setLoader}
              day={day}
              start={start}
              end={end}
              delay={delay}
              setDay={setDay}
              time={time}
              setTime={setTime}
              timeList={timeList}
              setOrderList={setOrderList}
              userID={userID}
              calendarData={calendarData}
              setCalendarData={setCalendarData}
            />
          </div>
        ) : (
          <div>
            <OrderList orderList={orderList} setOrderList={setOrderList} userId={userID} />
          </div>
        )}
        <div>
          <CompanyInfo />
        </div>
      </div>
    </div>
  );
};
