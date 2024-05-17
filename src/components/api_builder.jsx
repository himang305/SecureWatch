import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import '../App.css';

const Api_builder = () => {
  const [userWalletAddress, setUserWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [abi, setAbi] = useState('');
  const [address, setAddress] = useState('');
  const [writeFunctions, setWriteFunctions] = useState([]);
  const [readFunctions, setReadFunctions] = useState([]);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const savedAddress = window.localStorage.getItem('userWalletAddress');
      if (savedAddress) {
        setUserWalletAddress(savedAddress);
      }
    } else {
      alert('Please install MetaMask or any Ethereum Extension Wallet');
    }
  }, []);

  const handleConnectWallet = async () => {
    if (window.web3) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAccount = accounts[0];
        setUserWalletAddress(selectedAccount);
        window.localStorage.setItem('userWalletAddress', selectedAccount);
        const netId = await window.web3.eth.net.getId();
        setNetwork(netId);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('wallet not found');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const parsedAbi = JSON.parse(abi);
      setAbi(parsedAbi);
      if (address) {
        const contractInstance = new window.web3.eth.Contract(parsedAbi, address);
        setContract(contractInstance);
        setWriteFunctions(parsedAbi.filter(item => item.type === 'function' && (item.stateMutability !== 'view' && item.stateMutability !== 'pure')));
        setReadFunctions(parsedAbi.filter(item => item.type === 'function' && (item.stateMutability === 'view' || item.stateMutability === 'pure')));
      }
    } catch (error) {
      alert('Invalid ABI or Address');
    }
  };

  const handleWriteFunction = async (functionName, inputs) => {
    try {
      await contract.methods[functionName](...inputs).send({ from: userWalletAddress });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadFunction = async (functionName, inputs) => {
    try {
      const result = await contract.methods[functionName](...inputs).call();
      alert(JSON.stringify(result));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App bg-white pb-64">
      <h1>Get Web3 API List</h1>
      <div className="form-container">
        <button className="connect_wallet" onClick={handleConnectWallet}>Connect Wallet!</button>
        <div id="wallet-info" className="wallet-info">
          <span className="address">Wallet Address: {userWalletAddress}</span><br />
          <span className="network">Network: {network}</span>
        </div>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <label>Paste Contract ABI:</label>
        <input
          className="form-input"
          type="text"
          value={abi}
          onChange={(e) => setAbi(e.target.value)}
        />
        <label>Paste Contract Address:</label>
        <input
          className="form-input"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="form-submit" type="submit">Submit</button>
      </form>

      <div id="container" className="container">
        {writeFunctions.map((func, idx) => (
          <div className="group" key={idx}>
            <button onClick={() => handleWriteFunction(func.name, func.inputs.map(input => document.getElementById(`write-${func.name}-${input.name}`).value))}>
              {func.name}
            </button>
            {func.inputs.map((input, i) => (
              <input
                key={i}
                id={`write-${func.name}-${input.name}`}
                type="text"
                placeholder={`${input.type} ${input.name}`}
              />
            ))}
          </div>
        ))}
        {readFunctions.map((func, idx) => (
          <div className="group" key={idx}>
            <button className="read_button" onClick={() => handleReadFunction(func.name, func.inputs.map(input => document.getElementById(`read-${func.name}-${input.name}`).value))}>
              {func.name}
            </button>
            {func.inputs.map((input, i) => (
              <input
                key={i}
                id={`read-${func.name}-${input.name}`}
                type="text"
                placeholder={`${input.type} ${input.name}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Api_builder;
