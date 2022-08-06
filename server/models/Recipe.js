const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipeSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  steps: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  ],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
