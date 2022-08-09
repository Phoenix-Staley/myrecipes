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
    tags: [Tag]
  }

#need to add user query to pull other profile data. findby username
  type Query {
    myself(_id: ID!): User
    user(_id: ID!): User
    allRecipes(offset: 0 limit: 25): [Recipe]
    recipeById(_id: ID!): Recipe
    recipeByTag(tag: String!): [Recipe]
    tags: [Tag]

    #recipe(userId: ID!): [Recipe]
    #recipe(tagId: ID!): [Recipe]
    #commented out the above two queries, because they were throwing an error when the server starts up "Error: Field "Query.recipe" can only be defined once."
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
  }
`;

module.exports = typeDefs;
