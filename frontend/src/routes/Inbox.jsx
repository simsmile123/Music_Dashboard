import React, { useState, useEffect } from 'react';
import InboxSearch from '../components/InboxSearch';
import InboxCard from '../components/InboxCard';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Inbox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const id = localStorage.getItem("id");
    let chatConvo = [];
    const [chatLog, setChatLog] = useState([]);

    const fetchChats = async () => {
      try {
          const response = await axios.get(`http://localhost:5001/inbox/${id}`)
          console.log(response, " -> API Response")
          const temp = response.data.chats
          chatConvo = temp;
      } catch (e) {
          console.error(e)
      }
      handleChatLog();
    }

    const handleChatLog = async () => {
      let chats = []
      for (const chatId of chatConvo) {
        try {
          console.log("chatID", chatId)
          const response = await axios.get(`http://localhost:5001/messages/chat/${chatId}`)
          console.log('Response', response);
          const history = response.data.history;
          const user = response.data.user2;
          console.log('History:', history)
          const last_message = history[history.length - 1];
          console.log('last_message',last_message)
          const messageData = last_message.message;
          const time = last_message.time;
          const chatData = {
            'id': chatId,
            'user': user,
            'lastMessage': messageData,
            'timestamp': time,
          }
          chats.push(chatData)
          console.log('Data:', chatData);
        } catch (e) {
            console.error(e)
        }
      }
      setChatLog(chats);
    }

    useEffect(() => {
      fetchChats();
    }, [])

    const filteredChats = chatLog.filter(chat =>
      chat.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
        <div className='inbox-wrapper'>
            <Navbar/>
            <div className='chatbox-wrapper'>
                <h1>Inbox</h1>
                <InboxSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
                {filteredChats.map(chat => (
                <InboxCard key={chat.id} chat={chat} />
                ))}
            </div>
        </div>
    );
  };
  
  export default Inbox;