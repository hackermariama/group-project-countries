import React, { Component } from "react";
import "./Population.css";
import people from "../data/members";

class Population extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: people,
      countries: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          countries: data,
          isLoading: false
        });
      });
  }
  addPopulation = (person) => ({
    name: person.name,
    country: person.country,
    population: this.getPopulationForCountry(person.country)
  });

  getPeopleWithPopulation = () => {
    return this.state.people.map(this.addPopulation);
  };

  getPopulationForCountry = (countryName) => {
    const findCountry = this.state.countries.find(function(element) {
      return element.name.includes(countryName);
    });
    return findCountry.population;
  };

  getUniquePopulation = () => {
    const uniquePopulation = [];
    const populationList = this.getPeopleWithPopulation().map((item) => item.population);
    const changePopulationListToStr = populationList.join(",");
    const arrayOfPopulationList = changePopulationListToStr.split(",");

    arrayOfPopulationList.forEach((item) => {
      if (!uniquePopulation.includes(item)) {
        return uniquePopulation.push(item);
      }
    });

    return uniquePopulation.length;
  };
  render() {
    if (this.state.isLoading) {
      return <span>Loading .....</span>;
    } else {
      return (
        <div className="Population">
          <div className="Population-header">
            <h2>Population of Member Countries</h2>
            <input type="text" placeholder="Search by country" />
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody>
              {this.getPeopleWithPopulation().map((result) => {
                return (
                  <tr key={result.name + result.country + result.population}>
                    <td>{result.name}</td>
                    <td>{result.country}</td>
                    <td>{result.population}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total Population: {this.getUniquePopulation()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
  }
}
export default Population;
