const storiesResolvers = require('./stories');
const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...storiesResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...storiesResolvers.Mutation
    }
}