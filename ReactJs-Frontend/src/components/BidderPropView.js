import React from "react";
// import house from "../avatar/House.jpeg";
//import house2 from "../avatar/house2.jpeg";

const BidderPropView = () => {
  return (
    <div>
      <ul>
        <li>
          <h3>Property A</h3>
          {/* <img src={house} class="house" alt="ExampleProperty" /> */}
          {/* <label for="select">On Market:</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select id="select">
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select> */}
          <h2 id="HighestBid"> $1,000,000</h2>
          <input
            class="CounterBid"
            type="number"
            placeholder=" &nbsp;Place CounterBid Here."
          />
          <br />
          <br />
          <button class="Submit" type="button">
            CounterBid
          </button>
        </li>
      </ul>
    </div>
  );
};

export default BidderPropView;
