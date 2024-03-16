// src/components/Posts.js
import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_POSTS, CREATE_POST } from '../queries/postQueries';
import { useNavigate  } from 'react-router-dom';
function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [createPost , { loading: creatingPost }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }], // 여기에 refetchQueries 추가
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

  let navigate = useNavigate ();

  function handleClick(path) {
    navigate(`/user/${path}`); // 여기서 "/new-path"는 이동하고자 하는 경로입니다.
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div style={{paddingLeft: "10px"}}>
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
        {data.posts.map(({ postId, title, content, author }) => (
          <li style={{ 
            border: '1px solid black',
            cursor: 'pointer',
            width: "fit-content"
          }} key={postId} onClick={() => handleClick(author.userId)}>
            <h4>{title}</h4>
            <p>{content}</p>
            <p>Author: {author.name}</p>
            <p>id: {author.userId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
