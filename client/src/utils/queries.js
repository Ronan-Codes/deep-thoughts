import { gql } from '@apollo/client';

// ES6 module export syntax. Saved as Query_Thoughts
export const Query_Thoughts = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions{
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;