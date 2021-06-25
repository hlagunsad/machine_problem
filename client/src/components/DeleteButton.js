import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";


const DELETE_STORY_MUTATION = gql`
    mutation deleteStory($storyId: ID!){
        deleteStory(storyId: $storyId)
    }
`
export default function DeleteButton({storyId}){
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deleteStory] = useMutation(DELETE_STORY_MUTATION, {
        update(){
            setConfirmOpen(false)
            // TODO: remove post from cache
        },
        variables: {
            storyId
        }
    })
  return (
    <>
    <Button
      as="div"
      basic
      floated="right"
      color="red"
      onClick={() => setConfirmOpen(true)}
    >
      <Icon name="trash alternate outline" style={{ margin: 0 }} />
    </Button>
    <Confirm open={confirmOpen} 
    onCancel={() => setConfirmOpen(false)} 
    onConfirm={deleteStory} />
    </>
  );
}
