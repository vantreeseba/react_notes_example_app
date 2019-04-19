const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server-express');
const schema = require('./schema');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', (err) => console.error('connection error:', err));

db.once('open', () => {
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  const server = new ApolloServer({schema});
  server.applyMiddleware({app}); // app is from an existing express app

  app.listen({port: PORT}, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
});
