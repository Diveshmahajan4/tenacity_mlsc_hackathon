const express = require("express");
const fetch = require('node-fetch');
// const imgEl = document.querySelector(".img-one");

const app = express();
app.use(express.static("public"));

const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: '{"prompt":"orange and banana","height":512,"width":512,"model":"stable-diffusion-2","n_images":1}'
};

var link;

// var link1 ="https://oaidalleapiprodscus.blob.core.windows.net/private/org-S5slvMoYAyvlprF4lKs5jt16/user-MAvKx76Taxh2gIdCWn8xnqpY/img-46aG36FFdRd1DBOQ3a22ADh4.png?st=2023-02-25T05%3A26%3A50Z&se=2023-02-25T07%3A26%3A50Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-25T03%3A01%3A12Z&ske=2023-02-26T03%3A01%3A12Z&sks=b&skv=2021-08-06&sig=1XO42mwCVkIDbdZE95npGzxDGbj/AVU4tArZ4jvMsN4%3D";

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  // for (var i = 0; i < 4; i++) {
    // fetch(api_url, {
    //   method: 'POST',
    //   body: JSON.stringify(params),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    fetch('https://v1.genr.ai/api/circuit-element/generate-image', options)
    .then(response => response.json())
    .then(async function(response){
      link = await response.output;
      console.log(link);
    })
    .catch(err => console.error(err));
   res.setHeader("Content-Type", "text/html");
    res.write('<img src="' + link + '"' +" />");
    console.log(link);
    // res.write('<img src="' + link1 + '"' +" />");
    res.send();
      
  // }

});

app.listen(3000, function () {
  console.log("Server is Running on port 3000")
})
