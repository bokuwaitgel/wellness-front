import React from 'react';

export const ChangeButton = (props) => {
  const { type, setType, setLoader } = props || {};
  return (
    <div className="flex mx-8 rounded-full border-solid border-2 border-[#243c5a] ">
      <div
        className={`p-1 w-1/2 rounded-l-full border-r-1 border-[#243c5a] align-middle center ${
          type === 0 ? 'bg-[#07aeaa] text-white' : null
        }`}
        onClick={() => {
          setType(0);
          setLoader(true);
        }}>
        <div>Цаг захиалга</div>
      </div>
      <div
        className={`p-1 w-1/2 border-l-1 border-[#243c5a] align-middle center' + ${
          type === 1 ? 'bg-[#07aeaa] text-white' : null
        }`}
        onClick={() => setType(1)}>
        <div>Захиалгын мэдээлэл</div>
      </div>
      <div
        className={`p-1 w-1/2 rounded-r-full border-l-1 border-[#243c5a] align-middle center' + ${
          type === 2 ? 'bg-[#07aeaa] text-white' : null
        }`}
        onClick={() => setType(2)}>
        <div>Ангийн хөтөлбөр</div>
      </div>
    </div>
  );
};
