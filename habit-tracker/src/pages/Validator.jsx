import { useState } from 'react';
import { ethers } from 'ethers';

function Validator({ account, contract }) {
  const [userAddress, setUserAddress] = useState('');
  const [habitDetails, setHabitDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);

  const fetchHabitDetails = async () => {
    if (!ethers.utils.isAddress(userAddress)) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    try {
      setLoading(true);
      const habit = await contract.getHabit(userAddress);
      setHabitDetails({
        description: habit.description,
        validator: habit.validator,
        stake: habit.stake.toString(),
        isActive: habit.isActive,
        lastProof: habit.lastProof
      });
    } catch (error) {
      console.error('Error fetching habit details:', error);
      alert('Error fetching habit details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (isSuccessful) => {
    if (!account || !contract) {
      alert('Please connect your wallet first!');
      return;
    }

    if (habitDetails.validator.toLowerCase() !== account.toLowerCase()) {
      alert('You are not the assigned validator for this habit!');
      return;
    }

    try {
      setValidating(true);
      const tx = await contract.validateHabit(userAddress, isSuccessful);
      await tx.wait();
      alert('Habit validated successfully!');
      // Refresh habit details
      await fetchHabitDetails();
    } catch (error) {
      console.error('Error validating habit:', error);
      alert('Error validating habit. Please try again.');
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="validator">
      <h1>Validate Habits</h1>
      
      <div className="search-section">
        <div className="form-group">
          <label htmlFor="userAddress">User Address</label>
          <input
            type="text"
            id="userAddress"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="Enter user's address (0x...)"
          />
        </div>
        <button 
          onClick={fetchHabitDetails}
          disabled={loading || !account}
          className="search-button"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {habitDetails && (
        <div className="habit-details">
          <h2>Habit Details</h2>
          <p><strong>Description:</strong> {habitDetails.description}</p>
          <p><strong>Validator:</strong> {habitDetails.validator}</p>
          <p><strong>Stake:</strong> {habitDetails.stake} wei</p>
          <p><strong>Status:</strong> {habitDetails.isActive ? 'Active' : 'Inactive'}</p>
          <p><strong>Last Proof:</strong> {habitDetails.lastProof || 'No proof submitted yet'}</p>

          {habitDetails.isActive && habitDetails.lastProof && 
           habitDetails.validator.toLowerCase() === account?.toLowerCase() && (
            <div className="validation-actions">
              <h3>Validate Latest Proof</h3>
              <div className="button-group">
                <button
                  onClick={() => handleValidate(true)}
                  disabled={validating}
                  className="success-button"
                >
                  {validating ? 'Validating...' : 'Mark as Success'}
                </button>
                <button
                  onClick={() => handleValidate(false)}
                  disabled={validating}
                  className="failure-button"
                >
                  {validating ? 'Validating...' : 'Mark as Failure'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Validator; 