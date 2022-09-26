import React from 'react';
import { checkout } from '../../../api/miniAppApi';
import { insertOrder, calendarAdd, findUser, updateEventID } from '../../../api/amitaApi';

const saveOrder = (day, time, type, checkoutId, userId, setType, delay) => {
  const date = day.getMonth() + 1 + '/' + day.getDate();
  insertOrder(date, time, type, checkoutId, userId)
    .then((res) => {
      if (res) {
        findUser(userId).then((result) => {
          const start = new Date(day.getFullYear(), day.getMonth(), day.getDate());
          const end = new Date(day.getFullYear(), day.getMonth(), day.getDate());
          const hm = time?.split(':');
          const dl = delay?.split(':');
          start.setHours(parseInt(hm[0]) + parseInt(hm[0]));
          end.setHours(parseInt(hm[0]) + parseInt(dl[0]));
          start.setMinutes(parseInt(hm[1]));
          end.setMinutes(parseInt(dl[1]) + parseInt(hm[1]));
          calendarAdd(
            start,
            end,
            result[0].firstname + ' ' + result[0].phone,
            'phone: ' + result[0].phone + (result[0].gmail ? '\ngmail: ' + result[0].gmail : '')
          ).then((data) => {
            console.log(data);
            updateEventID(
              data?.data.data.id,
              data?.data.data.end.dateTime,
              data?.data.data.start.dateTime,
              checkoutId
            );
          });
        });
      }
    })
    .catch((err) => alert(err));

  setType(1);
};

export const Order = (props) => {
  const { day, time, text, type, userId, setType, delay } = props || {};
  const handleSubmit = () => {
    if (time !== null) {
      checkout().then((res) => {
        saveOrder(day, time, type, res.checkoutId, userId, setType, delay);
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
