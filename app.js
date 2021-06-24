const { ApolloServer } = require('apollo-server');

require ('dotenv').config();
require('./db.js')

const port = process.env.PORT || 4000;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
})

server.listen(port)
.then(res => {
    console.log(`Server running at ${res.url}`);
})