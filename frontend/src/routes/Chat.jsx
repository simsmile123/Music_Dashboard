import '../styles/chat.css'
import Message from '../components/Message';
import MessageSend from '../components/MessageSend';
import { useState, useEffect } from 'react';
import axios from 'axios'

const Chat = () => {
    const [isMe, setIsMe] = useState(true)

    const sendMessage = (message) => {
        console.log("message to be send: ", message)
    }

    const fetchMessages = async () => {
        try {
           const response = await axios.get('http://localhost:5001/users')
           console.log(response.data)
        } catch (e){
            console.log(e)
        }
     }

     useEffect(() => {
        fetchMessages()
     })

    return (
        <div className='main-container'>  
        <div className="navbar">  </div>
        <div className='main-content'>
            <div className='chat-title-container'> 
                <h1 className='main-title'> Cariah</h1>
            </div>
            <h2> Inbox</h2>
            <div className="chat-container">
                <Message me={false}/>
                <Message me={true}/>
                <Message me={false}/>
                <Message me={false}/>

                <div className='send-container'>
                    <MessageSend sendMessage={sendMessage} />
                </div>
            </div>
        </div>    
        </div>
    )
};

export default Chat;