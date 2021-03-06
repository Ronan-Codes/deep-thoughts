// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }

    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }

    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addThought(thoughtText: String!): Thought
        addReaction(thoughtId: ID!, reactionBody: String!): Thought
        addFriend(friendId: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;
// `[Thought]` returns an array (replaced `String`)
    // Thought is the custom data type
// (username: String) in `thoughts` allows query with/without username parameter
// [Reaction] is nested in Thought
// In Mutations, `Auth` replaced `User`

// export the typeDefs
module.exports = typeDefs;


// Tagged templates are an advanced use of template literals (ES6)
    // it's typically from a library that provides explicit details 
    // on how it's used in that situation, so we don't have to know 
    // too much about it for this application.