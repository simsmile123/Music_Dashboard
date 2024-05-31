import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/inbox.css';

const ForumCard = ({ chat }) => {
    const navigate = useNavigate();
  
    return (
      <div className="chat-card" onClick={() => navigate(`/chat/${chat.id}`)}>
        <div className="chat-card-header">
          <strong>{chat.title}</strong>
          <span>{new Date(chat.timestamp).toLocaleString()}</span>
        </div>
        <p className="chat-card-message">{chat.lastMessage}</p>
      </div>
    );
  };
  
  export default ForumCard;