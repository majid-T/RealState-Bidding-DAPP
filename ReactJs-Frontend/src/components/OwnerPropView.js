import React, { useState } from "react";

const OwnerPropView = (props) => {
  const [bidProcess, setBidProcess] = useState({});

  const getBid = async () => {
    const bid = await props.contract.methods
      .getBidProcess(props.tokenId)
      .call();
    setBidProcess(bid);
    console.log(bid);
  };

  getBid();
  const assignReealtor = async () => {
    alert(props.tokenId);
  };
  return (
    <div className="tokenCard">
      <h3>Property: {props.tokenId}</h3>
      <h4>Highest Bid : {Number(bidProcess[2])} $</h4>
      {bidProcess[1] && <p>In Market</p>}
      <input type="text" placeholder="realtor 0x0000" />
      <button type="button" onClick={assignReealtor}>
        Allow Transfer
      </button>
      <button type="button">Assign Realtor</button>
      <button type="button">Withdraw from market</button>
    </div>
  );
};

export default OwnerPropView;

//   allBids[tokenId].realtor,
//   allBids[tokenId].onMarket,
//   allBids[tokenId].highestBid.bidAddress,

//   allBids[tokenId].highestBid.bidAmount,
//   allBids[tokenId].winnerRevealed,
//   allBids[tokenId].winner
