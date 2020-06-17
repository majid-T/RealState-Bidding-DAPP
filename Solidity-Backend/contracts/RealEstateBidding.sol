//SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "./ERC721.sol";

contract RealEstateBidding is ERC721 {
    constructor() public ERC721("RealEstateBidding", "REB") {}

    function mint(uint256 propID) public {
        _mint(msg.sender, propID);
    }
}
