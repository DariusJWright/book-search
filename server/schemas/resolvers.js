const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks')

        return userData;
      }
      throw new AuthenticationError('Not logged in');
    }
  },

  Mutation: {
    // add a new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // user login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      //if email doesn't exist
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      // compare login password with user's password
      const correctPw = await user.isCorrectPassword(password);

      // if password is incorrect
      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials')
      }

      const token = signToken(user);
      return { token, user };
    },

    // add a book to user's savedBooks array
    saveBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookId } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }
      
      throw new AuthenticationError('You must be logged in to save books');
    },

    // remove book from user's savedBooks array
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookId } },
          { new: true }
        ).populate('savedBooks')

        return updatedUser;
      }

      throw new AuthenticationError('You must be logged in to remove books');
    }
  }
}

module.exports = resolvers;