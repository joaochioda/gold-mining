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

    gmine = (await GMINEFactory.deploy(game.getAddress())) as GMINE;
    nft = (await NFTFactory.deploy(gmine.getAddress())) as MockNFT;

    await game.setContracts(gmine.getAddress(), nft.getAddress());
    await nft.setMockedRarity(0);
  });

  async function mintNFTAndStakeAnd(tokenId: number, time: number) {
    await nft.connect(user).mintNFT(0);

    await nft.connect(user).approve(game.getAddress(), tokenId);
    await game.connect(user).stakeNFT(tokenId);

    await ethers.provider.send("evm_increaseTime", [time]);
    await ethers.provider.send("evm_mine", []);

    await game.connect(user).claimRewards(tokenId);
  }

  it("should allow staking of an NFT", async function () {
    await nft.connect(user).mintNFT(0); // Mint a Worker NFT
    const tokenId = 1;

    await nft.connect(user).approve(user.getAddress(), tokenId);
    await game.connect(user).stakeNFT(tokenId);

    const stakedNFTs = await game.getStakedNFTs(user.address);
    expect(stakedNFTs[0]).to.equal(tokenId);
  });

  it("should correctly calculate rewards for staked NFT", async function () {
    const tokenId = 1;
    await mintNFTAndStakeAnd(tokenId, 24 * 60 * 60);
    const userBalance = await gmine.balanceOf(user.address);

    const reward = await game.rewardsPerDay(0); // Worker reward
    const epsilon = 100000000000000n;
    expect(userBalance).to.be.closeTo(reward, epsilon);
  });

  it("should receive 25% + rewards for rarity 1", async function () {
    await nft.setMockedRarity(1);

    const tokenId = 1;
    await mintNFTAndStakeAnd(tokenId, 24 * 60 * 60);
    const userBalance = await gmine.balanceOf(user.address);

    let reward = await game.rewardsPerDay(0);
    reward = reward + reward / 4n;
    const epsilon = 100000000000000n;
    expect(userBalance).to.be.closeTo(reward, epsilon);
  });

  it("should receive 50% + rewards for rarity 2", async function () {
    await nft.setMockedRarity(2);

    const tokenId = 1;
    await mintNFTAndStakeAnd(tokenId, 24 * 60 * 60);
    const userBalance = await gmine.balanceOf(user.address);

    let reward = await game.rewardsPerDay(0);
    reward = reward + reward / 2n;
    const epsilon = 100000000000000n;
    expect(userBalance).to.be.closeTo(reward, epsilon);
  });

  it("should receive double rewards for rarity 3", async function () {
    await nft.setMockedRarity(3);

    const tokenId = 1;
    await mintNFTAndStakeAnd(tokenId, 24 * 60 * 60);
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
    await mintNFTAndStakeAnd(tokenId, 24 * 60 * 60 * 50);

    await nft.connect(user).mintVIP(); // Mint a VIP NFT
    const vipTokenId = 2;

    await nft.connect(user).approve(user.getAddress(), vipTokenId);
    await nft.connect(user).approve(user.getAddress(), tokenId);

    await game.connect(user).stakeNFT(vipTokenId);
    await game.connect(user).stakeNFT(tokenId);

    const twoDays = 24 * 60 * 60 * 2;
    await ethers.provider.send("evm_increaseTime", [twoDays]);
    await ethers.provider.send("evm_mine", []);

    await game.connect(user).claimRewards(tokenId);
    await game.connect(user).claimRewards(vipTokenId);

    const userBalance = await gmine.balanceOf(user.address);

    const epsilon = 100000000000000n;
    expect(userBalance).to.be.closeTo(34000000000000000000n, epsilon);
  });

  it("should prevent claiming rewards for unstaked NFT", async function () {
    await mintNFTAndStakeAnd(1, 24 * 60 * 60);

    const tokenId = 2;

    await expect(game.connect(user).claimRewards(tokenId)).to.be.revertedWith(
      "NFT not staked by sender"
    );
  });

  it("should correctly update staking time after claiming rewards", async function () {
    const tokenId = 1;
    const day = 24 * 60 * 60;
    const time = await ethers.provider.getBlock("latest");
    const epsilon = day + 30;

    await mintNFTAndStakeAnd(tokenId, day);

    const stakeInfo = await game.stakes(tokenId);

    expect(stakeInfo).to.be.closeTo(time?.timestamp, epsilon);
  });
});
