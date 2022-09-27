import React from 'react';
import { checkout } from '../../../api/miniAppApi';
import { insertOrder } from '../../../api/amitaApi';

const saveOrder = (day, time, type, checkoutId, userId, setType) => {
  const date = day.getFullYear() + '/' + day.getMonth() + 1 + '/' + day.getDate();
  insertOrder(date, time, type, checkoutId, userId).catch((err) => alert(err));
  setType(1);
};

export const Order = (props) => {
  const { day, time, text, type, userId, setType } = props || {};
  const handleSubmit = () => {
    if (time !== null) {
      checkout().then((res) => {
        saveOrder(day, time, type, res.checkoutId, userId, setType);
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
