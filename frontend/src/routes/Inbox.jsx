import React, { useState } from 'react';
import InboxSearch from '../components/InboxSearch';
import InboxCard from '../components/InboxCard';
import Navbar from '../components/Navbar';

const Inbox = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const chats = [
        {
          id: 1,
          user: 'Alice',
          lastMessage: 'Hey there!',
          timestamp: '2024-05-30T14:48:00.000Z',
        },
        {
          id: 2,
          user: 'Bob',
          lastMessage: 'How are you?',
          timestamp: '2024-05-29T10:23:00.000Z',
        },
      ];

    const filteredChats = chats.filter(chat =>
      chat.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div style={{ padding: '20px' }}>
        <Navbar/>
        <InboxSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
        {filteredChats.map(chat => (
          <InboxCard key={chat.id} chat={chat} />
        ))}
      </div>
    );
  };
  
  export default Inbox;