import { expect } from "chai";
import { ethers } from "hardhat";
import {
  Game,
  Game__factory,
  GMINE,
  GMINE__factory,
  MockNFT,
  MockNFT__factory,
} from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Game Contract", function () {
  let GameFactory: Game__factory;
  let GMINEFactory: GMINE__factory;
  let NFTFactory: MockNFT__factory;
  let game: Game;
  let gmine: GMINE;
  let nft: MockNFT;
  let user: SignerWithAddress;

  beforeEach(async function () {
    GMINEFactory = await ethers.getContractFactory("GMINE");
    NFTFactory = await ethers.getContractFactory("MockNFT");
    GameFactory = await ethers.getContractFactory("Game");

    [user] = await ethers.getSigners();

    game = (await GameFactory.deploy()) as Game;

    gmine = (await GMINEFactory.deploy()) as GMINE;
    nft = (await NFTFactory.deploy()) as MockNFT;

    await game.setContracts(gmine.getAddress(), nft.getAddress());
    await gmine.setAuthorizedAddress(game.getAddress());
    await nft.setAuthorizedAddress(gmine.getAddress());
    await nft.setMockedRarity(0);
  });

  async function mintNFTAndStakeAndClaim(tokenId: number, time: number) {
    await mintNFTAndStake(tokenId, time);

    await game.connect(user).claimRewards();
  }

  async function mintNFT(tokenId: number, type = 0) {
    await nft.connect(user).mintNFT(type);

    await nft.connect(user).approve(game.getAddress(), tokenId);
    await game.connect(user).stakeNFT(tokenId);
  }

  async function mintNFTAndStake(tokenId: number, time: number) {
    await nft.connect(user).mintNFT(0);

    await nft.connect(user).approve(game.getAddress(), tokenId);
    await game.connect(user).stakeNFT(tokenId);

    await passTime(time);
  }

  async function passTime(time: number) {
    await ethers.provider.send("evm_increaseTime", [time]);
    await ethers.provider.send("evm_mine", []);
  }

  it("should allow staking of an NFT", async function () {
    await gmine
      .connect(user)
      .approve(nft.getAddress(), ethers.parseEther("100"));

    await mintNFTAndStakeAndClaim(1, 24 * 60 * 60 * 10);

    await nft.setMockedRarity(3);

    await mintNFT(2, 1);
    await passTime(24 * 60 * 60);

    const stakedNFTs = await game.getStakedNFTs();
    const totalRewards = await game.connect(user).calculateTotalRewards();

    expect(stakedNFTs[0][0]).to.equal(1n);
    expect(stakedNFTs[0][1]).to.equal(2n);

    expect(stakedNFTs[1][0]).to.equal(0);
    expect(stakedNFTs[1][1]).to.equal(1n);

    expect(stakedNFTs[2][0]).to.equal(0);
    expect(stakedNFTs[2][1]).to.equal(3n);

    expect(stakedNFTs[4][0]).to.equal(1000046296296296296n);
    expect(stakedNFTs[4][1]).to.equal(8000000000000000000n);

    expect(totalRewards).to.equal(9000046296296296296n);
  });

  it("should correctly calculate rewards for staked NFT", async function () {
    const tokenId = 1;
    await mintNFTAndStakeAndClaim(tokenId, 24 * 60 * 60);
    const userBalance = await gmine.balanceOf(user.address);

    const reward = await game.rewardsPerDay(0); // Worker reward
    const epsilon = 100000000000000n;
    expect(userBalance).to.be.closeTo(reward, epsilon);
  });

  it("should receive 25% + rewards for rarity 1", async function () {
    await nft.setMockedRarity(1);

    const tokenId = 1;
    await mintNFTAndStakeAndClaim(tokenId, 24 * 60 * 60);
    const userBalance = await gmine.balanceOf(user.address);

    let reward = await game.rewardsPerDay(0);
    reward = reward + reward / 4n;
    const epsilon = 100000000000000n;
    expect(userBalance).to.be.closeTo(reward, epsilon);
  });

  it("should receive 50% + rewards for rarity 2", async function () {
    await nft.setMockedRarity(2);

    const tokenId = 1;
    await mintNFTAndStakeAndClaim(tokenId, 24 * 60 * 60);
    const userBalance = await gmine.balanceOf(user.address);

    let reward = await game.rewardsPerDay(0);
    reward = reward + reward / 2n;
    const epsilon = 100000000000000n;
    expect(userBalance).to.be.closeTo(reward, epsilon);
  });

  it("should receive double rewards for rarity 3", async function () {
    await nft.setMockedRarity(3);

    const tokenId = 1;
    await mintNFTAndStakeAndClaim(tokenId, 24 * 60 * 60);
    const userBalance = await gmine.balanceOf(user.address);

    const reward = await game.rewardsPerDay(0);
    const epsilon = 100000000000000n;
    expect(userBalance).to.be.closeTo(reward * 2n, epsilon);
  });

  it("should double rewards when VIP NFT is staked", async function () {
    await gmine
      .connect(user)
      .approve(nft.getAddress(), ethers.parseEther("100"));

    const tokenId = 1;
    await mintNFTAndStakeAndClaim(tokenId, 24 * 60 * 60 * 50);

    await nft.connect(user).mintVIP(); // Mint a VIP NFT
    const vipTokenId = 2;

    await nft.connect(user).approve(user.getAddress(), vipTokenId);
    await nft.connect(user).approve(user.getAddress(), tokenId);

    await game.connect(user).stakeNFT(vipTokenId);
    await game.connect(user).stakeNFT(tokenId);

    const twoDays = 24 * 60 * 60 * 2;
    await ethers.provider.send("evm_increaseTime", [twoDays]);
    await ethers.provider.send("evm_mine", []);

    await game.connect(user).claimRewards();
    await game.connect(user).claimRewards();

    const userBalance = await gmine.balanceOf(user.address);

    const epsilon = 100000000000000n;
    expect(userBalance).to.be.closeTo(34000000000000000000n, epsilon);
  });

  it("should correctly update staking time after claiming rewards", async function () {
    const tokenId = 1;
    const day = 24 * 60 * 60;
    const time = await ethers.provider.getBlock("latest");
    const epsilon = day + 30;

    await mintNFTAndStakeAndClaim(tokenId, day);

    const stakeInfo = await game.stakes(tokenId);

    expect(stakeInfo).to.be.closeTo(time?.timestamp, epsilon);
  });

  it("should correctly calculate total rewards for all staked NFTs", async function () {
    await gmine
      .connect(user)
      .approve(nft.getAddress(), ethers.parseEther("100"));

    await mintNFTAndStakeAndClaim(1, 24 * 60 * 60 * 10);
    await mintNFT(2);
    await mintNFT(3);
    await mintNFT(4);

    await passTime(24 * 60 * 60);

    const baseReward = await game.rewardsPerDay(0);

    const expectedTotalReward = baseReward * 4n;

    const totalRewards = await game.connect(user).calculateTotalRewards();

    const epsilon = 1000000000000000n;
    expect(totalRewards).to.be.closeTo(expectedTotalReward, epsilon);
  });
});
