# GraphQL Fundamentals

GraphQL Fundamentals with [Tweeter API Clone](https://nomadcoders.co/graphql-for-beginners) and [Apollo Server](https://graphql.org)

## Apollo Server Getting Started

- https://www.apollographql.com/docs/apollo-server/getting-started

### Step 1: Install dependencies

```
npm install apollo-server graphql
```

### Step 2: Define GraphQL Schema

- SDL(Schema Definition Language): The GraphQL specification defines a human-readable schema definition language(or SDL) that you use to define your schema and store it as a string

```javascript
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Tweet {
    id: ID
    text: String
  }
  type Query {
    tweet(id: ID): Tweet
    allTweets: [Tweet]
  }
`;
```

- Compare REST API(vs. Query root type)

  - GET /allTweets

  - GET /tweet/:id

- Scalar Type : ID, String, Int, Boolean, ...

- Query root type must be provided.

### Step 3: Define data set

```javascript
const tweets = [
  {
    id: "1",
    text: "First Tweet",
  },
  {
    id: "2",
    text: "Second Tweet",
  },
];
```

### Step 4: Define a resolver

```javascript
const resolvers = {
  Query: {
    allTweets: () => tweets,
  },
};
```

- A resolver is a function that's responsible for populating the data for a single field in your schema.

### Step 5: Create an instance of ApolloServer

```javascript
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
```

## Mutation type for Modifing a Resource(for POST, DELETE, PUT Request)

```js
  type Mutation {
    postTweet(text: String, userId: ID): Tweet
    deleteTweet(id: ID): Boolean
  }
```

- Compare REST API(vs. Mutation type)
  - POST /postTweet
  - DELETE /deleteTweet

## Non-Nullable Fields

By default, it's valid for any field in your schema to return `null` instead of its specified type.

You can require that a particular field doesn't return `null` with an exclamation mark `!`.

```js
  type Query {
    tweet(id: ID!): Tweet
    allTweets: [Tweet!]!
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
```
