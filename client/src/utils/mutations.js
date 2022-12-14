import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
    ) {
      token
      user {
        _id
        username
        firstName
        lastName
        email
      }
    }
  }
`;

export const POST_RECIPE = gql`
  mutation ($recipeData: recipeInput) {
    postRecipe(recipeData: $recipeData) {
      _id
    }
  }
`;

export const SAVE_RECIPE = gql`
  mutation saveRecipe($userId: ID!, $recipeId: ID!) {
    saveRecipe(userId: $userId, recipeId: $recipeId) {
      _id
      username
      firstName
      lastName
      email
    }
  }
`;

export const FILE_UPLOAD_URL = gql`
  mutation Mutation {
    fileUploadURL {
      signedUrl
    }
  }
`;
