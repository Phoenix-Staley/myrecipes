import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
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
  }
`;

export const QUERY_RECIPES = gql`
  {
    recipes {
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

export const QUERY_RECIPE = gql`
  {
    recipe(recipeId: $recipeId) {
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

export const QUERY_TAGGEDRECIPES = gql`
  {
    taggedRecipes(tagId: $tagId) {
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
  {
    tags {
      name
      _id
    }
  }
`;
