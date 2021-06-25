import { useContext } from "react";
import { Card, Label, Image, Icon, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

export default function StoryCard({
  story: { body, id, createdAt, username, likeCount, commentCount, likes } = {},
}) {
  
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/stories/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        
        <LikeButton user={user} story={{id, likes, likeCount}} />

        <Button labelPosition="right" as={Link} to={`/stories/${id}`}>
          <Button basic color="blue">
            <Icon name="comments outline" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && <DeleteButton storyId={id} />}
      </Card.Content>
    </Card>
  );
}
