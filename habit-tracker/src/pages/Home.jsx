import { useEffect } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0xD6a85FE887c7868698Fe59c6ebe7eECfe0A22df4';
const CONTRACT_ABI = [[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "stake",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "validator",
        "type": "address"
      }
    ],
    "name": "HabitStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "name": "HabitValidated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "proof",
        "type": "string"
      }
    ],
    "name": "ProofSubmitted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "STAKE_DEADLINE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getHabit",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "stakeAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "validator",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "submitted",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "validated",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "proof",
            "type": "string"
          }
        ],
        "internalType": "struct HabitTracker.Habit",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "habits",
    "outputs": [
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "stakeAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "validator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "submitted",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "validated",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "proof",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "validator",
        "type": "address"
      }
    ],
    "name": "startHabit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "proof",
        "type": "string"
      }
    ],
    "name": "submitProof",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "name": "validateHabit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]]; // Replace with your contract ABI

function Home({ account, contract, setContract }) {
  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum && account && !contract) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const habitContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer
          );
          setContract(habitContract);
        } catch (error) {
          console.error('Error initializing contract:', error);
        }
      }
    };

    initContract();
  }, [account, contract, setContract]);

  return (
    <div className="home">
      <h1>Welcome to Web3 Habit Tracker</h1>
      <div className="home-content">
        <h2>Build Better Habits with Blockchain</h2>
        <p>
          Track your habits and stay accountable with the power of smart contracts.
          Set goals, stake tokens, and have your progress validated by trusted peers.
        </p>
        <div className="features">
          <div className="feature">
            <h3>🎯 Set Goals</h3>
            <p>Create habits and set your commitment level</p>
          </div>
          <div className="feature">
            <h3>💰 Stake Tokens</h3>
            <p>Put your tokens at stake to stay motivated</p>
          </div>
          <div className="feature">
            <h3>✅ Get Validated</h3>
            <p>Have trusted validators verify your progress</p>
          </div>
        </div>
        {!account && (
          <div className="cta">
            <p>Connect your wallet to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home; 