import React from 'react';

function Message({ message, name }) {
  return (
    <div className="text-break mb-2">
      <b>{name}</b>
      {`:
      ${message}
      `}
    </div>
  );
}

export default Message;
