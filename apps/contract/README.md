# Berachain Irys BHoneyNFT Contract Script

Main BHoneyNFT contract that is an ERC721.

## Requirements

- NodeJS `v20.11.0` or greater
- Wallet With Berachain - (See [Berachain Faucet](https://artio.faucet.berachain.com))

## Quick Start

### 1 - Install Depdencies

```bash
# FROM: ./apps/contract

pnpm install;
```

### 2 - Add Environment Variables

```bash
# FROM: ./apps/contract

cp .env.example .env;
```

Replace this value

**File:** `./apps/contract/.env`

```bash
# Contracts and wallets"
WALLET_PRIVATE_KEY="<0xYOUR_WALLET_PRIVATE_KEY>"
```

### 3 - Run Deployment

```bash
# FROM: ./apps/contract

pnpm deploy:berachain;

# [Expected Prompts & Outputs]:
# ✔ Confirm deploy to network berachainTestnet (80085)? … yes
# Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
#   --> contracts/BHoneyNFT.sol:72:9:
#    |
# 72 |         address _to,
#    |         ^^^^^^^^^^^
# 
# 
# Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
#   --> contracts/BHoneyNFT.sol:73:9:
#    |
# 73 |         uint256 _tokenId
#    |         ^^^^^^^^^^^^^^^^
# 
# 
# Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
#   --> contracts/BHoneyNFT.sol:80:9:
#    |
# 80 |         address _operator,
#    |         ^^^^^^^^^^^^^^^^^
# 
# 
# Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
#   --> contracts/BHoneyNFT.sol:81:9:
#    |
# 81 |         bool _approved
#    |         ^^^^^^^^^^^^^^
# 
# 
# Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
#   --> contracts/BHoneyNFT.sol:88:9:
#    |
# 88 |         address _owner,
#    |         ^^^^^^^^^^^^^^
# 
# 
# Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
#   --> contracts/BHoneyNFT.sol:89:9:
#    |
# 89 |         address operator
#    |         ^^^^^^^^^^^^^^^^
# 
# 
# Compiled 17 Solidity files successfully (evm target: paris).
# Hardhat Ignition 🚀
# 
# Deploying [ BHoneyNFTModule ]
# 
# Batch #1
#   Executed BHoneyNFTModule#BHoneyNFT
# 
# [ BHoneyNFTModule ] successfully deployed 🚀
# 
# Deployed Addresses
# 
# BHoneyNFTModule#BHoneyNFT - 0x0F11e434ebC194153f9C882a1e9be78Bde5ebf42
```

## Verify Contract

```bash
# FROM: ./apps/contract

pnpm verify:berachain "0x0F11e434ebC194153f9C882a1e9be78Bde5ebf42" "https://gateway.irys.xyz/" "-36380APpMgU5PQVsE8uHuGubx5rv1ZxuLGJETvz0Ec";

# [Expected Output]:
# Successfully submitted source code for contract
# contracts/BHoneyNFT.sol:BHoneyNFT at 0x0F11e434ebC194153f9C882a1e9be78Bde5ebf42
# for verification on the block explorer. Waiting for verification result...
#
# Successfully submitted source code for contract
# contracts/BHoneyNFT.sol:BHoneyNFT at 0x0F11e434ebC194153f9C882a1e9be78Bde5ebf42
# for verification on the block explorer. Waiting for verification result...
# 
# Successfully verified contract BHoneyNFT on the block explorer.
# https://artio.beratrail.io/address/0x0F11e434ebC194153f9C882a1e9be78Bde5ebf42#code
# !!! NOTE: Should be: https://artio.beratrail.io/address/0x0F11e434ebC194153f9C882a1e9be78Bde5ebf42/contract/80085/code
```

## Run Tests

```bash
# FROM: ./apps/contract

pnpm test;

# [Expected Output]:
#   BHoneyNFT
#     Deployment
#       ✔ Should deploy with default values (287ms)
#     Minting
#       ✔ Should mint an NFT
#       ✔ Should not mint more than one NFT
# 
# 
#   3 passing (303ms)
```
