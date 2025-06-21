import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Books from './Books';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql-book', // or /graphql
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Book List</h1>
        <Books />
      </div>
    </ApolloProvider>
  );
}

export default App;