const gql = require('graphql-tag');

module.exports = gql`
    type Story{
        id:ID
        createdAt: String
        username: String!
        body: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id: ID!
        username: String!
        createdAt: String!
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
        createComment(storyId: String!, body: String!): Story!
        deleteComment(storyId: String!, commentId: ID!): Story!
        likeStory(storyId: String!): Story!
    }
`