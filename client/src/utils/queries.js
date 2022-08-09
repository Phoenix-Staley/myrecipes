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

export const QUERY_ALLRECIPES = gql`
  {
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
  }
`;

export const QUERY_RECIPEBYID = gql`
  {
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

// chane tagid to tagname,
//add a query for myself

export const QUERY_RECIPESBYTAG = gql`
  {
    recipesByTag(tagId: $tagId) {
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
