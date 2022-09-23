import React, { useEffect } from 'react';
import { gerOrderUser, updateOrder, calendarUpdate, findUser } from '../../../api/amitaApi';
import { getCheckoutInfo } from '../../../api/miniAppApi';

export const OrderList = (props) => {
  const { orderList, setOrderList, userId } = props || {};

  useEffect(() => {
    const setOrder = () => {
      findUser(userId).then((result) => {
        gerOrderUser(userId).then((res) => {
          res.map((d) => {
            if (d.paid === null) {
              getCheckoutInfo(d.checkoutId).then((re) => {
                console.log(res);
                if (re.status === 'paid') {
                  updateOrder(re.paymentId, re.status, d.checkoutId);
                  calendarUpdate(
                    res.eventID,
                    d.startTime,
                    d.endTime,
                    result[0].firstname,
                    'phone: ' +
                      result[0].phone +
                      (result[0].gmail ? '\n gmail: ' + result[0].gmail : '') +
                      '\nPaid'
                  ).then((res) => console.log(res));
                }
              });
            }
          });
        });
      });
      gerOrderUser(userId).then((res) => {
        setOrderList(res);
      });
    };
    setOrder();
    const timer = setInterval(setOrder, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const handleEvent = (paid, checkoutId) => {
    if (!paid) window.hpsPayment(checkoutId);
  };
  return (
    <div className="px-2">
      {orderList.reverse().map((data, idx) => {
        return (
          <div
            key={idx}
            className={`flex space-x day-cont ${!data.paid ? 'bg-orange' : 'bg-green'}`}
            onClick={() => handleEvent(data.paid, data.checkoutId)}>
            <div className="pl-4 w-1/3">{data.date}</div>
            <div className="pl-4 w-1/3">{data.hour}</div>
            <div className="w-1/3 center">{!data.paid ? 'Төлөгдөөгүй' : 'Төлөгдсөн'}</div>
          </div>
        );
      })}
    </div>
  );
};
