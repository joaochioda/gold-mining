// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Nft.sol";

contract MockNFT is NFT {
    Rarity private _mockedRarity;

    constructor(address _tokenContract) NFT(_tokenContract) {}

    function setMockedRarity(Rarity rarity) external {
        _mockedRarity = rarity;
    }

    function _determineRarity() internal view override returns (Rarity) {
        return _mockedRarity;
    }
}