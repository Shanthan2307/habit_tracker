// components/HabitForm.jsx
import { useState } from 'react';

function HabitForm({ account }) {
  const [habitName, setHabitName] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const simulateUpload = async () => {
    setLoading(true);
    setUploadProgress(0);

    // Simulate different stages of upload
    const stages = [20, 40, 60, 80, 100];
    
    for (const progress of stages) {
      await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 second delay between stages
      setUploadProgress(progress);
    }

    // Final delay before completing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setLoading(false);
    setUploadProgress(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!habitName.trim() || !stakeAmount) return;
  
    try {
      setError('');
      
      // Start the upload simulation
      await simulateUpload();
      
      // Create new habit object
      const newHabit = {
        description: habitName,
        stakeAmount: stakeAmount,
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        submitted: false,
        validated: false,
        proof: ""
      };
      
      // Save to local storage
      localStorage.setItem(`habit-${account}`, JSON.stringify(newHabit));
      
      // Reset form after successful save
      setHabitName('');
      setStakeAmount('');
    } catch (error) {
      console.error('Error creating habit:', error);
      setError('Error creating habit. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Start a New Habit</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="habitName" className="block text-sm font-medium text-gray-700">
            Habit Description
          </label>
          <input
            type="text"
            id="habitName"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., Exercise for 30 minutes daily"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="stakeAmount" className="block text-sm font-medium text-gray-700">
            Stake Amount (WND)
          </label>
          <input
            type="number"
            id="stakeAmount"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="0.1"
            min="0.1"
            step="0.1"
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 relative"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-white h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            'Start Habit'
          )}
        </button>
      </form>
    </div>
  );
}

export default HabitForm;