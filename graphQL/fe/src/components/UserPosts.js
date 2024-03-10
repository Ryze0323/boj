// src/components/UserPosts.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from '../queries/postQueries'; // 해당 쿼리를 만들어야 함
import { useParams, Link } from 'react-router-dom';

function UserPosts() {
  let { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER_POSTS, { variables: { userId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3>User Posts:</h3>
      {data.posts.map(({ _id, title, content }) => (
        <div key={_id}>
          <h4>{title}</h4>
          <p>{content}</p>
        </div>
      ))}
      <Link to={`/users`}>Back to Users</Link>
    </div>
  );
}

export default UserPosts;
