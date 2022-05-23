import { ApolloServer, gql } from "apollo-server";

/**
 * GQL: GraphQL Query Language(including SDL)
 *
 * SDL: Schema Definition Language (Explaining GQL)
 *
 * Query root type must be provided(Compare REST API)
 *  - GET /allTweets
 *  - GET /tweet
 *
 * Mutation type for Modifing a Resource(POST, DELETE, PUT Request)
 *  - POST /postTweet
 *  - DELETE /deleteTweet
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
