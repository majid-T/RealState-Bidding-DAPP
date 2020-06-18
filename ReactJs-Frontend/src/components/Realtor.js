import React, { Component } from "react";

class Realtor extends React.Component {
	render() {
		return (
			<div>
			<label for='PropertyName'>Property A </label>
			<br />
			<label for='OwnerAddress'> Owner:0x00</label>
			<br />
			<br />
			<button type='button'>Transfer To Winner</button>
			<br />
			<button type='button'>Reveal Winner</button>
			<br />
			<button type='button'>Place On Market</button>
			<br />
			<br />
			</div>
		);
	}
}


export default Realtor;
