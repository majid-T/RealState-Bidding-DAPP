import React, { useState, useEffect } from "react";

const RealtorPropView = (props) => {
  const web3 = props.web3;
  const contract = props.contract;

  const [tokenOwner, setTokenOwner] = useState("");
  const [bidProcess, setBidProcess] = useState({});
  const [isApproved, setIsApproved] = useState(false);

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
  }, []);

  const putOnMarket = async () => {
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
  };

  const revealWinner = async () => {
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
  };

  const transferToWinner = async () => {
    const accounts = await web3.eth.getAccounts();
    const realtorAccount = accounts[1];
    const tx1 = await contract.methods
      .transferFrom(bidProcess[2], tokenOwner, props.tokenId)
      .send({ from: realtorAccount, gas: 2000000 });

    if (tx1) {
      console.log(tx1);
    } else {
      console.log("something went wrong");
    }
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
      <h3>Property: {props.tokenId}</h3>
      <h4>Highest Bid : {Number(bidProcess[3])} $</h4>
      {bidProcess[1] && <p>In Market</p>} <br />
      <p className="small-address"> Owner: {tokenOwner}</p>
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
    </div>
  );
};

export default RealtorPropView;
