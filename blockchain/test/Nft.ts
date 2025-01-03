import { expect } from "chai";
import { ethers } from "hardhat";
import { GMINE, GMINE__factory, NFT, NFT__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("GameNFT Contract", function () {
  let GMINE: GMINE__factory;
  let GameNFT: NFT__factory;
  let gmine: GMINE;
  let gameNFT: NFT;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  beforeEach(async function () {
    GMINE = await ethers.getContractFactory("GMINE");
    [owner, user] = await ethers.getSigners();
    gmine = (await GMINE.deploy(owner.address)) as GMINE;

    GameNFT = await ethers.getContractFactory("NFT");
    gameNFT = (await GameNFT.deploy(gmine.getAddress())) as NFT;
  });

  it("should set initial prices correctly", async function () {
    const workerPrice = await gameNFT.nftBasePrices(0); // Worker
    const machine1Price = await gameNFT.nftBasePrices(1); // Machine1
    const machine2Price = await gameNFT.nftBasePrices(2); // Machine2
    const vipPrice = await gameNFT.nftBasePrices(3); // VIP

    expect(workerPrice).to.equal(ethers.parseEther("1"));
    expect(machine1Price).to.equal(ethers.parseEther("4"));
    expect(machine2Price).to.equal(ethers.parseEther("16"));
    expect(vipPrice).to.equal(ethers.parseEther("20"));
  });

  it("should mint a Worker NFT and assign rarity", async function () {
    await gmine.distributeTokens(user.address, ethers.parseEther("10"));
    await gmine
      .connect(user)
      .approve(gameNFT.getAddress(), ethers.parseEther("1"));

    await gameNFT.connect(user).mintNFT(0);

    const tokenId = 1;
    const details = await gameNFT.getNFTDetails(tokenId);

    expect(details.nftType).to.equal(0);
    expect(details.rarity).to.be.oneOf([0n, 1n, 2n, 3n]);
  });

  it("should mint a VIP NFT with Normal rarity", async function () {
    // Transfer tokens to user
    await gmine.distributeTokens(user.address, ethers.parseEther("50"));
    await gmine
      .connect(user)
      .approve(gameNFT.getAddress(), ethers.parseEther("20"));

    // Mint a VIP NFT
    await gameNFT.connect(user).mintVIP();

    const tokenId = 1; // First token ID
    const details = await gameNFT.getNFTDetails(tokenId);

    expect(details.nftType).to.equal(3); // VIP
    expect(details.rarity).to.equal(0); // Normal
  });

  it("should deduct tokens from user balance after minting 2 workers", async function () {
    await gmine.distributeTokens(user.address, ethers.parseEther("10"));
    await gmine
      .connect(user)
      .approve(gameNFT.getAddress(), ethers.parseEther("2"));

    const initialBalance = await gmine.balanceOf(user.address);
    await gameNFT.connect(user).mintNFT(0);
    await gameNFT.connect(user).mintNFT(0);

    const finalBalance = await gmine.balanceOf(user.address);
    expect(finalBalance).to.equal(initialBalance - ethers.parseEther("1"));
  });

  it("should reject minting if user does not have enough tokens", async function () {
    await gmine
      .connect(user)
      .approve(gameNFT.getAddress(), ethers.parseEther("1"));

    await expect(gameNFT.connect(user).mintNFT(1)).to.be.revertedWith(
      "Insufficient balance"
    );
  });

  it("should assign rarities with correct probabilities (approximation)", async function () {
    const rarityCount = [0, 0, 0, 0]; // Normal, Uncommon, Rare, Epic

    await gmine.distributeTokens(user.address, ethers.parseEther("100"));
    await gmine
      .connect(user)
      .approve(gameNFT.getAddress(), ethers.parseEther("100"));

    for (let i = 0; i < 100; i++) {
      await gameNFT.connect(user).mintNFT(0);
      const details = await gameNFT.getNFTDetails(i + 1);
      rarityCount[Number(details.rarity)]++;
    }

    expect(rarityCount[0]).to.be.within(40, 60); // Normal (50%)
    expect(rarityCount[1]).to.be.within(20, 40); // Uncommon (30%)
    expect(rarityCount[2]).to.be.within(10, 20); // Rare (15%)
    expect(rarityCount[3]).to.be.within(0, 10); // Epic (5%)
  });
});
