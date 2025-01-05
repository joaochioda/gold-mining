# Blockchain for GMINE

## Contracts

### Game contract deployed on bsc - testnet

`0xa9507E123219fc410B21543b0f0A912538a76aDA`

### Totken deployed on bsc - testnet

`0x50dB3Dcb140688b6Bce59847f370392D505D0752`

## NFT deployed on bsc- testnet

`0x10591778De354a186F01d7a6159D1B872505FfB1`

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
