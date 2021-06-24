const Story = require('./../../models/Story.js');
const {UserInputError} = require('apollo-server');
const checkAuth = require('./../../utils/auth');

module.exports = {
    Mutation: {
        createComment: async (_, {storyId, body}, context) => {
            const {username} = checkAuth(context);
            if(body.length === 0){
                throw new UserInputError("Empty comment.", {
                    errors: {
                        body: "Comment can't be empty."
                    }
                })
            }

            const story = await Story.findById(storyId);
            if(story){
                story.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await story.save();
                return story;
            }else {
                throw new UserInputError("Post not found.")
            }
        }
    }
}