import React from 'react';

export const ChangeButton = (props) => {
  const { type, setType } = props || {};
  return (
    <div className="flex mx-8 rounded-full border-solid border-2 border-[#243c5a] ">
      <div
        className={`p-1 w-1/2 rounded-l-full border-r-1 border-[#243c5a] align-middle ${
          type === 1 ? 'bg-green text-white' : null
        }`}
        onClick={() => setType(1)}>
        <div>Захиалах</div>
      </div>
      <div
        className={`p-1 w-1/2 rounded-r-full border-l-1 border-[#243c5a] align-middle' + ${
          type === 2 ? 'bg-green text-white' : null
        }`}
        onClick={() => setType(2)}>
        <div>Захиалга</div>
      </div>
    </div>
  );
};
