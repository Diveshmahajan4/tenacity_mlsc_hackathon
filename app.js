const express = require("express");
const fetch = require('node-fetch');

const api_url = "https://v1.genr.ai/api/circuit-element/generate-image";

const params = {
    "prompt": "generate poster for advertisemnet of sauce",
    "height": 512,
    "width": 512,
    "model": "dall-e",
    "n_images": 1
  }


  for(var i = 0; i < 1 ; i++){
        fetch(api_url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(data => console.log((data.output)))
    .catch(error => console.error(error));
  }
