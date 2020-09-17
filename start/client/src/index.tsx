import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    ApolloProvider
} from '@apollo/client';

import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from './styles';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: `https://4000-c1e8cb28-4ac2-4fdc-b8d6-a3675d0d8ae3.ws-us02.gitpod.io/`,
    cache: new InMemoryCache()
});

injectStyles();
ReactDOM.render(
    <ApolloProvider client={client}>
        <Pages />
    </ApolloProvider>,
    document.getElementById('root')
);