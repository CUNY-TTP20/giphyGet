import React, { Component } from "react";
import classes from "./css/main.module.css";
class GifTile extends Component {
  render() {
    return (
      <div className={classes.tile}>
        <div>
          <img
            src={this.props.imgSource}
            alt={this.props.title}
            className={classes.image}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "fit",
              display: "block",
              boxShadow: "0 10px 20px rgba(0,0,0,.7)",
            }}
          ></img>
        </div>
        <h2 style={{ topPadding: "10px", fontFamily: "Architects Daughter" }}>
          {this.props.title}
        </h2>
      </div>
    );
  }
}
export default GifTile;
