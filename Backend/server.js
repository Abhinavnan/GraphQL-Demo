const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql'); // deprecated, use graphql-http instead, but still works with GUI
const { createHandler } = require('graphql-http/lib/use/express'); // didn't work with GUI
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const bookSchema = require('./book-schema'); 
const app = express();
const port = 5000;

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      message: {
        type: GraphQLString,
        resolve: () => 'Hello World', 
      },
    },
  }),
}); // Define schema

app.use(cors());
app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({ graphiql: true, schema }));
app.use('/graphql-book', graphqlHTTP({ schema: bookSchema, graphiql: true }));
//app.use('/graphql', createHandler({ schema, graphiql: true }));

app.listen(port);
