import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Label, Icon } from "semantic-ui-react";

const LIKE_STORY_MUTATION = gql`
  mutation likeStory($storyId: ID!) {
    likeStory(storyId: $storyId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

function LikeButton({ user, story: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likeStory] = useMutation(LIKE_STORY_MUTATION, {
    variables: { storyId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Button color="purple">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="purple" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="purple" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likeStory}>
      {likeButton}
      <Label basic color="purple" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
