import React, { Component } from "react";
import axios from "axios";
import aKey from "./api.json";
import classes from "./css/main.module.css";

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
      <div className>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="radio"
              name="regular"
              value="regular"
              checked={regular ? true : false}
            />
            Regular
          </label>
          &emsp;
          <label>
            <input
              type="radio"
              name="random"
              value="random"
              checked={random ? true : false}
            />
            Random
          </label>
          &emsp;
          <label>
            <input
              type="radio"
              name="trending"
              value="trending"
              checked={trending ? true : false}
            />
            Trending
          </label>
          <br />
          <input placeholder="Lets get some memes in this place"></input>
          &emsp;<button> Click Me </button>
        </form>
      </div>
    );
  }
}
export default SearchBox;
