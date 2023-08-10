import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'antd/dist/reset.css';
import './assets/css/global.css';
import { AuthProvider } from './context/index.tsx';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { Web3Modal } from '@web3modal/react';

const chains = [mainnet];
const projectId = import.meta.env.VITE_APP_WALLET_CONNECT;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <WagmiConfig config={wagmiConfig}>
      <App />
      <Web3Modal
        themeVariables={{
          '--w3m-accent-color': '#7786d5',
          '--w3m-background-color': '#7786d5',
          '--w3m-text-medium-regular-size': '1.25rem',
        }}
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </WagmiConfig>
  </AuthProvider>,
);
