import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "./App.css";
import Weather from "./components/weather";
import Movies from "./components/movies";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      weather: [],

      movies:[],

      searchQuery: "",
      showLocInfo: false,
      showError: false,
      showWeather: false,
      showMovie:false

    };
  }

  getLocFun = async (event) => {
    event.preventDefault();

    await this.setState({
      searchQuery: event.target.city.value,
    });
    console.log(this.state.searchQuery);

    try {

      let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

//       let reqUrl =  `https://city-explorer301.herokuapp.com/weather?searchQuery=${this.state.searchQuery}`;

//       let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

      console.log(reqUrl);
      let locResult = await axios.get(reqUrl);
      console.log("locResult", locResult);
      console.log("seclocResult", locResult.data);

      this.getWeatherFun();
      this.getMovieFun();


      this.setState({
        locationResult: locResult.data[0],
        showLocInfo: true,
        showError: false,
      });
      this.getWeatherFun();

      console.log(this.state.locationResult);
    } catch {
      console.log("something went wrong");
      this.setState({
        showError: true,
        showLocInfo: false,
      });
    }
  };

  getWeatherFun = async (event) => {




    let reqUrlw = `${process.env.REACT_APP_SERVER_LINK}/weather?searchQuery=${this.state.searchQuery}`;
    console.log(reqUrlw);
    let weather = await axios.get(reqUrlw);

    // console.log("l", locResult);
    console.log("seclocResult", weather.data);

    this.setState({
      weather: weather.data,
      showWeather: true,
    });
  };


  getMovieFun = async (event) => {
  
    let reqUrl = `https://city-explorer301.herokuapp.com/movie?searchQuery=${this.state.searchQuery}`;
    console.log(reqUrl);
    let movies = await axios.get(reqUrl);
    // console.log("l", locResult);
    console.log("seclocResult", movies.data);
    this.setState({
      movies: movies.data,
      showMovie: true,
    });
  };

  render() {
    return (
      <div>
        <h2
          style={{
            fontWeight: "bold",
            textAlign: "center",
            padding: "80px",
            position: "relative",
            bottom: "20px",
            backgroundColor: "blue",
            color: "white",
          }}
        >
          City Explorer App
        </h2>
        <Form
          style={{
            textAlign: "center",
            padding: "100px",
            width: "100%",
            backgroundColor: "blue",
            borderStyle: "outset",
            borderColor: "black",
          }}
          onSubmit={this.getLocFun}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: "bold", color: "white" }}>
              City Explorer
            </Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="Enter city name"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Button style={{ opacity: "1" }} type="submit">
            Explore!
          </Button>
        </Form>

        {this.state.showLocInfo && (
          <>
            <h3
              style={{
                textAlign: "center",
                marginTop: "3px",
              }}
            >
              City name: {this.state.searchQuery}
            </h3>
             
            <p
              style={{
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                textAlign: 'center',
              }}
            >
              latitude: {this.state.locationResult.lat}
            </p>
            <p
              style={{
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                textAlign: 'center',
              }}
            >
              longitude: {this.state.locationResult.lon}{' '}
            </p>

            <img
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                border: '8px ridge black',
                padding: '5px',
              }}
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`}
              alt='city'
            />

            <Row
              xs={1}
              md={3}
              className="g-4"
              style={{
                position: "relative",
                margin: "90px",
                marginTop: "10px",
              }}
            >
              <Card
                border="primary"
                style={{ width: "25rem", position: "relative", left: "450px" }}
              >
                <Card.Header
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  City
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {this.state.weather.map((info) => {
                      return <Weather weather={info} />;
                    })}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
          
                
            {this.state.movies.map((info) => {
              return <Movies movies={info} />;
            })}



          </>
        )}
        {this.state.showError && (
          <p> something wrong in getting the data</p>
        )}
      </div>
    );
  }
}

export default App;

