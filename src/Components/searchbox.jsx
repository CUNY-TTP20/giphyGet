import React, { Component } from "react";
import axios from "axios";
import aKey from "./api.json";
import classes from "./css/main.module.css";
import GifTile from "./giftTile";
// const API = process.env.API_KEY;
const API = aKey.map((data) => {
  return data.API;
});
// const regularCall = ``;
// const trendingCall = "http://api.giphy.com/v1/gifs/trending?api_key={API}";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      regular: true,
      random: false,
      trending: false,
      gif_list: [],
      total: 0,
      title: [],
      picAvailable: false,
    };
  }

  render() {
    const random = this.state.random;
    const trending = this.state.trending;
    const regular = this.state.regular;
    const searchTerm = this.state.searchString;
    let totalLength = range(0, this.state.total - 1);
    let picList =
      this.state.total > 0
        ? this.state.gif_list.map((i) => {
            return <GifTile imgSource={i[0]} title={i[1]} />;
          })
        : null;

    return (
      <div className={classes.mainDiv}>
        <div className={classes.buttonDiv}>
          <button
            className="btn btn-danger"
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
            className="btn btn-danger"
            type="button"
            name="random"
            value="random"
            onClick={this.handleRandom}
          >
            Random
          </button>
          &emsp;
          <button
            className="btn btn-danger"
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
        {regular ? (
          <div className={"container p-3 my-3 bg-dark text-white"}>
            <form onSubmit={this.handleSubmit}>
            <input
              className="form-control form-control-lg"
              placeholder="Lets get some memes in this place"
              onChange={this.handleChange}
            ></input>
            <button
              className="btn btn-danger"
              style={{ left: "50%", position: "relative" }}        
            >
              {" "}
              Show me memes{" "}
              </button>
              </form>
          </div>
        ) : null}
        <div
          className={"container p-3 my-3 bg-dark "}
          style={{

            borderRadius: "1%",
            boxShadow: "0 10px 20px rgba(0,0,0,.7)",
            textAlign: "center",
            color: "#efefef",
            maxHeight: "35vw",
            overflow:"scroll"
          }}
        >
          {this.state.picAvailable ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: "auto auto auto",
              color:"black"
            }}>{picList}</div>
          ) : (
            <h2>Nothing to Show. Maybe try searching something</h2>
          )}
        </div>
      </div>
    );
  }
  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?q=${this.state.searchString}&api_key=${API}`
      )
      .then((res) => {
        let data = res.data.data;
        let url_list = [];
        let count = range(0, res.data.pagination.count - 1);
        count.map((i) => {
          url_list.push([data[i].images.downsized_large.url, data[i].title]);
        });
        this.setState({
          gif_list: url_list,
          total: res.data.pagination.count,
          picAvailable: true,
        });
        console.log(this.state.gif_list[0].images);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };
  handleRandom = (event) => {
    if (
      this.state.random === false &&
      (this.state.regular === true || this.state.trending === true)
    ) {
      this.setState({
        random: true,
        regular: false,
        trending: false,
      });
      axios
        .get(`https://api.giphy.com/v1/gifs/random?api_key=${API}`)
        .then((res) => {
          this.setState({
            gif_list: res.data.data,
            total: 1,
            picAvailable: true,
          });
          console.log(this.state.gif_list);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    } else {
      console.log("eeee");
    }
  };
  handleRegular = (event) => {
    if (
      this.state.regular === false &&
      (this.state.random === true || this.state.trending === true)
    ) {
      this.setState({
        random: false,
        regular: true,
        trending: false,
        picAvailable: false,
      });
    } else {
      console.log("eeee");
    }
  };
  handleChange = (event) => {
    let value = event.target.value;
    this.setState({ searchString: value });
  };
  handleTrending = (event) => {
    if (
      this.state.trending === false &&
      (this.state.regular === true || this.state.random === true)
    ) {
      axios
        .get(`https://api.giphy.com/v1/gifs/trending?api_key=${API}`)
        .then((res) => {
          let data = res.data.data;
          let url_list = [];
          let count = range(0, res.data.pagination.count - 1);
          count.map((i) => {
            url_list.push([data[i].images.downsized_large.url, data[i].title]);
          });
          this.setState({
            random: false,
            regular: false,
            trending: true,
            gif_list: url_list,
            total: res.data.pagination.count,
            picAvailable: true,
          });
          let a = range(0, 24);
          a.map((i) => console.log(url_list));
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    } else {
      console.log("eeee");
    }
  };
}
function range(start, end) {
  var foo = [];
  for (var i = start; i <= end; i++) {
    foo.push(i);
  }
  return foo;
}
export default SearchBox;
