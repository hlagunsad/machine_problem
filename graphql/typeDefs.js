const gql = require('graphql-tag');

module.exports = gql`
    type Story{
        id:ID,
        createdAt: String,
        username: String!,
        body: String!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
        mobileNo: String!
    }
    type Query{
        getStories: [Story]
        getStory(storyId: ID!): Story
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createStory(body: String!): Story!
        deleteStory(storyId: ID!): String!
    }
`