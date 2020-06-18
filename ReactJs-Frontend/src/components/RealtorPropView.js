import React, { Component } from "react";

class RealtorPropView extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="PropertyName">Property A </label>
        <br />
        <label htmlFor="OwnerAddress"> Owner:0x00</label>
        <br />
        <br />
        <button type="button">Transfer To Winner</button>
        <br />
        <button type="button">Reveal Winner</button>
        <br />
        <button type="button">Place On Market</button>
        <br />
        <br />
      </div>
    );
  }
}

export default RealtorPropView;
