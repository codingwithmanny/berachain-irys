# Berachain Irys Upload Script

A script that uploads images to arweave with Irys and creates a base mutable reference transaction, paid with $BERA native token.

## Requirements

- NodeJS `v20.11.0` or greater
- Wallet With Berachain - (See [Berachain Faucet](https://artio.faucet.berachain.com))

## Quick Start

### 1 - Install Depdencies

```bash
# FROM: ./apps/script

pnpm install;
```

### 2 - Add Environment Variables

```bash
# FROM: ./apps/script

cp .env.example .env;
```

Replace this value

**File:** `./apps/script/.env`

```bash
# Contracts and wallets"
WALLET_PRIVATE_KEY="<0xYOUR_WALLET_PRIVATE_KEY>"
```

### 3 - Run Upload Script

```bash
# FROM: ./apps/script

pnpm upload;

# [Expected Output]:
# main()
#   {
#     allFiles: [
#       'bera-irys-00-placeholder.png',
#       'bera-irys-01.png',
#       'bera-irys-02.png',
#       'bera-irys-03.png',
#       'bera-irys-04.png',
#       'bera-irys-05.png',
#       'bera-irys-06.png',
#       'bera-irys-07.png',
#       'bera-irys-08.png',
#       'bera-irys-09.png'
#     ]
#   }
#   { fileSizes: 74317 }
#   Connected to Irys from 0xYourWalletAddress
#   { price: '0.003221506403229612 $bera' }
#   { currentBalance: '0.031112788577202238 $bera' }
#   Uploading files...
#   https://gateway.irys.xyz/LgE8H04XXKx3RMUYN7gWtv65nwMtVxJ2AsGOjr4fYfw
#   https://gateway.irys.xyz/z96_wiRiePlZY2yHO7l91kAVrFUpyDKyJ10cV-aliF4
#   https://gateway.irys.xyz/huoCmXgzx2RL2UJmEfagMwjYJbKAvq-NmidDWMYjwuU
#   https://gateway.irys.xyz/ihomfDqu-hf5ht1uHX4-Urcs1Q3LXQB4lA2XMWZstNw
#   https://gateway.irys.xyz/khAwOQye6FwVo3dke6lxpjQB9Lk2cs8KWC2YabKX6YA
#   https://gateway.irys.xyz/a-Q7IXEy735yWCOEfgp1bgGSD9vLawTT2O3LBpESvA0
#   https://gateway.irys.xyz/uCH9_hFquLGestxxqpb8fOzkvqmH9ml97yBBBWAMYVE
#   https://gateway.irys.xyz/7CzvqdpM4oscYYp_mnIu2JWbsiDGl0mjwX6vrFsLDKk
#   https://gateway.irys.xyz/5Zs-q3DZU3fvvNYfLjFWzzsEFSw9pXppGtnNn1Dr4hM
#   https://gateway.irys.xyz/hgP7XfpI9oYiyGnkV_TJjgA8xiqT61HKR7u4o1Q6BHM
#   {
#     mutableRefURI: 'https://gateway.irys.xyz/789l69TwFiVulTNzETK2zHTdVs9oUY-3dRzrBY8f3RE'
#   }
# Script complete.
```

## Example Files Uploaded

```bash
https://gateway.irys.xyz/LgE8H04XXKx3RMUYN7gWtv65nwMtVxJ2AsGOjr4fYfw
https://gateway.irys.xyz/z96_wiRiePlZY2yHO7l91kAVrFUpyDKyJ10cV-aliF4
https://gateway.irys.xyz/huoCmXgzx2RL2UJmEfagMwjYJbKAvq-NmidDWMYjwuU
https://gateway.irys.xyz/ihomfDqu-hf5ht1uHX4-Urcs1Q3LXQB4lA2XMWZstNw
https://gateway.irys.xyz/khAwOQye6FwVo3dke6lxpjQB9Lk2cs8KWC2YabKX6YA
https://gateway.irys.xyz/a-Q7IXEy735yWCOEfgp1bgGSD9vLawTT2O3LBpESvA0
https://gateway.irys.xyz/uCH9_hFquLGestxxqpb8fOzkvqmH9ml97yBBBWAMYVE
https://gateway.irys.xyz/7CzvqdpM4oscYYp_mnIu2JWbsiDGl0mjwX6vrFsLDKk
https://gateway.irys.xyz/5Zs-q3DZU3fvvNYfLjFWzzsEFSw9pXppGtnNn1Dr4hM
https://gateway.irys.xyz/hgP7XfpI9oYiyGnkV_TJjgA8xiqT61HKR7u4o1Q6BHM
https://gateway.irys.xyz/789l69TwFiVulTNzETK2zHTdVs9oUY-3dRzrBY8f3RE
```

