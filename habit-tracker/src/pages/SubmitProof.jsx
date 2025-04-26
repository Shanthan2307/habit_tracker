import { useState, useEffect } from 'react';

function SubmitProof({ account, contract }) {
  const [habitDetails, setHabitDetails] = useState(null);
  const [proof, setProof] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingHabit, setLoadingHabit] = useState(true);

  useEffect(() => {
    const fetchHabitDetails = async () => {
      if (!account || !contract) return;

      try {
        const habit = await contract.getHabit(account);
        setHabitDetails({
          description: habit.description,
          validator: habit.validator,
          stake: habit.stake.toString(),
          isActive: habit.isActive
        });
      } catch (error) {
        console.error('Error fetching habit details:', error);
      } finally {
        setLoadingHabit(false);
      }
    };

    fetchHabitDetails();
  }, [account, contract]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account || !contract) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.submitProof(proof);
      await tx.wait();
      alert('Proof submitted successfully!');
      setProof('');
    } catch (error) {
      console.error('Error submitting proof:', error);
      alert('Error submitting proof. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingHabit) {
    return <div className="loading">Loading habit details...</div>;
  }

  if (!habitDetails?.isActive) {
    return (
      <div className="no-habit">
        <h2>No Active Habit Found</h2>
        <p>You don't have any active habits. Start one from the "Start Habit" page!</p>
      </div>
    );
  }

  return (
    <div className="submit-proof">
      <h1>Submit Habit Proof</h1>
      
      <div className="habit-details">
        <h2>Current Habit</h2>
        <p><strong>Description:</strong> {habitDetails.description}</p>
        <p><strong>Validator:</strong> {habitDetails.validator}</p>
        <p><strong>Stake:</strong> {habitDetails.stake} wei</p>
      </div>

      <form onSubmit={handleSubmit} className="proof-form">
        <div className="form-group">
          <label htmlFor="proof">Proof of Completion</label>
          <textarea
            id="proof"
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            placeholder="Describe how you completed your habit today..."
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading || !account}
        >
          {loading ? 'Submitting...' : 'Submit Proof'}
        </button>
      </form>
    </div>
  );
}

export default SubmitProof; 