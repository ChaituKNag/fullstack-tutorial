require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const types = require('./schema');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const { createStore } = require('./utils');
const store = createStore();
const resolvers = require('./resolvers');
const isEmail = require('isemail');

const server = new ApolloServer({
    typeDefs: types,
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
    }),
    context: async ({ req }) => {
        const auth = req.headers && req.headers.authorization || '';
        const email = Buffer.from(auth, 'base64').toString('ascii');
        if (!isEmail.validate(email)) return { user: null };

        const users = await store.users.findOrCreate({
            where: { email }
        });
        const user = users ? users[0] : null;
        return { user: { ...user.dataValues } };
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
})

