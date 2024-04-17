# Berachain Irys Dynamic bHoney NFT

A simple implementation of creating a Dynamic ERC721 token that relies on Irys Mutable Ref URLs that can only be updated by the wallet owner.
The dynamic functionality is manually updated through the UI which will update the mutable reference url based on how much `$bHoney` the user has.

![Berachain Irys Dynamic bHoney NFT](/README/berachain-irys-dynamic-nft.png)

## Requirements

- NodeJS `v20.11.0` or greater
- Wallet With Berachain - (See [Berachain Faucet](https://artio.faucet.berachain.com))
- Wallet With `$bHoney` - (See [Berachain Berps Vault](https://artio.berps.berachain.com/vault))
- [WalletConnect Project ID](https://cloud.walletconnect.com)
- Docker for local postgres database

## Repo Structure

This repository is setup with Turbo repo as a monorepo.

> **TIP:** Start with `./apps/web` and follow its `README.md` instructions.

- `./apps/contract` - Main ERC721 contract code exists and how to deploy it
- `./apps/script` - Irys script that uploads initiation images
- `./apps/web` - Main NFT UI minting app and api


