import React, { Component } from "react";
import OwnerPropView from "./OwnerPropView";

class Owner extends Component {
  state = {};
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Property Id" />

          <button type="submit">Mint new Property</button>
        </form>

        <hr></hr>
        <div>
          <OwnerPropView />
          <OwnerPropView />
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default Owner;
