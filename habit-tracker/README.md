# Web3 Habit Tracker dApp

A decentralized habit tracking application built with React and Ethereum smart contracts, designed to run on Polkadot's Moonbeam network.

## Features

- Connect MetaMask wallet
- Create new habits with stake
- Submit daily proofs of habit completion
- Validate other users' habits
- Clean and responsive UI without external libraries

## Prerequisites

- Node.js (v14 or later)
- MetaMask browser extension
- Some GLMR tokens for gas fees (if using Moonbeam)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd habit-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Configure the contract address:
Edit the `CONTRACT_ADDRESS` constant in `src/pages/Home.jsx` to match your deployed contract address.

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Connect Wallet**
   - Click "Connect Wallet" in the navigation bar
   - Approve the MetaMask connection

2. **Start a Habit**
   - Navigate to "Start Habit"
   - Fill in the habit description
   - Add validator's address
   - Set stake amount
   - Submit transaction through MetaMask

3. **Submit Proof**
   - Go to "Submit Proof"
   - Write your proof of completion
   - Submit the proof through MetaMask

4. **Validate Habits**
   - Access the "Validator" page
   - Enter the user's address
   - View their habit details
   - Validate their latest proof

## Smart Contract Integration

The dApp integrates with a Solidity smart contract deployed on Moonbeam. Make sure to:

1. Use the correct contract address
2. Configure MetaMask to connect to Moonbeam network:
   - Network Name: Moonbeam
   - RPC URL: https://rpc.api.moonbeam.network
   - Chain ID: 1284
   - Currency Symbol: GLMR

## Development

- Built with Vite + React
- Uses ethers.js for Web3 integration
- Pure CSS for styling (no external UI libraries)
- React Router for navigation

## License

MIT
