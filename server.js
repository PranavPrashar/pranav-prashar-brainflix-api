const express = require("express");
const app = express();
const fs = require("fs");
const uuid = require("uuid");
const cors = require("cors");

app.use(cors());
app.use(express.static("./public"));
app.use(express.json()); // This middleware allows us to post JSON in req.body

const readFile = JSON.parse(fs.readFileSync("./data/videosData.json"));

app.get("/", function (req, res) {
  console.log("Response Succsessful");
});

app.get("/register", function (req, res) {
  console.log("Register Endpoint Called");
  const registeredAPIKeys = fs.readFileSync("./data/registeredAPIKEYS.json");

  const apiKeysParsed = JSON.parse(registeredAPIKeys);

  const newAPiKey = { apiKey: uuid.v4() };
  apiKeysParsed.push(newAPiKey);

  if (apiKeysParsed) {
    console.log(newAPiKey);
    // apiKeysParsed.push(newAPiKey);
    fs.writeFileSync(
      "./data/registeredAPIKEYS.json",
      JSON.stringify(apiKeysParsed)
    );
    res.status(200).json(newAPiKey);
  }
  console.log(apiKeysParsed);

  res.json("Testing");
});

app.get("/videos", function (req, res) {
  console.log("Videos Endpoint Called");
  //   const videosData = JSON.parse(fs.readFileSync("./files/videosData.json"));
  const videosData = readFile;
  const filteredData = videosData.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });

  console.log(filteredData);

  if (videosData) {
    res.status(200).send(filteredData);
  } else {
    res.status(400).send("Error Occured");
  }
});

app.get("/videos/:videoid", function (req, res) {
  console.log("/videos:videoid endpoint");
  const videosData = readFile;

  const filteredById = videosData.filter((video) => {
    return video.id === req.params.videoid;
  });

  if (filteredById) {
    res.status(200).json(filteredById);
  }
  //   console.log(filteredById);
});

app.post("/videos", function (req, res) {
  console.log("Video Post API Reached");
  const videoData = readFile;

  const videoObj = {
    id: uuid.v4(),
    title: req.body.title,
    channel: req.body.channel,
    image: "/images/default_image.jpg",
  };

  videoData.push(videoObj);

  if (videoData && videoObj) {
    fs.writeFileSync("./data/videosData.json", JSON.stringify(videoData));
    res.status(201).json(videoObj);
  } else {
    res.status(400).json("Something went wrong");
  }

  // res.send(videoObj);

  //What should we send as the body, like what infromation image + ? wont the rest of the object be super empty
});

app.listen(8080, function () {
  console.log("🚀 Server is running");
});
