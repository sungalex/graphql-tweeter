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

- A resolver is a function that's responsible for populating the data for a single field in your schema. It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API.

```javascript
const resolvers = {
  Query: {
    allTweets: () => tweets,
  },
};
```

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

## Resolver arguments

Resolver functions are passed four arguments: parent, args, context, and info (in that order).

- `parent` : The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain).

- `args` : An object that contains all GraphQL arguments provided for this field.

- `context` : An object shared across all resolvers that are executing for a particular operation.

- `info` : Contains information about the operation's execution state, including the field name, the path to the field from the root, and more.

## Type Resolvers

```js
  Query: {
    allUsers() {
      return users;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName}, ${lastName}`;
    },
  },
```

- Notice that this example doesn't define resolvers for User fields (id, firstName, and lastName). That's because the default resolver that Apollo Server creates for these fields does the right thing: it obtains the value directly from the object returned by the `allUsers` resolver.

- The `{ firstName, lastName }` argument at `fullName` resolver is fields included in the `parent` object.

## Relationships(Resolver Chains)

Whenever a query asks for a field that returns an object type, the query also asks for at least one field of that object (if it didn't, there would be no reason to include the object in the query). A query always "bottoms out" on fields that return a scalar, an enum, or a list of these.

Because of this rule, whenever Apollo Server resolves a field that returns an object type, it always then resolves one or more fields of that object. Those subfields might in turn also contain object types. Depending on your schema, this object-field pattern can continue to an arbitrary depth, creating what's called a resolver chain.

```js
  Tweet: {
    author({ userId }) {
      users.find((user) => user.id === userId);
    },
  },
```
