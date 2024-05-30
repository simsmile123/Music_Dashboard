import '../styles/chat.css'
import Message from '../components/Message';
import MessageSend from '../components/MessageSend';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Navbar from '../components/Navbar';

const Chat = () => {
    const [isMe, setIsMe] = useState(true)

    const sendMessage = (message) => {
        console.log("message to be send: ", message)
    }

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5001/messages')
            console.log(response, " -> API Response")
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    return (
        <div className='main-content'> 
            <Navbar/>
            <div className='main-container'> 
                {/* <div className="navbar">  </div> */}
                {/* <div className='parent-container'> */}
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
                {/* </div>     */}
            </div>
        </div>
    )
};

export default Chat;