import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="stakeholdersBar">
      <Link className="stakeholdersLabel" to="/">
        Owner
      </Link>
      <Link className="stakeholdersLabel" to="/Realtor">
        Realtor
      </Link>
      <Link className="stakeholdersLabel" to="/Bidder">
        Bidder
      </Link>
      <Link className="stakeholdersLabel" to="/Buyer">
        Buyer
      </Link>
      <Link className="stakeholdersLabel" to="/OwnerPropView">
        Owner Prop View
      </Link>
      
    </div>
  );
};

export default Navigation;
