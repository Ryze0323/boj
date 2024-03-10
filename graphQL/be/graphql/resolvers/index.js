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
  return await User.findOne({ id: authorId }).exec()
} 

const resolvers = {
  Query: {
    user: async (_, { id }) => await User.findOne({ id }),
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
    }
 `BB���V�G�D�Q�2D�(Z���0�$gZe~���wR\�k$� 0�:)�e��g@
�w
����=�x,|��Rq#��ֻ�����������@L��I����~ ���'�U[!�F������PV]��R����0����0�������W�[��J�MD��Ih��gHI�&.m|��X����IB�6�K��X�]�vM��5��|�blCp>:��-�n^���rѴ���.�Y��]�5��n�[6�nۦs��.�:�y�-�Pw�}� �u���Mh�G��wm�:�DP"H����!2��Q(	*f$D�Q�'T)j�<���K�	'$�
M�
�]]
]J.I��S�!