import React from 'react';
import Avatar from './Avatar';

const UserList = ({ users }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-3">Users</h5>
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li key={user} className="list-group-item d-flex align-items-center">
              <Avatar username={user} />
              <span className="ms-2">{user}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;