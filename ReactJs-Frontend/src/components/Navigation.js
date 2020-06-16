import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <li>
        <Link to="/">Owner</Link>
      </li>
      <li>
        <Link to="/Realtor">Realtor</Link>
      </li>
      <li>
        <Link to="/Bidder">Bidder</Link>
      </li>
      <li>
        <Link to="/Buyer">Buyer</Link>
      </li>
    </>
  );
};

export default Navigation;
