import { gql } from "@apollo/client";

export const QUERY_MYSELF = gql`
  query myself($id: ID!) {
    user(_id: $id) {
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
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
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
  }
`;

export const QUERY_ALLRECIPES = gql`
  query {
    allRecipes {
      _id
      description
      title
      creator {
        _id
        username
      }
      tags {
        name
      }
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
        _id
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
        _id
        username
      }
      tags {
        name
      }
    }
  }
`;

export const QUERY_TAGS = gql`
  query {
    tags {
      _id
      name
    }
  }
`;
