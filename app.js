const express = require("express");
const fetch = require('node-fetch');
const bodyParser = require("body-parser");
// const imgEl = document.querySelector(".img-one");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var link = "";
var link1 = "";
var link2 = "";
var link3 = "";
var link4 = "";
var link5 = "";

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async function (req, res) {
// prompt Generation
const brandNameEl = req.body.brandName;
const featureEl = req.body.feature;
const domainEl = req.body.domain;

var prompt = "Advertisement of " + brandNameEl + " with this " + featureEl + " in the this domain " + domainEl;

const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: `{"prompt":"${prompt}","height":512,"width":512,"model":"dall-e","n_images":3}`
};
const options1 = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: `{"prompt":"${prompt}","height":512,"width":512,"model":"stable-diffusion-2","n_images":1}`
};
const options2 = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: `{"prompt":"${prompt}","height":512,"width":512,"model":"dreamlike-diffusion","n_images":1}`
};
const options3 = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: `{"prompt": "${prompt}","height":512,"width":512,"model":"open-journey","n_images":1}`
};
const options4 = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: `{"product_description":"${prompt}","temperature":0.5,"platform":"Twitter","target_audience":"Gen Z"}`
};


// Fetcinfg from ai
fetch('https://v1.genr.ai/api/circuit-element/generate-image', options)
.then(response => response.json())
.then(async function (response) {
  link2 = await response.output[1];
  link3=await response.output[2];
  link4=await response.output[3];
  await console.log(link2);
  await console.log(link3);
  await console.log(link4);
  
})
fetch('https://v1.genr.ai/api/circuit-element/generate-image', options1)
.then(response => response.json())
.then(async function (response) {
  link1 = await response.output;
  await console.log(link1);
})
fetch('https://v1.genr.ai/api/circuit-element/generate-image', options2)
.then(response => response.json())
.then(async function (response) {
  link = await response.output;
  await console.log(link);
})
fetch('https://v1.genr.ai/api/circuit-element/generate-image', options3)
.then(response => response.json())
.then(async function (response) {
  link5 = await response.output;
  await console.log(link5);
})
fetch('https://v1.genr.ai/api/circuit-element/generate-product-ad', options4)
.then(response => response.json())
.then(async function (response) {
  description = await response.output;
  await console.log(description);
})
.catch(err => console.error(err));

async function setImg(res){
  
  await res.setHeader("Content-Type", "text/html");
  await res.write("<h1>" + description + "</h1>");
  await res.write('<img src="' + link + '"' + " />");
  await res.write('<img src="' + link1 + '"' + " />");
  await res.write('<img src="' + link2 + '"' + " />");
  await res.write('<img src="' + link3 + '"' + " />");
  await res.write('<img src="' + link4 + '"' + " />");
  await res.write('<img src="' + link5 + '"' + " />");
  
  await res.send();
}

setTimeout(function (){
  setImg(res)
}, 60000);
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is Running on port 3000")
})
