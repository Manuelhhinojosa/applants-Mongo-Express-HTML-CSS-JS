const mongoose = require("mongoose");
const Post = require("./models/post");

const serverdb = require("./config/database");

const p = new Post.Post({
  location: "Toronto, ON",
  img: "Placeholder.jpg",
  likes: 0,
  caption: "I love my plant!",
  details: {
    scientificName: "Ficus lyrata",
    age: 3,
    petName: "Dolores",
    orginalFrom: "Africa",
    care: "Water thoroughly when the top 2 inches of soil becomes dry and add diluted liquid fertilizer once a month during growing season; less in winter",
  },

  timestamps: true,
});

p.save();
