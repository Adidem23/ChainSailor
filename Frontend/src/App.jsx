import ComposeAll from '../src/Components/ComposeAll';
import Demo from '../src/Components/Demo';
import { Routes, Route } from 'react-router-dom';
import Web3 from './Components/Web3';
import Mint from './Components/Mint';
const activeChainId = 80001;
import { ThirdwebSDKProvider } from '@thirdweb-dev/react'
import { ethers } from 'ethers';
import IPFS from './Components/IPFS';

const App = () => {
  return (
    <>
      <ThirdwebSDKProvider activeChain={activeChainId} signer={new ethers.providers.Web3Provider(window.ethereum).getSigner()}
        clientId="5fb26c268ed64fb73d9fb6010411dca9">
        <Routes>
          <Route path='/' Component={ComposeAll} />
          <Route path='/metatool' Component={Demo} />
          <Route path='/web3' Component={Web3} />
          <Route path='/mint' Component={Mint} />
          <Route path='/ipfs' Component={IPFS} />
        </Routes>
      </ThirdwebSDKProvider>
    </>
  )
}

export default App