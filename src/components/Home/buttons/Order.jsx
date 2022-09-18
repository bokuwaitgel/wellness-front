import React from 'react';
import { checkout } from '../../../api/miniAppApi';
import { insertOrder } from '../../../api/amitaApi';
const saveOrder = (day, time, type, checkoutId, userId, setType, setOrderList) => {
  const date = day.getMonth() + 1 + '/' + day.getDate();
  if (userId !== 'admin') {
    insertOrder(date, time, type, checkoutId, userId)
      .then((res) => {
        if (res)
          setOrderList((i) => [
            ...i,
            { date: date, hour: time, paid: null, checkoutId: checkoutId }
          ]);
      })
      .catch((err) => alert(err));

    setType(2);
  } else {
    insertOrder(date, time, type, null, userId);
  }
};

export const Order = (props) => {
  const { day, time, text, type, userId, setType, setOrderList } = props || {};
  console.log(day, time, text, type, userId);

  const handleSubmit = () => {
    if (time !== null) {
      if (type === 'order') {
        checkout().then((res) => {
          saveOrder(day, time, type, res.checkoutId, userId, setType, setOrderList);
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
