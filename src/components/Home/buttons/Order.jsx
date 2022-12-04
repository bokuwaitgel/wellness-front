import React from 'react';
import { insertOrder, checkout } from '../../../api/amitaApi';

const saveOrder = (date, time, type, checkoutId, userId) => {
  insertOrder(date, time, type, checkoutId, userId).catch((err) => alert(err));
};

export const Order = (props) => {
  const { day, time, text, type, userId } = props || {};
  console.log(userId);
  const date = day.getFullYear() + '/' + (day.getMonth() + 1) + '/' + day.getDate();
  const handleSubmit = () => {
    if (time !== null) {
      checkout(time, date).then((res) => {
        console.log(date, time, type, res.checkoutId, userId);
        saveOrder(date, time, type, res.checkoutId, userId);
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
