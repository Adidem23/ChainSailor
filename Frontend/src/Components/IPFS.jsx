import { useState } from 'react';
import '../CSS/IPFS.css';
import lighthouse from '@lighthouse-web3/sdk';

const IPFS = () => {

  const [TextInput, setTextInput] = useState("");
  const [ClickedState, setClickedState] = useState(false);
  const [IPFSURI, setIPFSURI] = useState("");


  const TextUpload = async () => {
    setClickedState(true);
    const apiKey = "5d14fb84.6703a7602eed44a9941ee7c2ec7f09a2";
    const name = "Adidem23";
    const response = await lighthouse.uploadText(TextInput, apiKey, name);
    setIPFSURI(response.data.Hash);
  }

  return (
    <>

      <div className='ipfsDiv'>

        <h2>Upload Data To IPFS</h2>

        <br />
        <br />
        <br />

        <textarea className='textareaChu' onChange={(e) => { setTextInput(e.target.value) }}></textarea>

        <br />
        <br />
        <br />



        <button className="pushable" onClick={TextUpload}>
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front" id='munde'>
            Upload
          </span>
        </button>

        <br />
        <br />
        <br />

        {ClickedState && <a style={{listStyle:"none",textDecoration:"none" , color:"white",fontSize:"1.2rem"}} href={`https://ipfs.io/ipfs/${IPFSURI}`} target={"_blank"}>IPFS URI</a>}

      </div>


    </>
  )
}

export default IPFS