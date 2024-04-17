# Berachain Web BHoney NFT Minting App

An example UI and API that allows users to mint a soulbound NFT and allow it to dynamicly update based on how much `$bHoney` a user has.

## Requirements

- NodeJS `v20.11.0` or greater
- Wallet With Berachain - (See [Berachain Faucet](https://artio.faucet.berachain.com))
- Wallet With `$bHoney` - (See [Berachain Berps Vault](https://artio.berps.berachain.com/vault))
- [WalletConnect Project ID](https://cloud.walletconnect.com)
- Docker for local postgres database

## Quick Start

### 1 - Install Depdencies

```bash
# FROM: ./apps/web

pnpm install;
```

### 2 - Add Environment Variables

```bash
# FROM: ./apps/web

cp .env.example .env;
```

Replace this value

**File:** `./apps/script/.env`

```bash
# Contracts and wallets"
WALLET_PRIVATE_KEY="<0xYOUR_WALLET_PRIVATE_KEY>"

# ...

# WalletConnect - Sign up here https://cloud.walletconnect.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="<YOUR_WALLETCONNECT_PROJECT_ID>"
```

### 3 - Start Docker Container

```bash
# FROM: ./apps/web

pnpm db:up;

# [Expected Output]:
# [+] Running 1/2
#  ⠙ Network nft_default  Created                                                                            0.2s 
#  ✔ Container nft-db-1   Started    
```

### 4 - Generate Migration

```bash
# FROM: ./apps/web

pnpm db:gen;

# [Expected Output]:
# drizzle-kit: v0.20.14
# drizzle-orm: v0.30.7
# 
# No config path provided, using default 'drizzle.config.ts'
# Reading config file '/Users/mannybera/Documents/github/berachain-irys/apps/web/drizzle.config.ts'
# 1 tables
# nft_holders 8 columns 0 indexes 0 fks
# 
# No schema changes, nothing to migrate 😴
```

### 5 - Push Migration

```bash
# FROM: ./apps/web

pnpm db:push;

# [Expected Output]:
# drizzle-kit: v0.20.14
# drizzle-orm: v0.30.7
# 
# No config path provided, using default path
# Reading config file '/Users/mannybera/Documents/github/berachain-irys/apps/web/drizzle.config.ts'
# [✓] Changes applied
```

### 6 - Run NextJS

```bash
# FROM: ./apps/web

pnpm dev;

# [Expected Output]:
#    ▲ Next.js 14.1.1
#    - Local:        http://localhost:3000
#    - Environments: .env
# 
#  ✓ Ready in 1389ms
```
