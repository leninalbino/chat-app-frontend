import React from 'react';

// Helper function to get a consistent color from a string
const getAvatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 75%, 60%)`;
  return color;
};

const Avatar = ({ username }) => {
  return (
    <div className="avatar-circle" style={{ backgroundColor: getAvatarColor(username) }}>
      <span className="avatar-initial">{username.charAt(0).toUpperCase()}</span>
    </div>
  );
};

export default Avatar;
