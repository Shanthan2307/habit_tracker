const { ethers } = require('ethers');
const { createProvider, PROVIDER_RPC } = require('./connectToProvider');

const viewHabitState = async (contractAddress, userAddress) => {
  try {
    console.log(`Checking habit state for user: ${userAddress}`);
    
    // Create provider
    const provider = createProvider(
      PROVIDER_RPC.rpc,
      PROVIDER_RPC.chainId,
      PROVIDER_RPC.name
    );
    
    // Check if contract exists at the address
    const code = await provider.getCode(contractAddress);
    if (code === '0x') {
      console.error('No contract deployed at the specified address');
      return;
    }
    console.log('Contract exists at address');
    
    // Create a contract instance to read the habit
    const abi = [
      "function getHabit(address) view returns (tuple(string description, uint256 stakeAmount, address validator, uint256 deadline, bool submitted, bool validated, string proof))"
    ];
    const contract = new ethers.Contract(contractAddress, abi, provider);
    
    // Get the habit data
    const habit = await contract.getHabit(userAddress);
    console.log('\nHabit Data:');
    console.log(`Description: ${habit.description}`);
    console.log(`Stake Amount: ${ethers.formatEther(habit.stakeAmount)} WND`);
    console.log(`Validator: ${habit.validator}`);
    console.log(`Deadline: ${new Date(Number(habit.deadline) * 1000).toISOString()}`);
    console.log(`Submitted: ${habit.submitted}`);
    console.log(`Validated: ${habit.validated}`);
    console.log(`Proof: ${habit.proof}`);
    
  } catch (error) {
    console.error('Error fetching habit state:', error.message);
  }
};

// Replace with your contract address and user address
const contractAddress = '0x92c902ec722Ed71E904C3b9490749DB3d1259bC4';
const userAddress = '0x139D2Fa5b09952F877ae18a553583C7d575Fd891';

viewHabitState(contractAddress, userAddress); 