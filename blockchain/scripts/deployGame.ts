import { ethers } from "hardhat";

async function main() {
  console.log("Iniciando o deploy do contrato...");

  try {
    const Game = await ethers.getContractFactory("Game");
    console.log("Factory do contrato obtida com sucesso.");

    const game = await Game.deploy();
    console.log("Deploy iniciado, aguardando confirmação...");

    const receipt = await game.deploymentTransaction();
    const address = await game.getAddress();
    console.log("Contrato implantado com sucesso!");
    console.log(`Endereço do contrato: ${address}`);
  } catch (error) {
    console.error("Erro durante o processo de deploy:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erro inesperado:", error);
    process.exit(1);
  });
