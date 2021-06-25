import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { useForm } from '../utils/hooks';
import { FETCH_STORIES_QUERY } from '../utils/graphql';

function StoryForm() {
  const { credentials, handleChange, handleSubmit } = useForm(createStoryCallback, {
    body: ''
  });

  const [createStory, { error }] = useMutation(CREATE_STORY_MUTATION, {
    variables: credentials,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_STORIES_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_STORIES_QUERY,
        data: {
          getStories: [result.data.createStory, ...data.getStories],
        },
      });
      credentials.body = "";
    },
    onError(err) {
      return err;
    },
  });

  function createStoryCallback() {
    createStory();
  }

  return (
      <>
      <Form onSubmit={handleSubmit}>
        <h2>Create a Story:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={handleChange}
            value={credentials.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
      </>
  );
}

const CREATE_STORY_MUTATION = gql`
  mutation createStory($body: String!) {
    createStory(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default StoryForm;