import React from 'react';
import logo from '../../assets/test.jpg';

//import { TimeContainer } from '../Buttons/TimeContainer';

export const CompanyHeader = () => {
  return (
    <div className="center p-5">
      <img src={logo} alt="Logo" width="20" height="20" />
      <h2 className="pl-2">Amita Wellness</h2>
    </div>
  );
};
