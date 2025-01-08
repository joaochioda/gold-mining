// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "hardhat/console.sol";

contract GMINE is ERC20, Ownable {
    address public authorizedAddress;

    constructor() Ownable(msg.sender) ERC20("GMINE", "GMINE") {
        _mint(address(this), 1000 * 10 ** decimals());
        _transfer(address(this), msg.sender, 100 * 10 ** decimals());
    }

    function distributeTokens(address recipient, uint256 amount) external {
        require(msg.sender == authorizedAddress, "Caller is not authorized");
        _transfer(address(this), recipient, amount);
    }

    function setAuthorizedAddress(
        address _authorizedAddress
    ) external onlyOwner {
        require(_authorizedAddress != address(0), "Invalid address");
        authorizedAddress = _authorizedAddress;
    }
}
