// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
// import "hardhat/console.sol";

interface IGMINE {
    function distributeTokens(address recipient, uint256 amount) external;
}

interface INFT is IERC721 {
    function nftDetails(uint256 tokenId) external view returns (NFTInfo memory);

    struct NFTInfo {
        NFTType nftType;
        Rarity rarity;
    }

    enum NFTType {
        Worker,
        Machine1,
        Machine2,
        VIP
    }
    enum Rarity {
        Normal,
        Uncommon,
        Rare,
        Epic
    }
}

contract Game is Ownable {
    using EnumerableSet for EnumerableSet.UintSet;

    IGMINE public gmineToken;
    INFT public nftContract;

    struct StakeInfo {
        uint256 stakedAt;
    }

    mapping(uint256 => StakeInfo) public stakes;
    mapping(address => EnumerableSet.UintSet) private stakedNFTs;
    mapping(address => bool) public hasVIPStaked;

    uint256 private constant REWARD_INTERVAL = 1 seconds;
    uint256 private constant SECONDS_IN_A_DAY = 86400; // 24 * 60 * 60
    mapping(INFT.NFTType => uint256) public rewardsPerDay;

    constructor() Ownable(msg.sender) {}

    function setContracts(
        address _gmineToken,
        address _nftContract
    ) external onlyOwner {
        require(_gmineToken != address(0), "Invalid GMINE token address");
        require(_nftContract != address(0), "Invalid NFT contract address");

        gmineToken = IGMINE(_gmineToken);
        nftContract = INFT(_nftContract);

        rewardsPerDay[INFT.NFTType.Worker] = 1 * 10 ** 18;
        rewardsPerDay[INFT.NFTType.Machine1] = 4 * 10 ** 18;
        rewardsPerDay[INFT.NFTType.Machine2] = 16 * 10 ** 18;
        rewardsPerDay[INFT.NFTType.VIP] = 0; // VIP does not generate rewards directly.
    }

    function stakeNFT(uint256 tokenId) external {
        require(
            nftContract.ownerOf(tokenId) == msg.sender,
            "Not the owner of this NFT"
        );

        stakes[tokenId] = StakeInfo({stakedAt: block.timestamp});

        stakedNFTs[msg.sender].add(tokenId);

        if (nftContract.nftDetails(tokenId).nftType == INFT.NFTType.VIP) {
            hasVIPStaked[msg.sender] = true;
        }
    }

    function claimRewards() external {
        uint256 totalRewards = 0;
        address account = msg.sender;

        uint256 length = stakedNFTs[account].length();

        for (uint256 i = 0; i < length; i++) {
            uint256 reward = calculateReward(
                stakedNFTs[account].at(i),
                account
            );

            totalRewards += reward;
            stakes[stakedNFTs[account].at(i)].stakedAt = block.timestamp;
        }
        if (totalRewards > 0) {
            gmineToken.distributeTokens(account, totalRewards);
        }
    }

    function calculateReward(
        uint256 tokenId,
        address owner
    ) internal view returns (uint256) {
        StakeInfo memory stake = stakes[tokenId];

        uint256 timeStaked = block.timestamp - stake.stakedAt;
        uint256 dailyReward = rewardsPerDay[
            nftContract.nftDetails(tokenId).nftType
        ];
        INFT.Rarity rarity = nftContract.nftDetails(tokenId).rarity;

        if (rarity == INFT.Rarity.Uncommon) {
            dailyReward = (dailyReward * 125) / 100; // 25% a mais
        } else if (rarity == INFT.Rarity.Rare) {
            dailyReward = (dailyReward * 150) / 100; // 50% a mais
        } else if (rarity == INFT.Rarity.Epic) {
            dailyReward = dailyReward * 2; // 100% a mais
        }

        uint256 reward = (timeStaked * dailyReward) / SECONDS_IN_A_DAY;

        if (hasVIPStaked[owner]) {
            reward *= 2;
        }

        return reward;
    }

    function getStakedNFTs()
        external
        view
        returns (
            uint256[] memory tokenIds,
            INFT.NFTType[] memory nftTypes,
            INFT.Rarity[] memory rarities,
            uint256[] memory stakedAts,
            uint256[] memory rewards
        )
    {
        address account = msg.sender;
        uint256 length = stakedNFTs[account].length();
        tokenIds = new uint256[](length);
        nftTypes = new INFT.NFTType[](length);
        rarities = new INFT.Rarity[](length);
        stakedAts = new uint256[](length);
        rewards = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            uint256 tokenId = stakedNFTs[account].at(i);
            INFT.NFTInfo memory nftInfo = nftContract.nftDetails(tokenId);

            tokenIds[i] = tokenId;
            nftTypes[i] = nftInfo.nftType;
            rarities[i] = nftInfo.rarity;
            stakedAts[i] = stakes[tokenId].stakedAt;
            rewards[i] = calculateReward(tokenId, account);
        }
    }

    function calculateTotalRewards() external view returns (uint256) {
        uint256 totalRewards = 0;
        address account = msg.sender;

        uint256 length = stakedNFTs[account].length();

        for (uint256 i = 0; i < length; i++) {
            uint256 reward = calculateReward(
                stakedNFTs[account].at(i),
                account
            );

            totalRewards += reward;
        }

        return totalRewards;
    }
}
