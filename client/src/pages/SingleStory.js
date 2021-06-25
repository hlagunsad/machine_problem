import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Grid, Image, Card, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { useContext, useEffect } from "react";

import { AuthContext } from "../contexts/auth";
import LikeButton from "./../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

function SingleStory(props){
  const storyId = props.match.params.storyId;

  useEffect(() => {
    console.log(props)
  })
  const { user } = useContext(AuthContext);

  const {data:{getStory} = {}} = useQuery(FETCH_STORY_QUERY, {
    variables: {
      storyId
    }
  });

  let storyMarkup;
  if(!getStory) {
    storyMarkup = <p>Loading story...</p>;
  }else {
    const {
      id, body, createdAt, username, likeCount, commentCount, comments, likes } = getStory;

    storyMarkup = (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} story={{ id, likeCount, likes }} />
                <Button 
                as="div"
                labelPosition="right"
                onClick={() => console.log("Comment here")} >
                    <Button basic color="blue">
                        <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    <DeleteButton storyId={id} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return storyMarkup;
}

const FETCH_STORY_QUERY = gql`
    query($storyId: ID!){
        getStory(storyId: $storyId){
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`


export default SingleStory;