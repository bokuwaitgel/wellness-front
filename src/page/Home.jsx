import React, { useEffect } from 'react';

import { Head } from '../components/Head';
import { TimeList } from '../components/Home/time/TimeList';
import { DayCont } from '../components/Home/time/DayCont';
import { CompanyInfo } from '../components/Home/company/CompanyInfo';
import { CompanyHeader } from '../components/Home/company/CompanyHeader';
import { ChangeButton } from '../components/Home/buttons/changeButton';
import { OrderList } from '../components/Home/order/OrderList';
import { FetchTimeRule, findUser, insertUser } from '../api/amitaApi';
import { getAccessTokenV2, getUserInfo } from '../api/miniAppApi';
import { Order } from '../components/Home/buttons/Order';

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
  const [type, setType] = React.useState(1);
  const [orderList, setOrderList] = React.useState([]);

  useEffect(() => {
    getAccessTokenV2(userID).then((tk) => setToken(tk));
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
        {type === 1 ? (
          <form>
            <div>
              <DayCont day={day} onChange={setDay} />
            </div>
            <div>
              <TimeList selected={time} setSelected={setTime} day={day} time={timeList} />
            </div>
            <div className="center">
              <Order
                setOrderList={setOrderList}
                day={day}
                time={time}
                text={'Захиалах'}
                type={'order'}
                setType={setType}
                userId={userID}
              />
            </div>
          </form>
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
