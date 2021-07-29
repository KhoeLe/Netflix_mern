const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
     
    },
    img: {
      type: String,
      
    },
    imgTile: {
      type: String,
      
    },
    trailer: {
      type: Boolean,
      
    },
    video: {
      type: Boolean,
      
    },
    year: {
      type: Boolean,
      
    },
    limit: {
      type: Number,
      
    },
    genre: {
      type: Boolean,
      
    },
    isSeries: {
      type: Boolean,
      default: false
      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema)