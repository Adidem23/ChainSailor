import '../CSS/Web3.css';
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyDfazWK5xqM82qJqxGTfqrWMac6PE8Cz6o");
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const Web3 = () => {

  const [Input, setInput] = useState("");
  const [ActualResult, setActualResult] = useState("");
  const [Clicked, setClicked] = useState(false);

  const SendRestoGemini = async () => {
    setClicked(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `${Input}`
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const realtext = JSON.stringify(response.text());
      const formattedcode = formatCodeString(realtext, 250);
      setActualResult(formattedcode)
    } catch (err) {
      alert(`${err} is occured`);
    }

  }

  const Anotherres = async () => {
    setClicked(false);
    setActualResult("");
    setInput("");
  }

  const formatCodeString = (str, maxLen) => {
    const regex = new RegExp(`.{1,${maxLen}}`, 'g');
    return str.match(regex).join('\n');
  };


  return (
    <>

      <div className='web3main'>

        <div className='WEB3First'>
          <h1>WEB3GPT</h1>
        </div>

        <br />
        <br />
        <br />

        <div className='WEB3Second'>
          <div className="input-container">
            <input type="text" name="text" className="input" placeholder="Message..." onChange={(e) => { setInput(e.target.value) }} />
          </div>

          {!Clicked ? <button className="pushable" style={{ marginTop: '30px' }} onClick={SendRestoGemini}>
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front" id='munde'>
              Ask GPT 🔮
            </span>
          </button> : <>{!ActualResult ? <p>GPT is Thinking...</p> : <>
            <p>Result is :</p>
            <button className="pushable" style={{ marginTop: '30px' }} onClick={Anotherres}>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front" id='munde'>
                Ask Another Res 🔮
              </span>
            </button>
          </>}</>}

        </div>


        <div className='Web3third'>
          {ActualResult && <SyntaxHighlighter customStyle={{ fontSize: "16px" ,width:'700px' , marginTop:"50px",height:'100px'}} language="java" style={dracula}>
            {ActualResult}
          </SyntaxHighlighter>}
        </div>


      </div>

    </>
  )
}

export default Web3