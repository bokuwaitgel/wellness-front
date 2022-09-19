import React from 'react';
import { DayCont } from '../time/DayCont';
import { TimeList } from '../time/TimeList';
import { Order } from '../buttons/Order';

export const OrderCont = (props) => {
  const { day, setDay, timeList, time, setTime, setOrderList, setType, userID, delay } =
    props || {};
  return (
    <div>
      <form>
        <div>
          <DayCont day={day} onChange={setDay} />
        </div>
        <div>
          <TimeList selected={time} setSelected={setTime} day={day} time={timeList} />
        </div>
        <div className="center">
          <Order
            delay={delay}
            setOrderList={setOrderList}
            day={day}
            time={time}
            text={'Захиалах'}
            type={'order'}
            setType={setType}
            userId={userID}
          />
        </div>
      </form>
    </div>
  );
};
