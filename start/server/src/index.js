require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const types = require('./schema');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const { createStore } = require('./utils');
const store = createStore();
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs: types,
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
})

