import React, { Component } from "react";
import OwnerPropView from "./OwnerPropView";

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
    };
  }

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
