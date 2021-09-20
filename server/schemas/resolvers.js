const { User, Thought } = require('../models');

const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
// These two are utilized in Mutations for authentication and JWT

const resolvers = {
    Query: {
        // check if logged in?
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('thoughts')
                    .populate('friends');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        // thoughts: async() => {
        //     return Thought.find().sort({ createdAt: -1 });
        // }
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                // omits __v and password information
                .populate('friends')
                .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user)
            return { token, user };
        }
    }
};
// parent is more of a placeholder parameter, to access username argument from second parameter
// We use a ternary operator `?` to check if username exists. If it does, we set params to an object with a username key set to that value. 
    // If it doesn't, we simply return an empty object.
    // If there's not data in params object, we simply return every thought
// 4 arguments for resolvers: parent, args, context(logged-in status/API access token), info(operation's current state)


module.exports = resolvers;
