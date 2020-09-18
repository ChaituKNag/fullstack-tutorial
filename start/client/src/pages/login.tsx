import React from 'react';
import { gql, useMutation, useApolloClient, ApolloClient } from '@apollo/client'

import * as LoginTypes from './__generated__/login';
import { LoginForm, Loading } from '../components';

export const LOGIN_USER = gql`
    mutation login($email:String!) {
        login(email:$email);
    }
`

export default function Login() {
    const client: ApolloClient<any> = useApolloClient();
    const [login, { loading, error }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(LOGIN_USER, {
        onCompleted({ login }) {
            localStorage.setItem('token', login as string);
            client.writeQuery({
                query: gql`
                    query LoginQuery {
                        isLoggedIn
                    }
                `,
                data: { isLoggedIn: true }
            })
        }
    });

    if (loading) return <Loading />;
    if (error) return <p>An error occurred</p>;

    return <LoginForm login={login} />;
}
