import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import Login from './Login';
import { getMessages } from '../services/api';

const socket = io(import.meta.env.VITE_API_URL);

const Chat = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    // Cargar mensajes iniciales
    getMessages()
      .then(setMessages)
      .catch(err => console.error("Failed to fetch messages:", err));

    // Escuchar nuevos mensajes
    socket.on('server:new_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Escuchar actualizaciones de la lista de usuarios
    socket.on('server:user_list_update', (userList) => {
      setUsers(userList);
    });

    // Escuchar actualizaciones de la lista de usuarios que están escribiendo
    socket.on('server:typing_users_update', (typingUserList) => {
      setTypingUsers(typingUserList);
    });

    return () => {
      socket.off('server:new_message');
      socket.off('server:user_list_update');
      socket.off('server:typing_users_update');
    };
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    socket.emit('client:user_joined', loggedInUser);
  };

  const handleSendMessage = (content) => {
    if (user) {
      const messageData = {
        content,
        userId: user.userId,
      };
      socket.emit('client:send_message', messageData);
    }
  };

  const renderTypingUsers = () => {
    const otherTypingUsers = typingUsers.filter(typingUser => typingUser !== user.username);

    if (otherTypingUsers.length === 0) {
      return null;
    }

    if (otherTypingUsers.length === 1) {
      return <p className="text-muted">{otherTypingUsers[0]} está escribiendo...</p>;
    }

    if (otherTypingUsers.length === 2) {
      return <p className="text-muted">{otherTypingUsers.join(' y ')} están escribiendo...</p>;
    }

    return <p className="text-muted">Varias personas están escribiendo...</p>;
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="container d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-center my-3">Latin Chat</h1>
            <button className="btn btn-primary d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasUsers" aria-controls="offcanvasUsers">
                Users
            </button>
        </div>

      <div className="row g-3">
            <div className="col-md-3 d-none d-md-block">
                <UserList users={users} />
            </div>
            <div className="col-12 col-md-9 d-flex flex-column min-h-0">
                <div className="card mb-3 d-flex flex-column flex-grow-1 min-h-0">
                  <div className="card-body overflow-auto flex-grow-1 message-list-card-body">
                    <MessageList messages={messages} currentUser={user} />
                  </div>
                  <div className="card-footer bg-white">
                    {renderTypingUsers()}
                    <MessageForm onSendMessage={handleSendMessage} socket={socket} user={user} />
                  </div>
                </div>
            </div>
        </div>

        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasUsers" aria-labelledby="offcanvasUsersLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasUsersLabel">Users</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <UserList users={users} />
            </div>
        </div>
    </div>
  );
};

export default Chat;