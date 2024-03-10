// src/components/Users.js
import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_USERS, CREATE_USER } from '../queries/userQueries';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
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
      <ul>
        {data && data.users.map(({ id, name, email }) => (
          <li key={id}>{name} ({email})</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
