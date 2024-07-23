import '@rainbow-me/rainbowkit/styles.css';
import './polyfills';
import './index.css';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  sepolia,
  lineaSepolia
} from 'wagmi/chains';

import { ToastContainer } from 'react-toastify';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'walletConnect',
  projectId: 'Securedapp',
  chains: [
    mainnet,
    polygon,
    polygonMumbai,
    optimism,
    arbitrum,
    base,
    sepolia,
    lineaSepolia,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [sepolia]||[lineaSepolia] : []),
  ],
});

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ToastContainer />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();