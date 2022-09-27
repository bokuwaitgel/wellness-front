import React, { useEffect } from 'react';
import { gerOrderUser } from '../../../api/amitaApi';

export const OrderList = (props) => {
  const { orderList, setOrderList, userId } = props || {};

  useEffect(() => {
    const setOrder = () => {
      gerOrderUser(userId).then((res) => {
        setOrderList(res.filter((data) => data.paid === 'paid').reverse());
      });
    };
    setOrder();
  }, []);
  return (
    <div className="px-2">
      {orderList.map((data, idx) => {
        const resDate = data.date.split('/');
        return (
          <div
            key={idx}
            className={`flex space-x day-cont ${!data.paid ? 'bg-orange' : 'bg-green'}`}>
            <div className="pl-4 w-2/7">
              {resDate[resDate.length - 2] + '/' + resDate[resDate.length - 1]}
            </div>
            <div className="pl-4 w-2/7">{data.hour}</div>
            <div className="w-3/7 center">Баталгаажсан</div>
          </div>
        );
      })}
    </div>
  );
};
