// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface IGMINE {
    function transferFrom(address sender, address recipient, uint256 amount) external;
}

contract NFT is ERC721 {
    IGMINE public tokenContract;

    enum NFTType { Worker, Machine1, Machine2, VIP }
    enum Rarity { Normal, Uncommon, Rare, Epic }

    struct NFTInfo {
        NFTType nftType;
        Rarity rarity;
    }

    mapping(uint256 => NFTInfo) public nftDetails;
    mapping(NFTType => uint256) public nftBasePrices;

    uint256 private _nextTokenId;

    constructor(address _tokenContract) ERC721("NFT", "GNFT") {
        require(_tokenContract != address(0), "Invalid token contract address");
        tokenContract = IGMINE(_tokenContract);

        nftBasePrices[NFTType.Worker] = 1 * 10 ** 18;
        nftBasePrices[NFTType.Machine1] = 4 * 10 ** 18;
        nftBasePrices[NFTType.Machine2] = 16 * 10 ** 18;
        nftBasePrices[NFTType.VIP] = 20 * 10 ** 18;

        _nextTokenId = 1;
    }

    function mintNFT(NFTType _nftType) external {
        require(_nftType != NFTType.VIP, "Cannot mint VIP randomly");

        uint256 price = nftBasePrices[_nftType];
        require(price > 0, "Invalid NFT type");

        tokenContract.transferFrom(msg.sender, address(this), price);

        Rarity rarity = _determineRarity();

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(msg.sender, tokenId);

        nftDetails[tokenId] = NFTInfo({
            nftType: _nftType,
            rarity: rarity
        });
    }

    function mintVIP() external {
        uint256 price = nftBasePrices[NFTType.VIP];
        require(price > 0, "Invalid VIP price");

        tokenContract.transferFrom(msg.sender, address(this), price);

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(msg.sender, tokenId);

        nftDetails[tokenId] = NFTInfo({
            nftType: NFTType.VIP,
            rarity: Rarity.Normal
        });
    }

    function _determineRarity() internal view returns (Rarity) {
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, _nextTokenId))) % 100;

        if (rand < 50) {
            return Rarity.Normal;
        } else if (rand < 80) {
            return Rarity.Uncommon;
        } else if (rand < 95) {
            return Rarity.Rare;
        } else {
            return Rarity.Epic;
        }
    }

    function nftDetailsOf(uint256 _tokenId) external view returns (NFTInfo memory) {
        return nftDetails[_tokenId];
    }
}