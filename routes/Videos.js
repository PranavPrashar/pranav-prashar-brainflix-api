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

  const filteredById = videosData.find((video) => {
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

  const object = {
    title: req.body.title,
    channel: req.body.channel,
    image: "/images/default_image.jpg",
    description:
      "Worried about finding the perfect travel accommodations? There are many things to consider when booking an accommodation. Consider picking the right location. Location is an important consideration for an enjoyable stay. Check the rating and price. Consider apartment or condo rentals. Weigh the food options. Is it family-friendly? Watch for extra fees. Assess the on-site amenities.",
    views: "252,796",
    likes: "4,905",
    duration: "7:31",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: 1631532721000,
    comments: [
      {
        name: "Fionna Miller",
        comment:
          "Location location location! It blows my mind how many people don’t understand this, but you’ve summed it up so well here. The next time I travel, I’ll be on the beachfront.",
        likes: 6,
        timestamp: 1631816492000,
      },
      {
        name: "Suzie Maxwell",
        comment:
          "I wish I could print out a video to show to my travel agent. Oh, what am I saying – they have a computer! Much appreciated advice, I can’t wait to put it into action soon.",
        likes: 1,
        timestamp: 1631799181000,
      },
      {
        name: "Alasie Rivers",
        comment:
          "From five-star hotels to the cheapest spots – wherever you like to stay, THIS is the way to do it! I’ll take sunlight and a cozy reading corner over a pool any day of the week.",
        likes: 0,
        timestamp: 1631716921000,
      },
    ],
    id: uuid.v4(),
  };

  videoData.push(object);

  if (videoData && object) {
    fs.writeFileSync("./data/videosData.json", JSON.stringify(videoData));
    res.status(201).json(object);
  } else {
    res.status(400).json("Something went wrong");
  }
});

module.exports = router;
