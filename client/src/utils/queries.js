import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      savedRecipes {
        _id
        description
        title
        ingredients
        steps
        image
        creator
        tags
      }
      postedRecipes {
        _id
        description
        title
        ingredients
        steps
        image
        creator
        tags
      }
    }
  }
`;
