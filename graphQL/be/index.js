const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema/');
const resolvers = require('./graphql/resolvers');

// MongoDB에 연결
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Apollo Server 인스턴스 생성
const server = new ApolloServer({ typeDefs, resolvers });

// 서버 시작
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
