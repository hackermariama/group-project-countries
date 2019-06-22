import React, { Component } from "react";
import Statistics from "./components/Statistics";
import Languages from "./components/Languages";
import Population from "./components/Population";
import members from "./data/members";
import "./App.css";
import people from "./data/members";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: members
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Community Member Countries</h1>
        </header>
        <Statistics />
        <Population />
        <Languages />
      </div>
    );
  }
}

export default App;
