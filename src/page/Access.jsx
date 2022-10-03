import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Head } from '../components/Head';
import {
  getUserID,
  updateOrder,
  FetchTimeRule,
  findUser,
  calendarAdd,
  updateEventID
} from '../api/amitaApi';
import { CompanyHeader } from '../components/Home/company/CompanyHeader';

import { RotatingLines } from 'react-loader-spinner';

export const Access = () => {
  var query = window.location.search.substring(1).split('&');
  const checkoutId = query[1]?.split('=') || '';
  const description = query[2]?.split('=') || '';
  const paymentId = query[3]?.split('=') || '';
  const navigate = useNavigate();
  const [res, setRes] = React.useState(0);
  const [date, setDate] = React.useState(0);
  const [hour, setHour] = React.useState(0);
  const [userID, setUserId] = React.useState('');
  useEffect(() => {
    getUserID(checkoutId[1]).then((res) => {
      if (res && description[1] === 'SUCCESS' && res[0].paid === null) {
        updateOrder(paymentId[1], 'paid', checkoutId[1]).catch(() => setRes(2));
        const day = res[0].date.split('/');
        setDate(day);
        setHour(res[0].hour);
        setUserId(res[0].userID);
        const start = new Date();
        start.setFullYear(parseInt(day[0]));
        start.setMonth(parseInt(day[1]) - 1);
        start.setDate(parseInt(day[2]));
        const end = new Date();
        end.setFullYear(parseInt(day[0]));
        end.setMonth(parseInt(day[1]) - 1);
        end.setDate(parseInt(day[2]));
        const hm = res[0].hour.split(':');
        FetchTimeRule()
          .then((time) => {
            const delay = time[0]?.delay;
            const dl = delay?.split(':');
            start.setHours(parseInt(hm[0]));
            end.setHours(parseInt(hm[0]) + parseInt(dl[0]));
            start.setMinutes(parseInt(hm[1]));
            end.setMinutes(parseInt(dl[1]) + parseInt(hm[1]));
            start.setSeconds(0);
            end.setSeconds(0);
            findUser(res[0].userID)
              .then((result) => {
                calendarAdd(
                  start,
                  end,
                  result[0].firstname + ' ' + result[0].phone,
                  'phone: ' +
                    result[0].phone +
                    (result[0].gmail ? '\ngmail: ' + result[0].gmail : '')
                )
                  .then((data) => {
                    updateEventID(
                      data?.data.data.id,
                      data?.data.data.end.dateTime,
                      data?.data.data.start.dateTime,
                      checkoutId[1]
                    )
                      .then(setRes(1))
                      .catch(() => setRes(2));
                  })
                  .catch(() => setRes(2));
              })
              .catch(() => setRes(2));
          })
          .catch(() => setRes(2));
      } else {
        if (res[0].paid != null) setRes(3);
      }
    });
  }, []);
  return (
    <div>
      <Head title="Access" description="hello" />
      <div className="flex-col text-center text-lg">
        <div className="inline self-center">
          <CompanyHeader />
        </div>
        {JSON.stringify(query)}
        {res == 0 ? (
          <div className="center">
            <RotatingLines
              strokeColor="#07aeaa"
              strokeWidth="5"
              animationDuration="0.50"
              width="200"
              visible={true}
            />
          </div>
        ) : res == 1 ? (
          <>
            <div className="center">
              {date[0]} оны {date[1]} сарын {date[2]} өдрийн {hour}-д авсан
            </div>
            <div className="center">Таны захиалга баталгаажлаа</div>
          </>
        ) : res == 3 ? (
          <div className="center">Баталгаажсан гүйлгээ байна</div>
        ) : (
          <div className="center">Амжилтгүй боллоо</div>
        )}
        <div className="mt-5">
          <button onClick={() => navigate(`/?${userID}`)} className="bordered-button px-6 py-2">
            <p className={'font-label-l'}>Буцах</p>
          </button>
        </div>
      </div>
    </div>
  );
};
