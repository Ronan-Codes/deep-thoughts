// import the gql tagged template function
const { gql } = require('appolo-server-express');

// create our typeDefs
const typeDefs = gql`
    type Query {
        helloWorld: String
    }
`;

// export the typeDefs
module.exports = typeDefs;


// Tagged templates are an advanced use of template literals (ES6)
    // it's typically from a library that provides explicit details 
    // on how it's used in that situation, so we don't have to know 
    // too much about it for this application.