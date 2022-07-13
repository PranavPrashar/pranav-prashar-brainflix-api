const express = require("express");
const router = express.Router();
const fs = require("fs");
const app = express();
const uuid = require("uuid");
const cors = require("cors");

app.use(cors());
app.use(express.static("./public"));
app.use(express.json()); // This middleware allows us to post JSON in req.body

const readFile = JSON.parse(fs.readFileSync("./data/videosData.json"));

router.get("/", function (req, res) {
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

router.get("/:videoid", function (req, res) {
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

router.post("/", function (req, res) {
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

module.exports = router;
