import React from 'react';

function RevereseTimeConvertor(time) {
  return (
    parseInt(time / 3600).toString() +
    ':' +
    (parseInt((time % 3600) / 60) < 10 ? '0' : '') +
    parseInt((time % 3600) / 60).toString()
  );
}

export const TimeList = (props) => {
  const { time, selected, setSelected } = props;

  return (
    <div>
      <div className="text-left  ml-5">Боломжит цагууд</div>
      <div className="grid grid-cols-3 grid-flow-row gap-4 place-items-center">
        {time?.map((t, idx) => {
          console.log(t);
          const converted = RevereseTimeConvertor(t);
          const check = selected === converted;
          return (
            <div
              key={parseInt(idx) + 1}
              onClick={() => (check ? setSelected(null) : setSelected(converted))}
              className={check ? 'selected-time-button' : 'time-button'}>
              {converted}
            </div>
          );
        })}
      </div>
    </div>
  );
};
