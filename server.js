const express = require("express");
const app = express();
const fs = require("fs");
const uuid = require("uuid");
const cors = require("cors");

app.use(cors());
app.use(express.static("./public"));
app.use(express.json()); // This middleware allows us to post JSON in req.body
app.use(cors());

const videos = require("./routes/Videos");

app.use((req, res, next) => {
  console.log("Incoming request: ", req.path);

  next(); // You have to call next if you want to proceed to next middleware
});

app.get("/", function (req, res) {
  console.log("Response Succsessful");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
});

app.get("/register", function (req, res) {
  console.log("Register Endpoint Called");
  const registeredAPIKeys = fs.readFileSync("./data/registeredAPIKEYS.json");
  const apiKeysParsed = JSON.parse(registeredAPIKeys);
  const newAPiKey = { apiKey: uuid.v4() };
  apiKeysParsed.push(newAPiKey);

  if (apiKeysParsed) {
    console.log(newAPiKey);
    fs.writeFileSync(
      "./data/registeredAPIKEYS.json",
      JSON.stringify(apiKeysParsed)
    );
    res.status(200).json(newAPiKey);
  }
  console.log(apiKeysParsed);
  res.json("Testing");
});

app.use("/videos", videos);

app.listen(8080, function () {
  console.log("🚀 Server is running");
});
