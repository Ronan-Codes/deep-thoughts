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

    type Query {
        thoughts(username: String): [Thought]
    }
`;
// `[Thought]` returns an array (replaced `String`)
    // Thought is the custom data type
// (username: String) in `thoughts` allows query with/without username parameter
// [Reaction] is nested in Thought

// export the typeDefs
module.exports = typeDefs;


// Tagged templates are an advanced use of template literals (ES6)
    // it's typically from a library that provides explicit details 
    // on how it's used in that situation, so we don't have to know 
    // too much about it for this application.