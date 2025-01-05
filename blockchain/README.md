# Blockchain for GMINE

## Contracts

### Game contract deployed on bsc - testnet

`0xa20b0ab9158d91B92E5A9E051eF042Bba13b3560`

### Token deployed on bsc - testnet

`0x73aec9Ec07066382Fc68ec58b074E2737916fA6D`

## NFT deployed on bsc- testnet

`0x72d6ED336D19c8A28eeD2529E0EF9951e1a36425`

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
