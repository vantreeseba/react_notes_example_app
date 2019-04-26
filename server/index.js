const mongoose = require('mongoose');
const http = require('http');
const {ApolloServer} = require('apollo-server-express');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {execute, subscribe} = require('graphql');
const express = require('express');
const path = require('path');

const schema = require('./schema');
const auth = require('./auth');
const permissions = require('./permissions');

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', (err) => console.error('connection error:', err));

db.once('open', () => {
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  const server = new ApolloServer({
    // schema: permissions(schema),
    schema,
    introspection: true,
    playground: {
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:${PORT}/graphql`
    },
  });

  server.applyMiddleware({app}); // app is from an existing express app

  const httpServer = http.createServer(app);

  SubscriptionServer.create(
    {
      // schema: permissions(schema),
      schema,
      execute,
      subscribe,
      onConnect: (connectionParams) => {
        if (connectionParams.token) {
          return {
            user: auth.getUserFromToken(connectionParams.token)
          };
        }
      },
    },
    {
      server: httpServer,
      path: '/graphql'
    }
  );

  httpServer.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}/graphql`)
  );
});
