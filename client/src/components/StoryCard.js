import { Card, Label, Image, Icon, Button } from "semantic-ui-react";
import moment from 'moment';
import { Link } from "react-router-dom";

export default function StoryCard({story: {body, id, createdAt, username, likeCount, commentCount, likes} = {} }){

    const likeStory = () => {
        console.log('Harry')
    }

    const commentOnStory = () => {
        console.log('lagunsad')
    }

    return(
        <Card fluid>
            <Card.Content>
            <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/stories/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
            <Card.Description>
                {body}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button as='div' labelPosition='right' onClick={likeStory} >
                <Button basic color='purple'>
                    <Icon name='heart' />
                </Button>
                <Label as='a' basic color='purple' pointing='left'>
                {likeCount}
                </Label>
            </Button>
            <Button as='div' labelPosition='right' onClick={commentOnStory} >
                <Button basic color='blue'>
                    <Icon name='comments outline' />
                </Button>
                <Label as='a' basic color='blue' pointing='left'>
                {commentCount}
                </Label>
            </Button>
            </Card.Content>
        </Card>
    )
}