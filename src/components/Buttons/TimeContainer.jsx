import React from 'react';

export const TimeContainer = (props) => {
  const [time] = props | [];
  console.log(time);
  return <div className="time-button">{time}</div>;
};
