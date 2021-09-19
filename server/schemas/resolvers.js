const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // thoughts: async() => {
        //     return Thought.find().sort({ createdAt: -1 });
        // }
        thoughts: async(parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        }
    }
};
// parent is more of a placeholder parameter, to access username argument from second parameter
// We use a ternary operator `?` to check if username exists. If it does, we set params to an object with a username key set to that value. 
    // If it doesn't, we simply return an empty object.
    // If there's not data in params object, we simply return every thought
// 4 arguments for resolvers: parent, args, context(logged-in status/API access token), info(operation's current state)


module.exports = resolvers;
