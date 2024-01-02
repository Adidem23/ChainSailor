import React, { useState } from 'react'

const MintPage = () => {

  const [IMg, setIMg] = useState("")

  const generateImage = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "key": "X3kpRSnNhNgDjCRgvrixUzp2T86djeFsxiwnBIztR1ewedHcItFRko7UrvEf",
      "prompt": "cat",
      "negative_prompt": null,
      "width": "512",
      "height": "512",
      "samples": "1",
      "num_inference_steps": "20",
      "seed": null,
      "guidance_scale": 7.5,
      "safety_checker": "yes",
      "multi_lingual": "no",
      "panorama": "no",
      "self_attention": "no",
      "upscale": "no",
      "embeddings_model": null,
      "webhook": null,
      "track_id": null
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://stablediffusionapi.com/api/v3/text2img", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log("result is : "+result);
        setIMg(result.output);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div>
      <button onClick={generateImage}>Click</button>
      <img src={IMg} alt='No Img' />
    </div>
  )
}

export default MintPage