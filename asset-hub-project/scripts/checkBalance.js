const { ethers } = require('ethers');
const { createProvider, PROVIDER_RPC } = require('./connectToProvider');

const checkBalance = async (address) => {
  try {
    console.log(`Checking balance for address: ${address}`);
    
    // Create provider
    const provider = createProvider(
      PROVIDER_RPC.rpc,
      PROVIDER_RPC.chainId,
      PROVIDER_RPC.name
    );
    
    // Get balance
    const balance = await provider.getBalance(address);
    console.log(`\nBalance: ${ethers.formatEther(balance)} WND`);
    
  } catch (error) {
    console.error('Error checking balance:', error.message);
  }
};

// Replace with your address
const address = '0x139D2Fa5b09952F877ae18a553583C7d575Fd891';

checkBalance(address); 