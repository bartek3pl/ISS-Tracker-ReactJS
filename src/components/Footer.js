import React from 'react';
import './Footer.scss';
import earth from './earth.png';

const Footer = () => {
  return (  
    <div className="footer">
      <img src={earth} alt="logo"/>
    </div>
  );
}
 
export default Footer;