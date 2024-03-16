const User = require('../../models/User');
const Post = require('../../models/Post');
function generateUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

const getUserInfo = async (authorId) => {
  return await User.findOne({ userId: authorId }).exec()
} 

const resolvers = {
  Query: {
    user: async (_, { userId }) => await User.findOne({ userId }),
    users: async () => await User.find({}),
    posts: async () => {
      try {
        const posts = await Post.find().exec();
        return posts.map(async ({title, content,authorId}) => {
          author = await getUserInfo(authorId)
          return {
            title,
            content,
            author
          }
        })
      } catch (err) {
        console.error(err);
      } 
    },
    post: async (_, {postId}) => {
      try {
        const {title, content, authorId} = await Post.findOne({ postId }).exec();
        console.log(title, content, authorId);
        const author = await getUserInfo(authorId)
        console.log(author);
        return {
          title,
          content,
          author
        }
      } catch (err) {
        console.error(err);
      } 
    }
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      const userId = generateUUID();
      const newUser = new User({ userId, name, email })
      await newUser.save();
      console.log(newUser);
      return userId;
    },
    createPost: async (_, { title, content, authorId }) => {
      const postId = generateUUID();
      const newPost = new Post({ postId, title, content, authorId })
      await newPost.save();
      console.log(newPost);
      return newPost;
    }
  }}

  module.exports = resolvers;