import React, { useState, useEffect } from "react";

const RealtorPropView = (props) => {
  const web3 = props.web3;
  const contract = props.contract;
  const accountZero = "0x0000000000000000000000000000000000000000";

  const [tokenOwner, setTokenOwner] = useState("");
  const [bidProcess, setBidProcess] = useState({});

  const getBid = async () => {
    const bid = await contract.methods.getBidProcess(props.tokenId).call();
    setBidProcess(bid);
  };

  const getOwner = async () => {
    const owner = await contract.methods.ownerOf(props.tokenId).call();
    setTokenOwner(owner);
  };

  useEffect(() => {
    getBid();
    getOwner();
  }, []);

  return (
    <div className="tokenCard">
      <h3>Property: {props.tokenId}</h3>
      <h4>Highest Bid : {Number(bidProcess[2])} $</h4>
      {bidProcess[1] && <p>In Market</p>} <br />
      <p className="small-address"> Owner: {tokenOwner}</p>
      <button type="button">Transfer To Winner</button>
      <button type="button">Reveal Winner</button>
      <button type="button">Place On Market</button>
    </div>
  );
};

export default RealtorPropView;

// 0  allBids[tokenId].realtor,
// 1  allBids[tokenId].onMarket,
// 2  allBids[tokenId].highestBid.bidAddress,

// 3  allBids[tokenId].highestBid.bidAmount,
// 4  allBids[tokenId].winnerRevealed,
// 5  allBids[tokenId].winner
