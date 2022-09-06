import React from 'react';

import footerLogo from '../assets/footer-logo.png';

export const Footer = ({ className }) => {
  return (
    <div className={className}>
      <div className="center">
        <img src={footerLogo} />
      </div>
      <div className="center font-title-m OCcolor">Copyright © 2022. Powered by Sendly.</div>
    </div>
  );
};
