import { ethers } from "hardhat";

async function main() {
  console.log("Iniciando o deploy do contrato...");

  try {
    const GMINE = await ethers.getContractFactory("GMINE");
    console.log("Factory do contrato obtida com sucesso.");

    const token = await GMINE.deploy();
    console.log("Deploy iniciado, aguardando confirmação...");

    const address = await token.getAddress();
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
