import { Link } from 'react-router-dom';
import { ethers } from 'ethers';

function Navigation({ account, setAccount }) {
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">Web3 Habit Tracker</Link>
      </div>
      <div className="nav-links">
        <Link to="/start-habit">Start Habit</Link>
        <Link to="/submit-proof">Submit Proof</Link>
        <Link to="/validator">Validator</Link>
      </div>
      <div className="wallet-section">
        {account ? (
          <span className="wallet-address">
            {`${account.substring(0, 6)}...${account.substring(38)}`}
          </span>
        ) : (
          <button className="connect-wallet" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation; 