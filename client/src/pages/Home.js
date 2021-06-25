import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import StoryCard from "./../components/StoryCard";
import StoryForm from "./../components/StoryForm";

import { AuthContext } from "./../contexts/auth";

import { FETCH_STORIES_QUERY } from "./../utils/graphql";

export default function Home() {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_STORIES_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Stories</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <StoryForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>loading... </h1>
        ) : (
          <Transition.Group>
            {data.getStories &&
              data.getStories.map((story) => (
                <Grid.Column key={story.id} style={{ marginBottom: 20 }}>
                  <StoryCard story={story} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}
