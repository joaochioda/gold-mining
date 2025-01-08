# Blockchain for GMINE

## Contracts

### Game contract deployed on bsc - testnet

`0xb7F26F5F7CA85651507a09e364e04F1447B0F5bC`

### Token deployed on bsc - testnet

`0x39F23F725480e78466DF0e5181Ea39DA9284F53E`

## NFT deployed on bsc- testnet

`0xBD947DDc1E8B4015b5ECEC410744e68689eD1cAB`

## Some usefuls commands

```shell
REPORT_GAS=true npx hardhat test
npx hardhat typechain
npx hardhat compile
```

## Flat contract

`npx hardhat flatten ./contracts/Game.sol > ./flattened/GameFlattened.sol`

## Deploy contract

`npx hardhat run scripts/deployGame.ts --network bscTestnet`

## Verify contract

`npx hardhat verify --network bscTestnet <contract> <arguments>`
