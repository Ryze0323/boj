// src/components/Posts.js
import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_POSTS, CREATE_POST } from '../queries/postQueries';

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [createPost , { loading: creatingPost }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: CREATE_POST }], // 여기에 refetchQueries 추가
    onError: (error) => {
      // 여기서 사용자에게 에러 메시지를 표시할 수 있습니다.
      console.error("Error creating user:", error.message);
    }
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');

  const handleCreatePost = async () => {
    await createPost({ variables: { title, content, authorId } });
    setTitle('');
    setContent('');
    setAuthorId('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3>Create New Post:</h3>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
      />
      <input
        value={content}
        onChange={e => setContent(e.target.value)}
        type="text"
        placeholder="Content"
      />
      <input
        value={authorId}
        onChange={e => setAuthorId(e.target.value)}
        type="text"
        placeholder="Author ID"
      />
      <button onClick={handleCreatePost} disabled={creatingPost}>
        {creatingPost ? 'Creating...' : 'Create Post'}
      </button>

      <h3>Posts:</h3>
      <ul>
        {data.posts.map(({ id, title, content, author }) => (
          <li key={id}>
            <h4>{title}</h4>
            <p>{content}</p>
            <p>Author: {author.name}</p>
            <p>id: {author.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
