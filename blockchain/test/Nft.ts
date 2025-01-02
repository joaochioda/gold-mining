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
});
