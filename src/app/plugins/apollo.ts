import { defineNuxtPlugin } from '#app';
import { createApolloClient } from '@apollo/client/core';

export default defineNuxtPlugin(() => {
    const client = createApolloClient({
        uri: 'https://graphql-api-url.com/graphql',
    });
    return { provide: { graphqlClient: client } };
});