import React from 'react';
import { checkout } from '../../../api/miniAppApi';
import { insertOrder, calendarAdd, findUser } from '../../../api/amitaApi';

const saveOrder = (day, time, type, checkoutId, userId, setType, setOrderList, delay) => {
  const date = day.getMonth() + 1 + '/' + day.getDate();
  insertOrder(date, time, type, checkoutId, userId)
    .then((res) => {
      if (res) {
        findUser(userId).then((result) => {
          const start = new Date(day.getFullYear(), day.getMonth(), day.getDate());
          const end = new Date(day.getFullYear(), day.getMonth(), day.getDate());
          const hm = time?.split(':');
          const dl = delay?.split(':');
          start.setHours(parseInt(hm[0]));
          end.setHours(parseInt(hm[0]));
          start.setMinutes(parseInt(hm[1]));
          end.setMinutes(parseInt(dl[1]) + parseInt(hm[1]));
          calendarAdd(
            start,
            end,
            result.firstname,
            'phone: ' + result.phone + (result.gmail ? '\n gmail: ' + result.gmail : '')
          );
        });
        setOrderList((i) => [...i, { date: date, hour: time, paid: null, checkoutId: checkoutId }]);
      }
    })
    .catch((err) => alert(err));

  setType(1);
};

export const Order = (props) => {
  const { day, time, text, type, userId, setType, setOrderList, delay } = props || {};
  const handleSubmit = () => {
    if (time !== null) {
      checkout().then((res) => {
        saveOrder(day, time, type, res.checkoutId, userId, setType, setOrderList, delay);
        window.hpsPayment(res.checkoutId);
      });
    } else {
      alert('choose time');
    }
  };

  return (
    <div>
      <div className="button mt-5 text-white" onClick={() => handleSubmit()}>
        {text}
      </div>
    </div>
  );
};
