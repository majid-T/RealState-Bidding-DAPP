import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="stakeholdersBar">
      <Link className="stakeholdersLabel" to="/Owner">
        Owner
      </Link>
      <Link className="stakeholdersLabel" to="/Realtor">
        Realtor
      </Link>
      <Link className="stakeholdersLabel" to="/BidderA">
        BidderA
      </Link>
      <Link className="stakeholdersLabel" to="/BidderB">
        BidderB
      </Link>
    </div>
  );
};

export default Navigation;
