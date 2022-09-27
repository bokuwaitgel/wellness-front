import React from 'react';
import { DayCont } from '../time/DayCont';
import { TimeList } from '../time/TimeList';
import { Order } from '../buttons/Order';

export const OrderCont = (props) => {
  const {
    day,
    setDay,
    timeList,
    time,
    setTime,
    setOrderList,
    userID,
    start,
    end,
    delay,
    calendarData,
    setCalendarData
  } = props || {};
  return (
    <div>
      <form>
        <div>
          <DayCont day={day} onChange={setDay} />
        </div>
        <div>
          <TimeList
            selected={time}
            setSelected={setTime}
            day={day}
            time={timeList}
            start={start}
            delay={delay}
            end={end}
            calendarData={calendarData}
            setCalendarData={setCalendarData}
          />
        </div>
        <div className="center">
          <Order
            delay={delay}
            setOrderList={setOrderList}
            day={day}
            time={time}
            text={'Захиалах'}
            type={'order'}
            userId={userID}
          />
        </div>
      </form>
    </div>
  );
};
