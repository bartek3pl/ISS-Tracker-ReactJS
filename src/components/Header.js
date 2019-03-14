import React, {Fragment} from 'react';
import './Header.scss';
import iss from './iss.png';

const Header = props => {
  const title = "ISS TRACKER";
  return (
    <Fragment>
      <div className="iss">
        <img src={iss} alt="iss"/>
      </div>
      <div className="header">
        <h1 className="title">
          {props.active? <span style={ {color: "#22df4f"} }>{title}</span> : title}
        </h1>
      </div>
    </Fragment>
  );
}
 
export default Header;