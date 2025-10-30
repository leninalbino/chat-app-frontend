import React, { useEffect, useRef } from 'react';
import Avatar from './Avatar';

const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list-container message-list-scroll">
      {messages.map((msg) => {
        const isCurrentUser = currentUser && msg.userId === currentUser.userId;
        return (
          <div
            key={msg.id}
            className={`d-flex mb-3 message-item ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'}`}
          >
            {!isCurrentUser && (
              <div className="me-2">
                <Avatar username={msg.username} />
              </div>
            )}
            <div className={`message-bubble ${isCurrentUser ? 'sent' : 'received'}`}>
              <div className="message-username fw-bold mb-1">
                {msg.username}
              </div>
              <div className="message-content">
                {msg.content}
              </div>
            </div>
            {isCurrentUser && (
              <div className="ms-2">
                <Avatar username={msg.username} />
              </div>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;