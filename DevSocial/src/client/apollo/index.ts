



import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
const client = new ApolloClient({
	link: from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						'[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}',
					),
				); // Added comma here
				if (networkError) {
					console.log('[Network error]: ${networkError}'); // Added comma here
				}
			}
		}),
		new HttpLink({
			uri: 'http://localhost:3000/graphql',
		}),
	]),
	cache: new InMemoryCache(),
});
export default client;



