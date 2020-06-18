import React, { Component } from "react";

class OwnerPropView extends Component {
  state = {};
  render() {
    return (
      <div>
          <h3>Property A</h3>
          <br>
          </br>
          <h2>Bid : XXXX</h2>
        <form>
          <input type="text"  />&nbsp;&nbsp;<button type="submit">Allow Transfer</button>
          <br/>
          <br/>
          <button type="submit">Assign Realtor</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button type="submit">Withdraw from market</button>
        </form>

        
        
      </div>
    );
  }
}

export default OwnerPropView;
