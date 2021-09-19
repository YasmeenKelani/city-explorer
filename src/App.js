import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      searchQuery: "",
      showLocInfo: false,
    };
  }

  getLocFun = async (event) => {
    event.preventDefault();

    await this.setState({
      searchQuery: event.target.city.value,
    });

    console.log("key", process.env.REACT_APP_LOCATIONIQ_KEY);

    let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

    let locResult = await axios.get(reqUrl);
    console.log("locResult", locResult);
    console.log("seclocResult", locResult.data);
    console.log("seclocResult", locResult.data[0]);

    this.setState({
      locationResult: locResult.data[0],
      showLocInfo: true,
    });
  };

  render() {
    return (
      <div>
        <h2 style={{ textAlign:'center', padding:'80px',position:'relative',bottom:'20px', backgroundColor:'aqua'}}>City Explorer app</h2>
        <form style ={{textAlign:'center'}} onSubmit={this.getLocFun}>
          <input type="text" name="city" />
          <input type="submit" value="get city info" />
        </form>

        {this.state.showLocInfo && (
          <>
            <p style={{fontWeight:"bold"}}>City name: {this.state.searchQuery}</p>
            <p style={{fontWeight:"bold"}}>latitude: {this.state.locationResult.lat}</p>
            <p style={{fontWeight:"bold"}}>longitude: {this.state.locationResult.lon} </p>

            <img
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`}
              alt="city"
            />
          </>
        )}
        
      </div>
    );
  }
  
}

export default App;