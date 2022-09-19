import React from 'react';
import { checkout } from '../../../api/miniAppApi';
import { insertOrder, calendarAdd } from '../../../api/amitaApi';

const saveOrder = (day, time, type, checkoutId, userId, setType, setOrderList, delay) => {
  const date = day.getMonth() + 1 + '/' + day.getDate();
  const start = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const hm = time.split(':');
  const dl = delay.split(':');
  start.setHours(parseInt(hm[0]));
  const end = start;
  start.setMinutes(parseInt(hm[1]));
  end.setMinures(parseInt(hm[1]) + parseInt(dl[1]));
  calendarAdd(start, end, 'test', 'test123');
  insertOrder(date, time, type, checkoutId, userId)
    .then((res) => {
      if (res)
        setOrderList((i) => [...i, { date: date, hour: time, paid: null, checkoutId: checkoutId }]);
    })
    .catch((err) => alert(err));

  setType(1);
};

export const Order = (props) => {
  const { day, time, text, type, userId, setType, setOrderList, delay } = props || {};
  const handleSubmit = () => {
    if (time !== null) {
      if (type === 'order') {
        checkout().then((res) => {
          saveOrder(day, time, type, res.checkoutId, userId, setType, setOrderList, delay);
          window.hpsPayment(res.checkoutId);
        });
      } else {
        saveOrder(day, time, type, null, 'admin', setType, setOrderList);
      }
    } else alert('choose time');
  };

  return (
    <div>
      <div className="button mt-5 text-white" onClick={() => handleSubmit()}>
        {text}
      </div>
    </div>
  );
};
