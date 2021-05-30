import "./App.css";
import Home from "./Pages/Home";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

function App() {

// This way doesn't work because I have a problem with Cors in my laptop, So I couldn't run
//  the query and send backa token with the header

// const httpLink= createHttpLink({
//      uri: "http://localhost:8000/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = window.localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:8000/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <Home client={client}/>
    </ApolloProvider>
  );
}

export default App;


