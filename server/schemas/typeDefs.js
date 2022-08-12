const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Tag {
    _id: ID
    name: String
  }

  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    savedRecipes: [Recipe]
    postedRecipes: [Recipe]
  }

  type Recipe {
    _id: ID
    description: String
    title: String
    ingredients: [String]
    steps: [String]
    image: String
    creator: User
    tags: [Tag]
  }

  type Auth {
    token: ID
    user: User
  }

  input recipeInput {
    description: String!
    title: String!
    ingredients: [String!]
    steps: [String!]
    image: String
    creator: ID!
    tags: [String]
  }

  type SingedURL {
    signedUrl: String
  }

  type Query {
    myself(_id: ID!): User
    user(_id: ID!): User
    allRecipes: [Recipe]
    recipeById(_id: ID!): Recipe
    recipesByTag(tag: String!): [Recipe]
    tags: [Tag]
    getFileUploadURL: SingedURL
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      username: String!
    ): Auth
    login(email: String!, password: String!): Auth
    postRecipe(recipeData: recipeInput): User
    saveRecipe(userId: ID!, recipeId: ID!): User
    addTag(name: String!): Tag
    fileUploadURL: SingedURL
  }
`;

module.exports = typeDefs;
