import '../CSS/Demo.css';
import { useState } from 'react';
import { switchChain, getPublicEncryptionKey, connectAccount, signMessage, getBlockNumber, getchainId, getGasPrice, getBlockinformation, getTransactionCountofBlock, getTransactionInformation } from 'enchantmask';

const Demo = () => {

    const [ChainInput, setChainInput] = useState("");
    const [PublicKey, setPublicKey] = useState("");
    const [Acc, setAcc] = useState("");
    const [SignInPut, setSignInPut] = useState("");
    const [BlokcInput, setBlokcInput] = useState("");
    const [TransCount, setTransCount] = useState(0);
    const [Block1, setBlock1] = useState("");
    const [Tra1, setTra1] = useState(" ")

    const SwithchingChains = async () => {
        const ChainInputNumber = Number(ChainInput);
        await switchChain(ChainInputNumber);
    }

    const getPKey = async () => {
        const Key = await getPublicEncryptionKey();
        setPublicKey(Key);
    }

    const Connecta = async () => {
        const Account = await connectAccount();
        setAcc(Account);
    }

    const SignmsgGiven = async () => {
        const signedmsg = await signMessage(SignInPut);
        alert(`Signed Msg ${signedmsg}`);
    }

    const GetBLock = async () => {
        const blokcNumber = await getBlockNumber();
        alert(blokcNumber);
    }

    const checkChain = async () => {
        const chain1 = await getchainId();
        alert(chain1);
    }

    const Gasp = async () => {
        const gasp = await getGasPrice();
        alert(gasp);
    }

    const GetBlokcinfo = async () => {
        const info = await getBlockinformation(BlokcInput);
        alert(info.transactions);
    }

    const GetTransactioncount = async () => {
        const tr = await getTransactionCountofBlock(TransCount);
        alert(tr);
    }

    const GetTra1 = async () => {
        const tr1 = await getTransactionInformation(Block1, Tra1);
        alert(tr1.hash);
    }

    return (
        <>

            <h2 className='Heady'>METATOOL</h2>

            <div className='Bapp'>
                <div className='MainDiv'>

                    <div className='FirstDiv'>

                        <p>SwitchChain() ⛓️</p>

                        <div className="input-container100">
                            <input type="text" placeholder="Enter ChainID(e.g. 80001)" onChange={(e) => { setChainInput(e.target.value) }} />
                            <button className="button" onClick={SwithchingChains}>Change</button>
                        </div>

                        <br />

                        <hr />

                        <p>Public Key🔑</p>
                        <button className="pushable" style={{ marginTop: '30px' }} onClick={getPKey}>
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front" id='munde'>
                                Provide
                            </span>
                        </button>
                        {PublicKey && <h4 className='Pub'>Your Key is : {PublicKey}</h4>}


                        <br />
                        <br />


                        <hr />

                        <p>Account 😈</p>
                        <button className="pushable" style={{ marginTop: '30px' }} onClick={Connecta}>
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front" id='munde'>
                                Connect
                            </span>
                        </button>
                        {Acc && <h4 className='Pub'>Connected {Acc}</h4>}

                    </div>


                    <div className='SecondDiv'>

                        <p>SignMessage() ☣️</p>

                        <div className="input-container100">
                            <input type="text" placeholder="Enter Message" onChange={(e) => { setSignInPut(e.target.value) }} />
                            <button className="button" onClick={SignmsgGiven}>Sign</button>
                        </div>

                        <br />

                        <hr />

                        <p>BlockNumber 🔢</p>

                        <button className="pushable" style={{ marginTop: '30px' }} onClick={GetBLock}>
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front" id='munde'>
                                Check
                            </span>
                        </button>

                        <br />
                        <br />

                        <hr />

                        <p>ChainID() 🔗</p>

                        <button className="pushable" style={{ marginTop: '30px' }} onClick={checkChain}>
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front" id='munde'>
                                Check
                            </span>
                        </button>

                        <br />
                        <br />
                        <hr />


                    </div>


                    <div className='ThirdDiv'>

                        <p>GasPrice ⛽</p>

                        <button className="pushable" style={{ marginTop: '30px' }} onClick={Gasp}>
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front" id='munde'>
                                Get
                            </span>
                        </button>

                        <br />

                        <br />


                        <hr />

                        <p>BlockInformation 🅱️</p>

                        <div className="input-container100">
                            <input type="text" placeholder="Enter BlockNumber" onChange={(e) => { setBlokcInput(e.target.value) }} />
                            <button className="button" onClick={GetBlokcinfo}>Get</button>
                        </div>


                        <br />
                        <br />

                        <hr />

                        <p>TransactionCount 🔢</p>

                        <div className="input-container100">
                            <input type="text" placeholder="Enter BlokcNumber" onChange={(e) => { setTransCount(e.target.value) }} />
                            <button className="button" onClick={GetTransactioncount}>Get</button>
                        </div>


                    </div>



                </div>

                <div className='NicheDiv'>

                    <p>Single Transaction 💥</p>

                    <div className="input-container100">
                        <input type="text" placeholder="Enter BlokcNumber" onChange={(e) => { setBlock1(e.target.value) }} />
                    </div>

                    <div className="input-container100">
                        <input type="text" placeholder="Enter TransactionNumber" onChange={(e) => { setTra1(e.target.value) }} />
                        <button className="button" onClick={GetTra1}>Get</button>
                    </div>

                </div>



            </div>






        </>
    )
}

export default Demo