const Story = require('./../../models/Story.js');
const checkAuth = require('./../../utils/auth');
const {AuthenticationError} = require('apollo-server');

module.exports = {
    Query: {
        async getStories(){
            try {
                const stories = await Story.find().sort({createdAt: -1});
                return stories;
            }
            catch(err) {
                throw new Error(err);
            }
        },
        async getStory(_, {storyId}){
            try{
                const story = await Story.findById(storyId).exec();
                if(story){
                    return story;
                }else {
                    throw new Error("Story not found.")
                }
            } catch(err){
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createStory(_, {body}, context){
            const user = checkAuth(context);

            if(body.length === 0){
                throw new Error("Story can't be empty");
            }else {
                const newStory = new Story({
                    body,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString()
                });
    
                const story = await newStory.save()
                return story;
            }
        },
        async deleteStory(_,{storyId}, context){
            const user = checkAuth(context);

            try{
                const story = await Story.findById(storyId);
                if(user.username === story.username){
                    await story.delete();
                    return 'Story deleted successfully.';
                }else {
                    throw new AuthenticationError("Action not allowed.");
                }
            } catch(err){
                throw new Error(err);
            }
        }
    }
}