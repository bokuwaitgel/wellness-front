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
                if (re.status === 'paid') {
                  updateOrder(re.paymentId, re.status, d.checkoutId);
                  const start = new Date(d.startTime);
                  const end = new Date(d.endTime);
                  start.setHours(parseInt(start.getHours()) - 8);
                  end.setHours(parseInt(end.getHours()) - 8);
                  if (d.eventID && d.startTime && d.endTime) {
                    calendarUpdate(
                      d.eventID,
                      start,
                      end,
                      result[0].firstname + ' ' + result[0].phone,
                      'phone: ' +
                        result[0].phone +
                        (result[0].gmail ? '\ngmail: ' + result[0].gmail : '') +
                        '\nPaid'
                    ).then((res) => console.log(res));
                  }
                }
              });
            }
          });
        });
      });

      gerOrderUser(userId).then((res) => {
        setOrderList(res.reverse());
      });
    };
    setOrder();
    const timer = setInterval(setOrder, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-2">
      {orderList.map((data, idx) => {
        console.log(data.date);
        const d = data.date.split('/');
        return (
          <div key={idx} className={`spa day-cont bg-green m-4`}>
            <div className="w-1/5">{d[0]}</div>
            <div className="w-1/5">сарын </div>
            <div className="w-1/5">{d[1]}</div>
            <div className="w-1/5">ны</div>
            <div className="w-1/5">{data.hour}</div>
          </div>
        );
      })}
    </div>
  );
};
