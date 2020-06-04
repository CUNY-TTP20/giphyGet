import React, { Component } from "react";
import axios from "axios";
import aKey from "./api.json";
import classes from "./css/main.module.css";

// const API = process.env.API_KEY;
const API = aKey.map((data) => {
  return data.API;
});

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      regular: true,
      random: false,
      trending: false,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    const random = this.state.random;
    const trending = this.state.trending;
    const regular = this.state.regular;
    const searchTerm = this.state.searchString;
    const regularCall = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API}`;
    const trendingCall =
      "http://api.giphy.com/v1/gifs/trending?api_key=YOUR_API_KEY";
    const randomCall =
      "http://api.giphy.com/v1/gifs/random?api_key=YOUR_API_KEY";

    return (
      <div>
        <div className={classes.buttonDiv}>
          <button
            className="btn btn-dark"
            type="button"
            name="regular"
            value="regular"
            checked={regular ? true : false}
            onClick={this.handleRegular}
          >
            Regular
          </button>
          &emsp;
          <button
            className="btn btn-dark"
            type="button"
            name="random"
            value="random"
            onClick={this.handleRandom}
          >
            Random
          </button>
          &emsp;
          <button
            className="btn btn-dark"
            type="button"
            name="trending"
            value="trending"
            checked={trending ? true : false}
            onClick={this.handleTrending}
          >
            Trending
          </button>
        </div>
        <br />
        <div className={classes.searchDiv}>
          <form onSubmit={this.handleSubmit}>
            <input
              className="form-control form-control"
              placeholder="Lets get some memes in this place"
            ></input>
            <button className="btn btn-dark"> Click Me </button>
          </form>
        </div>
      </div>
    );
  }
  handleRandom = (event) => {
    if (this.state.random === false && (this.state.regular === true || this.state.trending === true)) {
      this.setState({
        random: true,
        regular: false,
        trending: false,
      });
    } else {
      console.log("eeee");
    }
  };
  handleRegular=(event)=> {
    if (this.state.regular === false && (this.state.random === true || this.state.trending === true)) {
      this.setState({
        random: false,
        regular: true,
        trending: false,
      });
    } else {
      console.log("eeee");
    }
  }
  handleTrending = (event) => {
    if (this.state.trending === false && (this.state.regular === true || this.state.random === true)) {
      this.setState({
        random: false,
        regular: false,
        trending: true,
      });
    } else {
      console.log("eeee");
    }
  };
}
export default SearchBox;
