// src/components/Users.js
import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_USERS, CREATE_USER } from '../queries/userQueries';
import { useNavigate } from 'react-router-dom';
function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }], // 여기에 refetchQueries 추가
    onError: (error) => {
      // 여기서 사용자에게 에러 메시지를 표시할 수 있습니다.
      console.error("Error creating user:", error.message);
    }
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleCreateUser = async () => {
    try {
      await createUser({ variables: { name, email } });
      setName('');
      setEmail('');
    } catch (error) {
      // 여기서 사용자에게 에러 메시지를 표시할 수 있습니다.
      // 이미 useMutation의 onError에서 처리가 가능합니다.
    }
  };

  let navigate = useNavigate ();

  function handleClick(path) {
    navigate(`/user/${path}`); // 여기서 "/new-path"는 이동하고자 하는 경로입니다.
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{paddingLeft: "10px"}}>
      <h3>Create New User:</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
      />
      <button onClick={handleCreateUser} disabled={creatingUser}>
        {creatingUser ? 'Creating...' : 'Create User'}
      </button>

      <h3>Users:</h3>
      <ul style={{ 
            width: "400px",
          }}>
        {data && data.users.map(({ userId, name, email }) => (
          <li style={{ 
            border: '1px solid black',
            cursor: 'pointer',
            
            paddingLeft: "10px"
          }} key={userId} onClick={() => handleClick(userId)}>{name} ({email})</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
