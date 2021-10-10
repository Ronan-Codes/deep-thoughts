import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`
// The returning data should be the same, so we don't have to add the extra step for users to log in after signing up.
// Remember, the names and format that we use have to match what we set up on the server!

export const ADD_FRIEND = gql`
    mutation addFriend($id: ID!) {
        addFriend(friendId: $id) {
            _id
            username
            friendCount
            friends {
                _id
                username
            }
        }
    }
`;

// In Home.js and Profile.js > ThoughtForm
export const ADD_THOUGHT = gql`
    mutation addThought($thoughtText: String!) {
        addThought(thoughtText: $thoughtText) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
            }
        }
    }
`;

// In SingleThought.js > ReactionForm
export const ADD_REACTION = gql`
    mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
        addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
            _id
            reactionCount
            reactions {
                _id
                reactionBody
                createdAt
                username
            }
        }
    }
`;