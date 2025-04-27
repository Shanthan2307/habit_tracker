// components/HabitList.jsx
import { useState, useEffect } from 'react';

function HabitList({ account }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mintingProgress, setMintingProgress] = useState(0);
  const [mintingHabit, setMintingHabit] = useState(null);

  const fetchHabits = () => {
    try {
      setLoading(true);
      // Get all habits from localStorage
      const allHabits = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('habit-')) {
          const habitData = JSON.parse(localStorage.getItem(key));
          allHabits.push({
            ...habitData,
            deadline: new Date(habitData.deadline),
            account: key.replace('habit-', '')
          });
        }
      }
      setHabits(allHabits);
    } catch (error) {
      console.error('Error fetching habits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [account]);

  const simulateMinting = async (habit, index) => {
    setMintingHabit(habit);
    setSubmitting(true);
    setMintingProgress(0);

    // Simulate different stages of minting
    const stages = [
      { progress: 20, message: "Uploading proof to IPFS..." },
      { progress: 40, message: "Generating NFT metadata..." },
      { progress: 60, message: "Minting NFT on blockchain..." },
      { progress: 80, message: "Confirming transaction..." },
      { progress: 100, message: "NFT minted successfully!" }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between stages
      setMintingProgress(stage.progress);
    }

    // Final delay before removing the habit
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Remove the habit
    localStorage.removeItem(`habit-${habit.account}`);
    const updatedHabits = [...habits];
    updatedHabits.splice(index, 1);
    setHabits(updatedHabits);
    
    setSubmitting(false);
    setMintingHabit(null);
    setMintingProgress(0);
  };

  const handleProofSubmission = async (file, habitIndex) => {
    try {
      const habit = habits[habitIndex];
      await simulateMinting(habit, habitIndex);
    } catch (error) {
      console.error('Error submitting proof:', error);
      setSubmitting(false);
      setMintingHabit(null);
      setMintingProgress(0);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No habits found. Start one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {habits.map((habit, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">{habit.description}</h2>
            <span className="text-sm px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
              {habit.account.slice(0, 6)}...{habit.account.slice(-4)}
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Stake Amount</h3>
              <p className="mt-1 text-gray-600">{habit.stakeAmount} WND</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Deadline</h3>
              <p className="mt-1 text-gray-600">
                {habit.deadline.toLocaleDateString()} at {habit.deadline.toLocaleTimeString()}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Status</h3>
              <p className="mt-1 text-gray-600">
                {habit.submitted ? 'Proof submitted' : 'Proof pending'}
              </p>
            </div>
            
            {!habit.submitted && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Submit Proof</h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleProofSubmission(e.target.files[0], index)}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-purple-100"
                  disabled={submitting}
                />
                {submitting && mintingHabit === habit && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${mintingProgress}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {mintingProgress < 20 && "Starting minting process..."}
                      {mintingProgress >= 20 && mintingProgress < 40 && "Uploading proof to IPFS..."}
                      {mintingProgress >= 40 && mintingProgress < 60 && "Generating NFT metadata..."}
                      {mintingProgress >= 60 && mintingProgress < 80 && "Minting NFT on blockchain..."}
                      {mintingProgress >= 80 && mintingProgress < 100 && "Confirming transaction..."}
                      {mintingProgress === 100 && "NFT minted successfully!"}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {habit.submitted && habit.proof && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Proof</h3>
                <img 
                  src={habit.proof} 
                  alt="Proof of habit completion" 
                  className="max-w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HabitList;