import React, { useState, useEffect } from "react";

const RealtorPropView = (props) => {
  const web3 = props.web3;
  const contract = props.contract;

  const [tokenOwner, setTokenOwner] = useState("");
  const [bidProcess, setBidProcess] = useState({});
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(false);

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
    getIsApproved();
  }, [loading]);

  const putOnMarket = async () => {
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    const realtorAccount = accounts[1];

    const tx1 = await contract.methods
      .putOnMarket(props.tokenId)
      .send({ from: realtorAccount, gas: 2000000 });

    if (tx1) {
      console.log(tx1);
    } else {
      console.log("something went wrong");
    }
    setLoading(false);
  };

  const revealWinner = async () => {
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    const realtorAccount = accounts[1];
    const tx1 = await contract.methods
      .revealWinner(props.tokenId)
      .send({ from: realtorAccount, gas: 2000000 });

    if (tx1) {
      console.log(tx1);
    } else {
      console.log("something went wrong");
    }
    setLoading(false);
  };

  const transferToWinner = async () => {
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    const realtorAccount = accounts[1];
    const tx1 = await contract.methods
      .transferFrom(tokenOwner, bidProcess[2], props.tokenId)
      .send({ from: realtorAccount, gas: 2000000 });

    if (tx1) {
      console.log(tx1);
    } else {
      console.log("something went wrong");
    }
    setLoading(false);
  };

  const getIsApproved = async () => {
    const accounts = await web3.eth.getAccounts();
    const realtorAccount = accounts[1];
    const approvedAddress = await contract.methods
      .getApproved(props.tokenId)
      .call();
    if (approvedAddress === realtorAccount) {
      setIsApproved(true);
    }
  };

  return (
    <div className="tokenCard">
      {bidProcess[1] ? (
        <p className="marketBadge inMarket">In Market</p>
      ) : (
        <p className="marketBadge outMarket">Not In Market</p>
      )}
      <p className="small-address"> Owner: {tokenOwner}</p>
      <h3>Property: {props.tokenId}</h3>
      <h4>Highest Bid : {Number(bidProcess[3])} $</h4>
      {!bidProcess[1] && (
        <button type="button" onClick={putOnMarket}>
          Place On Market
        </button>
      )}
      <button type="button" onClick={revealWinner}>
        Reveal Winner
      </button>
      {isApproved && (
        <button type="button" onClick={transferToWinner}>
          Transfer To Winner
        </button>
      )}
      {loading && <p>Making changes...</p>}
    </div>
  );
};

export default RealtorPropView;
