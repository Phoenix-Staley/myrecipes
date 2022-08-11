const { AuthenticationError } = require("apollo-server-express");
const { User, Recipe, Tag } = require("../models");
const { signToken } = require("../utils/auth");

const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3Client } = require("../utils/s3Client"); // Helper function that creates Amazon S3 service client module.
const { v4: uuidv4 } = require("uuid");

const resolvers = {
  Query: {
    myself: async (parent, args, context) => {
      if (context.user) {
        const myself = await User.findById(context.user._id)
          .populate("postedRecipes")
          .populate("savedRecipes")
          .populate({ path: "savedRecipes", populate: ["tags", "creator"] })
          .populate({ path: "postedRecipes", populate: ["tags", "creator"] });

        return myself;
      }

      throw new AuthenticationError("Not logged in");
    },
    user: async (parent, userId, context) => {
      if (context.user) {
        const user = await User.findById(userId)
          .populate("postedRecipes")
          .populate({ path: "postedRecipes", populate: ["tags", "creator"] });

        return user;
      }

      throw new AuthenticationError("Must be logged in to see other profiles");
    },

    allRecipes: async () => {
      return await Recipe.find().populate("creator").populate("tags");
    },
    tags: async () => {
      return await Tag.find();
    },
    recipeById: async (parent, { _id }) => {
      return await Recipe.findById(_id)
        .populate({ path: "tags", populate: "name" })
        .populate({ path: "creator", populate: "username" });
    },

    recipesByTag: async (parent, { tag }) => {
      const recipes = await Recipe.find().populate("tags").populate("creator");

      let filteredResults = [];
      recipes.forEach((recipe) => {
        recipe.tags.forEach((recipeTag) => {
          if (recipeTag.name === tag) {
            filteredResults.push(recipe);
          }
        });
      });

      return filteredResults;
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
      name.name = name.name.toLowerCase();
      return await Tag.create(name);
    },

    postRecipe: async (parent, { recipeData }, context) => {
      if (context.user) {
        recipeData.creator = context.user._id;
        const newRecipe = await Recipe.create(recipeData);
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { postedRecipes: newRecipe } },
          { new: true }
        )
          .populate("postedRecipes")
          .populate("savedRecipes");
      }
      throw new AuthenticationError("You are not logged into an account!");
    },

    saveRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedRecipes: recipeId } },
          { new: true, runValidators: true }
        )
          .populate("postedRecipes")
          .populate("savedRecipes");
      }
      throw new AuthenticationError("You are not logged into an account!");
    },
    fileUploadURL: async (parent, args) => {
      try {
        const bucketParams = {
          Bucket: "myrecipesbucket-abps",
          Key: `${uuidv4()}-${Date.now().toString()}`,
        };
        const command = new PutObjectCommand(bucketParams);
        const signedUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 3600,
        });
        return { signedUrl };
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
