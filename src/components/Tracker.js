import React, { Fragment } from 'react';
import './Tracker.scss';

function getDate(timestamp) {
  const date = new Date(timestamp*1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return (
    `${hours < 10? "0" + hours : hours}
    : ${minutes < 10? "0" + minutes : minutes}
    : ${seconds < 10? "0" + seconds : seconds}`
  );
}

const Tracker = props => {
  const {timestamp} = props.data;
  const {latitude, longitude} = props.data.iss_position;
  const degree = '°';
  
  return (  
    <Fragment>
      <div className="checkbox">
        <input type="checkbox" id="check" onClick={props.click}/>
      </div>

      <div className="tracker">
        {props.active &&
          <div className="data">
            <p>Time: <span className="numbers">{getDate(timestamp)}</span></p>
            <p>Latitude: <span className="numbers">{latitude} {degree}</span></p>
            <p>Longtitude: <span className="numbers">{longitude} {degree}</span></p>
            <p>Velocity: <span className="numbers">
              {props.velocity > 0? props.velocity + " km/s" : "Loading..."}
            </span></p>
            <p>Distance: <span className="numbers">
            {props.distance > 0? props.distance + " km" : "Loading..."}
            </span></p>
          </div>
        }
      </div>
    </Fragment>
  );
}
 
export default Tracker;