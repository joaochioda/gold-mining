# Blockchain for GMINE

## Contracts

### Game contract deployed on bsc - testnet

`0x478110DD9Ea7fb535B592948181D290F1E52aD58`

### Token deployed on bsc - testnet

`0x748E7222f37c481424898b362C0C19D0bFD50FCa`

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
