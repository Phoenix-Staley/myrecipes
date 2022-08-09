const { AuthenticationError } = require("apollo-server-express");
const { User, Recipe, Tag } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    myself: async (parent, args, context) => {
      if (context.user) {
        const myself = await User.findById(context.user._id)
          .populate("savedRecipes")
          .populate("postedRecipes");

        return myself;
      }

      throw new AuthenticationError("Not logged in");
    },
    user: async (parent, userId, context) => {
      if (context.user) {
        const user = await User.findById(userId).populate("postedRecipes");
        return user;
      }

      throw new AuthenticationError("Must be logged in to see other profiles");
    },
    // pulled offset and limit pagination from documentation. Need to confirm it is set up correctly
    allRecipes: async (root, { offset, limit }, ctx, info) => {
      const index = recipes;
      return await Recipe.slice(offset, offset + limit);
    },
    tags: async () => {
      return await Tag.find();
    },
    recipeById: async (parent, { _id }) => {
      return await Recipe.findById(_id);
    },

    taggedRecipes: async (parent, { tag }) => {
      const recipes = await Recipe.find().populate("tags").populate("creator");

      for (let i = 0; i < recipes.length; i++) {
        if (recipes.tags.include(tag)) {
          recipes[i];
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addTag: async (parent, name) => {
      return await Tag.create(name);
    },

    postRecipe: async (parent, { recipeData }, context) => {
      if (context.user) {
        recipeData.creator = context.user._id;
        const newRecipe = await Recipe.create(recipeData);
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { postedRecipes: newRecipe } }
        );
      }
      throw new AuthenticationError("You are not logged into an account!");
    },

    saveRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedRecipes: recipeId } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("You are not logged into an account!");
    },
  },
};

module.exports = resolvers;
