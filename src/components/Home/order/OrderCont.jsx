import React from 'react';
import { DayCont } from './DayCont';
import { TimeList } from './TimeList';
import { Order } from './Order';

export const OrderCont = (props) => {
  const { day, setDay, timeList, time, setTime } = props | {};
  return (
    <div>
      <form>
        <div>
          <DayCont day={day} onChange={setDay} timeList={timeList} />
        </div>
        <div>
          <TimeList selected={time} setSelected={setTime} day={day} time={timeList} />
        </div>
        <div className="center">
          <Order day={day} time={time} text={'Захиалах'} type={'order'} />
        </div>
      </form>
    </div>
  );
};
