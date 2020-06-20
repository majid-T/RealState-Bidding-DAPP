import React, { useState, useEffect } from "react";

const OwnerPropView = (props) => {
  const web3 = props.web3;
  const contract = props.contract;
  const accountZero = "0x0000000000000000000000000000000000000000";

  const [bidProcess, setBidProcess] = useState({});
  const [porpRealtor, setPropRealtor] = useState(accountZero);
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

  const assignRealtor = async () => {
    setLoading(true);
    if (!porpRealtor) {
      alert("Please fill in realtor address first");
      setLoading(false);
      return;
    }
    const accounts = await web3.eth.getAccounts();
    const ownerAccount = accounts[0];
    const tx1 = await contract.methods
      .assignRealtor(props.tokenId, porpRealtor)
      .send({ from: ownerAccount, gas: 2000000 });

    if (tx1) {
      console.log(tx1);
    } else {
      console.log("something went wrong");
    }
    setLoading(false);
  };

  const allowTransfer = async () => {
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    const ownerAccount = accounts[0];
    const tx1 = await contract.methods
      .approve(bidProcess[0], props.tokenId)
      .send({ from: ownerAccount, gas: 2000000 });
    if (tx1) {
      console.log(tx1);
    } else {
      console.log("something went wrong");
    }
    setLoading(false);
  };

  const withdrawFromMarket = async () => {
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    const ownerAccount = accounts[0];
    const tx1 = await contract.methods
      .withdrawFromMarket(props.tokenId)
      .send({ from: ownerAccount, gas: 2000000 });
    if (tx1) {
      console.log(tx1);
    } else {
      console.log("something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="tokenCard">
      {bidProcess[1] ? (
        <p className="marketBadge inMarket">In Market</p>
      ) : (
        <p className="marketBadge outMarket">Not In Market</p>
      )}
      <p className="small-address">Realtor: {bidProcess[0]} </p>

      <h3>Property: {props.tokenId}</h3>
      <h4>Highest Bid : {Number(bidProcess[3])} $</h4>

      {bidProcess[0] === accountZero && (
        <input
          type="text"
          placeholder="realtor 0x0000"
          onChange={(event) => setPropRealtor(event.target.value)}
        />
      )}
      {bidProcess[0] === accountZero && (
        <button type="button" onClick={assignRealtor}>
          Assign Realtor
        </button>
      )}

      <button type="button" onClick={allowTransfer}>
        Allow Transfer
      </button>
      <button type="button" onClick={withdrawFromMarket}>
        Withdraw from market
      </button>
      {loading && <p>Making changes</p>}
    </div>
  );
};

export default OwnerPropView;
