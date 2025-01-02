// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GMINE is ERC20 {
    address public authorizedAddress;

    constructor(address _authorizedAddress) ERC20("GMINE", "GMINE") {
        require(_authorizedAddress != address(0), "Invalid address");
        authorizedAddress = _authorizedAddress;

        _mint(address(this), 1000 * 10 ** decimals());
    }

    function distributeTokens(address recipient, uint256 amount) external {
        require(msg.sender == authorizedAddress, "Caller is not authorized");
        _transfer(address(this), recipient, amount); 
    }
}
