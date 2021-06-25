import gql from 'graphql-tag';

export const FETCH_STORIES_QUERY = gql`
    {
        getStories{
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username body createdAt
            }
        }   
    }
    `