import '../styles/chat.css'
import Message from '../components/Message';
import MessageSend from '../components/MessageSend';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import Navbar from '../components/Navbar';
import empty from "../assets/mail.png"

const ForumChat = () => {
    const [myUserName, setMyUserName] = useState('')
    const [myUserID, setMyUserID] = useState('')
    const [forumID, setForumID] = useState('')
    const [forumTitle, setForumTitle] = useState('')
    const [conversation, setConversation] = useState([])
    const chatContainerRef = useRef(null);

    const sendMessage = async (message) => {
        const id = 'cqLcCNGx1y0oe5zMXN6V' 
        console.log("message to be send: ", message)
        const data = {
            message: message,
            time: Date.now(),
            user: myUserName
        }

        try {
            await axios.put(`http://localhost:5001/messages/forum/${id}`, data)
        } catch (e) {
            console.error(e)
        }
        fetchConversation()
    }

    //get my userID from context

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5001/messages/users')
            console.log(response, " -> API Response")
        } catch (e) {
            console.error(e)
        }
    }

    const fetchConversation = async (forumID) => {
        const id = 'cqLcCNGx1y0oe5zMXN6V'
        try {
            const response = await axios.get(`http://localhost:5001/messages/forum/${id}`)
            setConversation(response.data.history)
            setForumTitle(response.data.title)
            console.log(response, " -> Conversations")
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        // fetchMessages()
        setMyUserName("Milton")
        setForumID('oLZO2BY2mYv4QAvS6P1w') //use the provided forumID instead
        fetchConversation(forumID)
    }, [])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [conversation]);

    return (
        <div className='main-content'> 
            <Navbar/>
            <div className='main-container'> 
                <div className='parent-container'>
                    <div className='chat-title-container'> 
                        <h1 className='main-title'>{forumTitle}</h1>
                    </div>

                    <div className="chat-container" ref={chatContainerRef}>
                        <div className='conversation-container'> 
                            {conversation[0] ? conversation.map((message, index) => { 
                                return (
                                <>
                                    <Message key={index} me={myUserName == message.user} sender={message.user} message={message.message}/>
                                </>
                            )
                            }) : <img className='empty-message' src={empty}/>}
                        </div>
                    </div>
                        <div className='send-container'>
                            <MessageSend sendMessage={sendMessage} />
                        </div>
                   
                </div>    
            </div>
        </div>
    )
};

export default ForumChat;