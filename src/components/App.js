import React, { Component } from 'react';
import './App.scss';
import Header from './Header.js';
import Tracker from './Tracker.js';
import Footer from './Footer.js';

//Treść zadania pozwala zoptymalizować aplikację
//i przechowywać tylko niezbędne 2 odczyty

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      velocity: 0,
      distance: 0, 
      time: -2, //w sekundach
      
      first_data: {
        message: "",
        timestamp: Infinity,
        iss_position: {
          latitude: "",
          longitude: "",
        }
      },

      current_data: { 
        message: "",
        timestamp: 0,
        iss_position: {
          latitude: "",
          longitude: "",
        }
      },

      active: false,
    }
    this.idInterval = "";
  }

  getData = () => {
    const url = "http://api.open-notify.org/iss-now.json";
    fetch(url)
      .then(response => {
        if(response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then(response => response.json())
      .then(data => {
        //tylko raz aktualizujemy stan obiektu first_data    
        if (data.timestamp < this.state.first_data.timestamp) {
          this.setState({ 
            first_data: data  
          });
        }
        this.setState({ 
          current_data: data,
        });
      })
      .catch(error => console.log(error))

    this.getVelocity();
    this.getDistance();
  }

  handleClick = () => {
    this.setState(prevState => ({ 
      active: !prevState.active
    }));
  }

  getVelocity = () => {
    //na podstawie 2 odczytów - pierwszy oraz aktualny
    const s = this.state.time;
    const t = this.state.distance;
    const velocity = (t/s).toFixed(2);

    this.setState({ 
      velocity
    });
  }

  getDistance = () => {
    const {current_data, first_data} = this.state;

    const pi = Math.PI;
    const r = 6371 + 408; //promień ziemii + wysokość ISS
    const lon1 = first_data.iss_position.longitude * (pi/180);
    const lon2 = current_data.iss_position.longitude * (pi/180);
    const lat1 = first_data.iss_position.latitude * (pi/180);
    const lat2 = current_data.iss_position.latitude * (pi/180);
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    let distance = Math.pow(Math.sin(dlat/2), 2) + Math.cos(lat1) * 
                    Math.cos(lat2) * Math.pow(Math.sin(dlon/2), 2);
    distance = 2 * Math.asin(Math.sqrt(distance));
    distance = (distance * r).toFixed(2);

    this.setState(prevState => ({ 
      distance,
      time: prevState.time + 1
    }));
  }

  componentDidMount() {
    this.getData();
    this.idInterval = setInterval(() => this.getData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
  }

  render() { 
    return (  
      <div className="App">
        <Header active={this.state.active}/>
        <Tracker
          active={this.state.active}
          data={this.state.current_data}
          click={this.handleClick}
          velocity={this.state.velocity}
          distance={this.state.distance}
        />
        <Footer/>
      </div>
    );
  }
}
 
export default App;
