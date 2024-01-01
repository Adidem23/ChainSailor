import ComposeAll from '../src/Components/ComposeAll';
import Demo from '../src/Components/Demo';
import {Routes,Route} from 'react-router-dom';
import Web3 from './Components/Web3';
import MintPage from './Components/MintPage';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' Component={ComposeAll} />
      <Route path='/metatool' Component={Demo} />
      <Route path='/web3' Component={Web3} />
      <Route path='/NFT' Component={MintPage} />
    </Routes>

    </>
  )
}

export default App