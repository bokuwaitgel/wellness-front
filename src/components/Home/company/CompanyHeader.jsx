import React from 'react';
import logo from '../../../assets/test.jpg';

//import { TimeContainer } from '../Buttons/TimeContainer';

export const CompanyHeader = () => {
  return (
    <div className="flex snap-x p-9">
      <div className="snap-center">
        <img className="rounded" src={logo} alt="Logo" width="50" height="50" />
      </div>
      <div className="pl-5 pt-2 text-xl">Amita’s Wellness Center</div>
    </div>
  );
};
