const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Tag {
    _id: ID
    name: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    savedRecipes: [Recipe]
    postedRecipes: [Recipe]
  }

  type Recipe {
    _id: id
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

  type Query {
    user: User
    recipes: [Recipe]
    recipe(recipeId: ID!): Recipe
    recipe(userId: ID!): [Recipe]
    recipe(tagId: ID!): [Recipe]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
