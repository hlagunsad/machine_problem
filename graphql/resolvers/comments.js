const Story = require("./../../models/Story.js");
const { UserInputError, AuthenticationError } = require("apollo-server");
const checkAuth = require("./../../utils/auth");

module.exports = {
  Mutation: {
    createComment: async (_, { storyId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.length === 0) {
        throw new UserInputError("Empty comment.", {
          errors: {
            body: "Comment can't be empty.",
          },
        });
      }

      const story = await Story.findById(storyId);
      if (story) {
        story.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await story.save();
        return story;
      } else {
        throw new UserInputError("Story not found.");
      }
    },

    deleteComment: async (_, { storyId, commentId }, context) => {
      const { username } = checkAuth(context);
      const story = await Story.findById(storyId);

      if(story) {
        const commentIndex = story.comments.findIndex(
          (comment) => comment.id === commentId
        );
        if(story.comments[commentIndex].username === username){
            story.comments.splice(commentIndex, 1);
            await story.save();
            return story;
        }else {
            throw new AuthenticationError("Action not allowed.");
        }
      }else {
          throw new UserInputError("Story not found.");
      }
    },
    likeStory: async(_, {storyId}, context) => {
        const {username} = checkAuth(context);
        const story = await Story.findById(storyId);

        if(story){
            if(story.likes.find((like) => like.username === username)){
                story.likes = story.likes.filter(like => {
                    like.username !== username
                })
            }else {
                story.likes.push({
                    username,
                    createdAt: new Date().toISOString()
                })
            }

            await story.save();
            return story;
        }else {
            throw new UserInputError("Story not found")
        }
    }
  },
};
