import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "./App.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      searchQuery: "",
      showLocInfo: false,
      showError: false,
     
    };
  }

  getLocFun = async (event) => {
    event.preventDefault();

    await this.setState({
      searchQuery: event.target.city.value,
    });
    console.log(this.state.searchQuery);
  

    try {
      let reqUrl = `${process.env.REACT_APP_SERVER_LINK}/weather?searchQuery=${this.state.searchQuery}`;
      console.log(reqUrl);
      let locResult = await axios.get(reqUrl);
      console.log("locResult", locResult);
      console.log("seclocResult", locResult.data);
     

      this.setState({
        locationResult: locResult.data,
        showLocInfo: true,
        showError: false,
      });
      console.log(this.state.locationResult);
    } catch {
      console.log("something went wrong");
      this.setState({
        showError: true,
        showLocInfo: false,
      });
    }
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
            color: "white"
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
            <Form.Control type="text" name="city" placeholder="Enter city name" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Button 
          style = {{opacity:"1"}}
          
            type="submit"
          >
            Explore!
          </Button>
          
        </Form>

        {this.state.showLocInfo && (
          <>
            <h3
              style={{
                textAlign: "center",
                marginTop:"3px",
              }}
            >
              City name: {this.state.searchQuery}
            </h3>
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
              <Card border="primary" style={{ width: "25rem", position:"relative", left: "450px" }}>
                <Card.Header style={{ fontWeight: "bold", textAlign:"center" }}>City</Card.Header>
                <Card.Body>
                  <Card.Text>
                   <p>  Description : {this.state.locationResult[0].description}
                   <br></br> Date : {this.state.locationResult[0].date} </p>
                    <p> Description : {this.state.locationResult[1].description}
                    <br></br> Date : {this.state.locationResult[1].date} </p> 
                    <p> Description : {this.state.locationResult[2].description}
                    <br></br> Date : {this.state.locationResult[2].date} </p>
                   
                  </Card.Text>
                </Card.Body>
              </Card>
              </Row>
            </>
        )}
        {this.state.showError && (
          <p> something wrong in getting location data</p>
        )}
      </div>
    );
  }
}

export default App;
