import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    ApolloProvider,
    HttpLink,
    gql,
    useQuery
} from '@apollo/client';

import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from './styles';
import { typeDefs, resolvers } from './resolvers'
import Login from './pages/login';

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: `https://4000-c1e8cb28-4ac2-4fdc-b8d6-a3675d0d8ae3.ws-us02.gitpod.io/graphql`,
        headers: {
            authorization: localStorage.getItem('token')
        }
    }),
    typeDefs,
    resolvers
});

cache.writeQuery({
    query: gql`
        query LoginQuery {
            isLoggedIn
        }
    `,
    data: {
        isLoggedIn: !!localStorage.getItem('token'),
        cartItems: []
    }
})

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`

const LoginGate = () => {
    const { data } = useQuery(IS_LOGGED_IN);
    return data.isLoggedIn ? <Pages /> : <Login />;
}

injectStyles();
ReactDOM.render(
    <ApolloProvider client={client}>
        <LoginGate />
    </ApolloProvider>,
    document.getElementById('root')
);