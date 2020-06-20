import React, { useState, useEffect } from "react";

const BidderPropView = (props) => {
  const web3 = props.web3;
  const contract = props.contract;
  const accountAddress = props.bidderAccount;

  const [bidProcess, setBidProcess] = useState({});
  const [bidAmmount, setBidAmmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getBid = async () => {
    const bid = await props.contract.methods
      .getBidProcess(props.tokenId)
      .call();
    setBidProcess(bid);
  };

  useEffect(() => {
    getBid();
  }, [loading]);

  const bidProperty = async () => {
    setLoading(true);
    if (!bidAmmount) {
      alert("Please fill in bid ammount first");
      setLoading(false);
      return;
    }
    const tx1 = await contract.methods
      .bid(props.tokenId, bidAmmount)
      .send({ from: accountAddress, gas: 2000000 });

    if (tx1) {
      console.log(tx1);
    } else {
      console.log("something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="tokenCard">
      {bidProcess[2] === accountAddress ? (
        <p className="marketBadge inMarket">You are highest</p>
      ) : (
        <p className="marketBadge outMarket">Other in lead</p>
      )}
      <h3>Property: {props.tokenId}</h3>
      <h4>Highest Bid : {Number(bidProcess[3])} $</h4>
      <input
        type="number"
        placeholder=" &nbsp;Place CounterBid Here."
        onChange={(e) => setBidAmmount(e.target.value)}
      />
      <button type="button" onClick={bidProperty}>
        Bid/CounterBid
      </button>
      {loading && <p>Bidding property...</p>}
    </div>
  );
};

export default BidderPropView;
