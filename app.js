const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb://gd:gd@cluster0-shard-00-00.r0tlb.gcp.mongodb.net:27017,cluster0-shard-00-01.r0tlb.gcp.mongodb.net:27017,cluster0-shard-00-02.r0tlb.gcp.mongodb.net:27017/test?ssl=true&replicaSet=atlas-vvnds9-shard-0&authSource=admin&retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
