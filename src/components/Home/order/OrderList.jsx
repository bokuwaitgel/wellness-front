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
            <div className="pl-4 w-1/3">
              {resDate[resDate.length - 1] + '/' + resDate[resDate.length - 2]}
            </div>
            <div className="pl-4 w-1/3">{data.hour}</div>
            <div className="w-1/3 center">Баталгаажсан</div>
          </div>
        );
      })}
    </div>
  );
};
