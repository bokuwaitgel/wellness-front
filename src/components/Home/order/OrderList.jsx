import React, { useEffect } from 'react';
import { gerOrderUser } from '../../../api/amitaApi';
import { RotatingLines } from 'react-loader-spinner';

export const OrderList = (props) => {
  const { orderList, setOrderList, userId } = props || {};
  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    const setOrder = () => {
      gerOrderUser(userId).then((res) => {
        setOrderList(res.filter((data) => data.paid === 'paid').reverse());
      });
      setLoader(false);
    };
    setOrder();
  }, []);
  return (
    <div className="px-2">
      {loader ? (
        <div className="center">
          <RotatingLines
            strokeColor="#07aeaa"
            strokeWidth="5"
            animationDuration="0.50"
            width="200"
            visible={true}
          />
        </div>
      ) : orderList.length === 0 ? (
        <div className={`space-x day-cont center`}>
          <div className="center">Танд захиалгын түүх байхгүй байна</div>
        </div>
      ) : (
        orderList.map((data, idx) => {
          const resDate = data.date.split('/');
          return (
            <div key={idx} className={`flex space-x day-cont ${!data.paid ? '' : 'bg-[#07aeaa]'}`}>
              <div className="pl-4 w-1/4">
                {resDate[resDate.length - 2] + '/' + resDate[resDate.length - 1]}
              </div>
              <div className="pl-4 w-1/4">{data.hour}</div>
              <div className="w-1/2 center">Баталгаажсан</div>
            </div>
          );
        })
      )}
    </div>
  );
};
