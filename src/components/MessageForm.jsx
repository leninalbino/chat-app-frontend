import React, { useState } from 'react';

const MessageForm = ({ onSendMessage, socket, user }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    if (newMessage) {
      socket.emit('client:user_typing', { userId: user.userId, username: user.username });
    } else {
      socket.emit('client:user_stopped_typing', { userId: user.userId, username: user.username });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      socket.emit('client:user_stopped_typing', { userId: user.userId, username: user.username });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sticky-form-mobile">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </div>
    </form>
  );
};

export default MessageForm;
