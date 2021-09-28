import React, { Component } from "react";

class Weather extends Component {
  render() {
    return (
      <>
    
         <p> description : {this.props.weather.description}</p>
        
          <p>date : {this.props.weather.date}</p>
      
      </>
    );
  }
}

export default Weather;
