import { expect } from "chai";
import { ethers } from "hardhat";
import { GMINE } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("GMINE Token", function () {
  let gmine: GMINE;
  let owner: SignerWithAddress;
  let authorizedAddress: SignerWithAddress;
  let unauthorizedAddress: SignerWithAddress;
  let recipient: SignerWithAddress;

  beforeEach(async function () {
    [owner, authorizedAddress, recipient, unauthorizedAddress] =
      await ethers.getSigners();

    const TokenFactory = await ethers.getContractFactory("GMINE");
    gmine = (await TokenFactory.deploy()) as GMINE;
    await gmine.setAuthorizedAddress(authorizedAddress.address);
  });

  describe("Minting and Contract Balance", function () {
    it("should allow the authorized address to distribute tokens", async function () {
      const contractBalance = await gmine.balanceOf(gmine.getAddress());
      const expectedBalance = ethers.parseUnits("1000000000000", 18);
      expect(contractBalance).to.equal(999999999900000000000000000000n);
    });
  });

  describe("distributeTokens", function () {
    it("should allow the authorized address to distribute tokens", async function () {
      const transferAmount = ethers.parseUnits("100", 18);
      await gmine
        .connect(authorizedAddress)
        .distributeTokens(recipient.address, transferAmount);

      const recipientBalance = await gmine.balanceOf(recipient.address);

      expect(recipientBalance).to.equal(transferAmount);

      const contractBalance = await gmine.balanceOf(gmine.getAddress());
      expect(contractBalance).to.equal(999999999800000000000000000000n);
    });

    it("should not allow unauthorized addresses to distribute tokens", async function () {
      const transferAmount = ethers.parseUnits("100", 18);
      await expect(
        gmine
          .connect(unauthorizedAddress)
          .distributeTokens(recipient.address, transferAmount)
      ).to.be.revertedWith("Caller is not authorized");
    });
  });
});
