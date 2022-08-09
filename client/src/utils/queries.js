import { gql } from "@apollo/client";

export const QUERY_MYSELF = gql`
    user {
      _id
      username
      firstName
      lastName
      email
      savedRecipes {
        _id
        description
        title
        ingredients
        steps
        image
        creator {
          username
        }
        tags {
          name
        }
      }
      postedRecipes {
        _id
        description
        title
        ingredients
        steps
        image
        creator {
          username
        }
        tags {
          name
        }
      }
    }
`;

export const QUERY_USER = gql`
    user {
      _id
      username
      firstName
      lastName
      email
      postedRecipes {
        _id
        description
        title
        ingredients
        steps
        image
        tags {
          name
        }
        creator {
          username
        }
      }
    }
`;

export const QUERY_ALLRECIPES = gql`
    allRecipes {
      _id
      description
      title
      ingredients
      steps
      image
      creator {
        username
      }
      tags {
        name
      }
    }
`;

export const QUERY_RECIPEBYID = gql`
  query recipeByID($recipeId: ID!) {
    recipeById(recipeId: $recipeId) {
      _id
      description
      title
      ingredients
      steps
      image
      creator {
        username
      }
      tags {
        name
      }
    }
  }
`;

export const QUERY_RECIPESBYTAG = gql`
  query recipesByTag($tag: String!) {
    recipesByTag(tag: $tag) {
      _id
      description
      title
      ingredients
      steps
      image
      creator {
        username
      }
      tags {
        name
      }
    }
  }
`;

export const QUERY_TAGS = gql`
    tags {
      name
      _id
    }
`;
