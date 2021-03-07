const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }, { username: context.user })
          .select('__v -password')
          .populate('bookCount')
          .populate('savedBooks');

        return userData;
      }
      throw new AuthenticationError('Not Logged in');
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return user;
    },
    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({ username, email });
      if (!user) {
        throw new Authentication('Incorrect credentials')
      }
      const correctPw = await User.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { user, body }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
        );
        return updateUser;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    deleteBook: async (parent, { user, bookId }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updateUser;
      }
      throw new AuthenticationError('You need to be logged in')
    }
  }
}

module.exports = resolvers;