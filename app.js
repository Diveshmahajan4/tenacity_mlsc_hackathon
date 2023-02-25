const express = require("express");
const fetch = require('node-fetch');

const app = express();
app.use(express.static("public"));

const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: '{"prompt":"advertisement banner of biscuits","height":512,"width":512,"model":"stable-diffusion-2","n_images":1}'
};
const options1 = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: '{"prompt":"advertisement banner","height":512,"width":512,"model":"stable-diffusion-2","n_images":1}'
};

var link = "";
var link1 = "";

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async function (req, res) {
  fetch('https://v1.genr.ai/api/circuit-element/generate-image', options)
    .then(response => response.json())
    .then(async function (response) {
      link = await response.output;
      await console.log(link);
    })
    fetch('https://v1.genr.ai/api/circuit-element/generate-image', options1)
    .then(response => response.json())
    .then(async function (response) {
      link1 = await response.output;
      await console.log(link1);
    })

    function setImg(res){
      res.setHeader("Content-Type", "text/html");
      res.write('<img src="' + link + '"' + " />");
      res.write('<img src="' + link1 + '"' + " />");
      res.send();
    }
    
    setTimeout(function (){
      setImg(res)
    }, 18000);
});

app.listen(3000, function () {
  console.log("Server is Running on port 3000")
})
