import '../CSS/Mint.css'
import { useState } from 'react';
import axios from 'axios';
import { connectAccount } from 'enchantmask';
import { ThirdwebSDK, useContract } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import confetti from 'canvas-confetti';

const Mint = () => {

    const [Image, setImage] = useState("");
    const [NameNft, setNameNft] = useState("");
    const [DescNFT, setDescNFT] = useState("");
    const [ButtonClick, setButtonClick] = useState(false);
    const [Account, setAccount] = useState("");
    const [ConnectedState, setConnectedState] = useState(false);
    const { contract } = useContract("0xd6a3BF227569DEf525643914Db7A87ed3a98A731");


    const GenImage = async (e) => {

        e.preventDefault();

        setButtonClick(true);

        const Apikey = "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"

        const response = await axios({
            url: "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",

            method: 'POST',

            headers: {
                Authorization: `Bearer ${Apikey}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:5173/',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            data: JSON.stringify({
                inputs: `${DescNFT}`,
                options: { wait_for_model: true }
            }),

            responseType: 'arraybuffer',

        })

        const type = response.headers['content-type'];

        const data = response.data;

        console.log(data);

        const uint8Array = new Uint8Array(data);

        const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');

        const base64Data = btoa(binaryString);

        const img = `data:${type};base64,` + base64Data;

        setImage(img);
    }

    const MintNft = async () => {

        const providers = new ethers.providers.Web3Provider(window.ethereum);

        const Signers = new ethers.Wallet("5ad7f7823ac4a9518b1ce47b007c63c150bc31382d6878d48cce4abb2cc707ef", providers);

        const sdk = ThirdwebSDK.fromSigner(Signers)
        sdk.wallet.connect(Signers);

        const ContractAsa = await sdk.getContract("0xd6a3BF227569DEf525643914Db7A87ed3a98A731");

        await ContractAsa.roles.grant("minter", Account);

        const metadata = {
            name: NameNft,
            description: DescNFT,
            image: Image,
        }

        const transaction = await contract.erc721.mintTo(Account, metadata);
        const tokenId = transaction.id;
        const nft = await transaction.data();

        console.log(tokenId);
        console.log(nft);
        console.log('NFT is Minted Successfully');
        blast();

    }

    const blast = async () => {
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }

    const ConnnectM = async () => {
        setConnectedState(true);
        const AccountC = await connectAccount()
        setAccount(AccountC);
    }


    return (
        <>

            <div className='NFTDiv'>

                <h3>NFTPlayGround</h3>

                <br />

                <button className="pushable" style={{ marginLeft: "30px" }} onClick={ConnnectM}>
                    <span className="shadow"></span>
                    <span className="edge"></span>
                    <span className="front" id='munde'>
                        {!ConnectedState ? "Connect🦊" : "Connected 🔗"}
                    </span>
                </button>

                {ConnectedState && <h5>Connected Account :{Account}</h5>}


                {ConnectedState && <div className="login-box">

                    <form>
                        <div className="user-box">
                            <input type="text" name="" required="" onChange={(e) => { setNameNft(e.target.value) }} />
                            <label>Name</label>
                        </div>
                        <div className="user-box">
                            <input type="text" name="" required="" onChange={(e) => { setDescNFT(e.target.value) }} />
                            <label>Description</label>
                        </div><center>
                            <button onClick={GenImage}>
                                Generate
                                <span></span>
                            </button></center>
                    </form>
                </div>}

            </div>



            {ConnectedState && ButtonClick && <div className='ImageDiv'>

                <h4 className='NftP'>Your Image</h4>

                <br />
                <br />

                <img src={Image} alt='' height={"300px"} width={"300px"} />

                <br />
                <br />


                <div style={{ margin: "auto", display: 'block', width: "fit-content" }} onClick={MintNft}>
                    <button className="pushable">
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front" id='munde'>
                            Mint ☣️
                        </span>
                    </button>
                </div>


            </div>}




        </>
    )
}

export default Mint