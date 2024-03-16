// src/components/UserDetail.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../queries/userQueries'; // 해당 쿼리를 만들어야 함
import { useParams, Link } from 'react-router-dom';

function UserDetail() {
  let { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER, { variables: { userId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div style={{paddingLeft: "10px"}}>
      <h3>{data.user.name}</h3>
      <p>Email: {data.user.email}</p>
      <Link to={`/user/${userId}/posts`}>View Posts</Link>
    </div>
  );
}

export default UserDetail;
