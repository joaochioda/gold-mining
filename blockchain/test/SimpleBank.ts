import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { SimpleBank, VipStatus } from "../typechain-types";

describe("SimpleBank with VipStatus", function () {
  async function deployContractsFixture() {
    const [owner, user1, user2, user3] = await hre.ethers.getSigners();

    // Deploy VipStatus
    const VipStatus = await hre.ethers.getContractFactory("VipStatus");
    const vipStatus = (await VipStatus.deploy()) as VipStatus;
    await vipStatus.waitForDeployment();

    // Deploy SimpleBank com o endereço do VipStatus
    const SimpleBank = await hre.ethers.getContractFactory("SimpleBank");
    const simpleBank = await SimpleBank.deploy(
      (await vipStatus.getAddress()) as any
    );
    await simpleBank.waitForDeployment();

    return { simpleBank, vipStatus, owner, user1, user2, user3 };
  }

  describe("VIP Status Interaction", function () {
    it("Should double the deposit for VIP users", async function () {
      const { simpleBank, vipStatus, owner, user1 } = await loadFixture(
        deployContractsFixture
      );

      const depositAmount = hre.ethers.parseEther("1.0");

      // Define user1 como VIP
      await vipStatus.connect(owner).setVip(user1.address, true);

      // user1 deposita 1 ETH
      await simpleBank.connect(user1).setBalance({ value: depositAmount });

      // Verifica se o saldo foi dobrado
      const balance = await simpleBank.connect(user1).getBalance();
      expect(balance).to.equal(depositAmount * 2n);
    });

    it("Should not double the deposit for non-VIP users", async function () {
      const { simpleBank, user2 } = await loadFixture(deployContractsFixture);

      const depositAmount = hre.ethers.parseEther("1.0");

      // user2 deposita 1 ETH
      await simpleBank.connect(user2).setBalance({ value: depositAmount });

      // Verifica se o saldo não foi dobrado
      const balance = await simpleBank.connect(user2).getBalance();
      expect(balance).to.equal(depositAmount);
    });

    it("Should allow the owner to manage VIP status", async function () {
      const { vipStatus, owner, user3 } = await loadFixture(
        deployContractsFixture
      );

      // Define user3 como VIP
      await vipStatus.connect(owner).setVip(user3.address, true);

      // Verifica se o user3 é VIP
      const isVip = await vipStatus.isVip(user3.address);
      expect(isVip).to.equal(true);

      // Remove o status VIP de user3
      await vipStatus.connect(owner).setVip(user3.address, false);

      // Verifica se o user3 não é mais VIP
      const isVipAfter = await vipStatus.isVip(user3.address);
      expect(isVipAfter).to.equal(false);
    });

    it("Should revert if a non-owner tries to manage VIP status", async function () {
      const { vipStatus, user1, user2 } = await loadFixture(
        deployContractsFixture
      );

      await expect(
        vipStatus.connect(user1).setVip(user2.address, true)
      ).to.be.revertedWith("Only the owner can manage VIPs");
    });
  });
});
