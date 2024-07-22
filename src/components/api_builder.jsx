import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Navbar from './navbar3';
import Connect from './Connect';
import { useLocation } from 'react-router-dom';

const Api_builder = () => {
  const location = useLocation();
  const [userWalletAddress, setUserWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [abi, setAbi] = useState('');
  const [address, setAddress] = useState('');
  const [writeFunctions, setWriteFunctions] = useState([]);
  const [readFunctions, setReadFunctions] = useState([]);
  const [network, setNetwork] = useState(null);
  const [walletPopup, setWalletPopup] = useState(false);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email'));
  const [openWriteFunctionInputs, setOpenWriteFunctionInputs] = useState({});
  const [openReadFunctionInputs, setOpenReadFunctionInputs] = useState({});
  const [readResults, setReadResults] = useState({});
  const [writeTransactionStatus, setWriteTransactionStatus] = useState('');

  // Function to toggle open state of write function inputs
  const toggleWriteFunctionInputs = (funcName) => {
    setOpenWriteFunctionInputs(prevState => ({
      ...prevState,
      [funcName]: !prevState[funcName]
    }));
  };

  // Function to toggle open state of read function inputs
  const toggleReadFunctionInputs = (funcName) => {
    setOpenReadFunctionInputs(prevState => ({
      ...prevState,
      [funcName]: !prevState[funcName]
    }));
  };

  // Effect to initialize Web3 and retrieve user's wallet address
  useEffect(() => {
    // Initialize Web3 and enable MetaMask connection
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setUserWalletAddress(web3Instance.eth.defaultAccount);
          window.web3 = web3Instance;
        } catch (error) {
          console.error('User denied account access or no MetaMask installed', error);
          // alert('Please install MetaMask or any Ethereum Extension Wallet');
        }
      } else {
        console.log('Please install MetaMask or any Ethereum Extension Wallet');
        // alert('Please install MetaMask or any Ethereum Extension Wallet');
      }
    };

    initializeWeb3();
  }, []);

  // Effect to initialize contract based on location state or localStorage
  useEffect(() => {
    const initializeContract = async (abi, address) => {
      try {
        if (!abi || !address) {
          throw new Error('ABI or Address is missing');
        }

        const parsedAbi = Array.isArray(abi) ? abi : JSON.parse(abi); // Ensure ABI is parsed as an array
        if (!Array.isArray(parsedAbi)) {
          throw new Error('ABI is not an array');
        }

        if (!window.web3.utils.isAddress(address)) {
          throw new Error('Invalid contract address');
        }

        const contractInstance = new window.web3.eth.Contract(parsedAbi, address);
        setContract(contractInstance);

        const writeFuncs = parsedAbi.filter(
          (item) => item.type === 'function' && (item.stateMutability !== 'view' && item.stateMutability !== 'pure')
        );
        const readFuncs = parsedAbi.filter(
          (item) => item.type === 'function' && (item.stateMutability === 'view' || item.stateMutability === 'pure')
        );
        setWriteFunctions(writeFuncs);
        setReadFunctions(readFuncs);

        console.log('Contract initialized with ABI:', parsedAbi);
        console.log('Contract address:', address);
      } catch (error) {
        console.error('Error initializing contract:', error.message);
        // alert(`Error initializing contract: ${error.message}`);
      }
    };

    const initializeOnLoad = async () => {
      if (location.state && location.state.address && location.state.abi) {
        setAddress(location.state.address);
        setAbi(location.state.abi);
        initializeContract(location.state.abi, location.state.address);
      } else {
        const savedAbi = window.localStorage.getItem('abi');
        const savedContractAddress = window.localStorage.getItem('contractAddress');

        if (savedAbi) {
          setAbi(savedAbi);
        }

        if (savedContractAddress) {
          setAddress(savedContractAddress);
          initializeContract(savedAbi, savedContractAddress);
        }
      }

      // Connect user wallet automatically if not connected
      // if (!userWalletAddress && window.ethereum) {
      //   await initializeWeb3();
      // }
    };

    initializeOnLoad();
  }, [location.state, userWalletAddress, location.state.address, location.state.abi]);

  const handleReadFunction = async (functionName) => {
    try {
      if (!contract || !contract.methods) {
        throw new Error('Contract not initialized or methods not available');
      }
  
      // Extract input values relative to the button clicked
      const inputs = Array.from(document.getElementById(`read-${functionName}-inputs`)?.children || [])
      .filter(element => element.nodeName === 'INPUT')
      .map(input => input.value);

    console.log("Inputs: ", inputs);
  
      let result;
      if (inputs.length > 0) {
        result = await contract.methods[functionName](...inputs).call();
      } else {
        result = await contract.methods[functionName]().call();
      }
  
      console.log("Raw result: ", result);
  
      // Decode and process the result as needed
      // ...
  
    } catch (error) {
      console.error(`Error reading ${functionName}:`, error);
      alert(`Error reading ${functionName}: ${error.message}`);
    }
  };
  
  
  
  
  // Function to handle write function execution
  const handleWriteFunction = async (event, functionName) => {
    event.preventDefault();

    try {
      if (!contract || !contract.methods) {
        throw new Error('Contract not initialized or methods not available');
      }

      if (!userWalletAddress) {
        throw new Error('Wallet address not found');
      }

      const inputs = Array.from(document.querySelectorAll(`#write-${functionName}-inputs input`)).map(input => input.value);

      console.log("Inputs: ", inputs);

      const transaction = contract.methods[functionName](...inputs);
      const gas = await transaction.estimateGas({ from: userWalletAddress });

      setWalletPopup(true);
      const receipt = await transaction.send({
        from: userWalletAddress,
        gas
      });

      console.log("Transaction receipt: ", receipt);

      setWriteTransactionStatus(`${functionName} executed successfully`);
    } catch (error) {
      console.error(`Error executing ${functionName}:`, error);
      setWriteTransactionStatus(`Error executing ${functionName}: ${error.message}`);
    } finally {
      setWalletPopup(false);
    }
  };

  return (
    <div className="bg-gradient-to-br overflow-x-hidden bg-gray-200 min-h-screen flex flex-col items-center text-white pt-5">
      <Navbar email={userEmail} />
      <div className='hidden'>
        <Connect setUserWalletAddress={setUserWalletAddress} setNetwork={setNetwork} />
      </div>
      <div className="lg:container lg:mx-auto mx-10 my-5 p-6 relative">
        <div className="absolute top-0 mt-4 lg:mr-4 bg-white bg-opacity-20 p-4 rounded-md shadow-2xl drop-shadow-2xl text-black">
          <h2 className="font-semibold">Contract Address</h2>
          <p className="break-words">{address}</p>
        </div>
        <h1 className="text-center my-20 xl:text-4xl lg:text-4xl text-2xl text-black font-semibold">Interact with Ethereum Contract</h1>
        {contract && (
          <div id="container" className="container mt-10">
            <div>
              <h1 className='py-4 text-black font-semibold text-3xl mx-0 md:mx-20'>Write Functions</h1>
            </div>
            {writeFunctions.map((func, idx) => (
              <div
                className="group mb-6 p-4 border shadow-2xl drop-shadow-2xl rounded-md mx-0 md:mx-20 bg-white bg-opacity-20 cursor-pointer"
                key={idx}
                onClick={() => toggleWriteFunctionInputs(func.name)}
              >
                <div className="flex items-center justify-between">
                  <button
                    className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-700 transition duration-200"
                    onClick={(event) => handleWriteFunction(event, func.name)}
                  >
                    {func.name}
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ml-4 ${openWriteFunctionInputs[func.name] ? 'transform rotate-90' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {openWriteFunctionInputs[func.name] && (
                  <div id={`write-${func.name}-inputs`}>
                    {func.inputs.map((input, i) => (
                      <input
                        key={i}
                        id={`write-${func.name}-${i}`}
                        className="mt-2 p-2 rounded-md w-full border-2 hover:border-gray-400 bg-white bg-opacity-20 text-gray-800 placeholder:text-gray-600"
                        type="text"
                        placeholder={`${input.type} ${input.name}`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ))}
                  </div>
                )}
                {/* Display transaction status */}
                {writeTransactionStatus && (
                  <div className="mt-2 text-sm text-gray-400">
                    {writeTransactionStatus}
                  </div>
                )}
              </div>
            ))}
            <div>
              <h1 className='py-4 text-black font-semibold text-3xl mx-0 md:mx-20'>Read Functions</h1>
            </div>
            {readFunctions.map((func, idx) => (
              <div
                className="group mb-6 p-4 border shadow-2xl drop-shadow-2xl rounded-md mx-0 md:mx-20 bg-white bg-opacity-20 cursor-pointer"
                key={idx}
                onClick={() => toggleReadFunctionInputs(func.name)}
              >
                <div className="flex items-center justify-between">
                  <button
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    onClick={() => handleReadFunction(func.name)} // Ensure correct function call
                  >
                    {func.name}
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ml-4 ${openReadFunctionInputs[func.name] ? 'transform rotate-90' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {openReadFunctionInputs[func.name] && (
                  <div id={`read-${func.name}-inputs`} className="mt-4">
                    {func.inputs.map((input, i) => (
                      <div key={i} className="mb-2">
                        <label htmlFor={`read-${func.name}-${i}`} className="block text-sm font-medium text-gray-800">{input.name}</label>
                        <input
                          type="text"
                          id={`read-${func.name}-${i}`}
                          name={input.name}
                          className="mt-2 p-2 rounded-md w-full border-2 hover:border-gray-400 bg-white bg-opacity-20 text-gray-800 placeholder:text-gray-600"
                          placeholder={input.type}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    ))}
                    <div className="mt-2">
                      <strong className="block text-sm font-medium text-gray-900">Result:</strong>
                      <span id={`read-${func.name}-result`} className="block mt-1 p-2 bg-gray-300 rounded-md text-black">
                        {readResults[func.name] !== undefined ? readResults[func.name] : 'No result yet'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Api_builder;