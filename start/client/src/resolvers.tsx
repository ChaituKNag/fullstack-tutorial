import { gql, ApolloCache, Resolvers } from "@apollo/client"

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
        cartItems: [ID!]!
    }

    extend type Launch {
        isInCart: Boolean!
    }

    extend type Mutation {
        addOrRemoveFromCart(id: ID!): [ID!]!
    }
`;

type ResolverFn = (
    parent: any,
    args: any,
    { cache }: { cache: ApolloCache<any> }
)

export const resolvers = {};