import React, { useState, useEffect } from "react";

const Buyer = (props) => {
  const [marketSize, setMarketSize] = useState(0);
  const web3 = props.web3;
  const contract = props.contract;

  return (
    <div>
      <p>Buyer Page</p>
      <p>Market size: {marketSize}</p>
      <button>click</button>
      <button>All tokens</button>
    </div>
  );
};

export default Buyer;
