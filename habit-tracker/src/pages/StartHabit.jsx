import { useState } from 'react';
import { ethers } from 'ethers';

function StartHabit({ account, contract }) {
  const [formData, setFormData] = useState({
    description: '',
    validator: '',
    stake: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account || !contract) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.startHabit(
        formData.description,
        formData.validator,
        { value: ethers.utils.parseEther(formData.stake) }
      );
      await tx.wait();
      alert('Habit created successfully!');
      setFormData({ description: '', validator: '', stake: '' });
    } catch (error) {
      console.error('Error creating habit:', error);
      alert('Error creating habit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="start-habit">
      <h1>Start a New Habit</h1>
      <form onSubmit={handleSubmit} className="habit-form">
        <div className="form-group">
          <label htmlFor="description">Habit Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="E.g., Exercise for 30 minutes daily"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="validator">Validator Address</label>
          <input
            type="text"
            id="validator"
            name="validator"
            value={formData.validator}
            onChange={handleChange}
            placeholder="0x..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stake">Stake Amount (ETH)</label>
          <input
            type="number"
            id="stake"
            name="stake"
            value={formData.stake}
            onChange={handleChange}
            placeholder="0.1"
            step="0.01"
            min="0"
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading || !account}
        >
          {loading ? 'Creating...' : 'Start Habit'}
        </button>
      </form>
    </div>
  );
}

export default StartHabit; 