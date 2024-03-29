const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postId: String,
  title: String,
  content: String,
  authorId: String,
});

module.exports = mongoose.model('Post', postSchema);