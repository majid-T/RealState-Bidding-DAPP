import React, { Component } from "react";

class Owner extends Component {
  state = {};
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="option1" />
          <input type="text" placeholder="option2" />
          <input type="text" placeholder="option3" />

          <button type="submit">Mint new Property</button>
        </form>

        <hr></hr>
        <div>
          <p>Owned property will list here</p>
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default Owner;
