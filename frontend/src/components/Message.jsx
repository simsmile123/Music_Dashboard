import '../styles/chat.css'

const Message = ({me, sender, message}) => {

    return (
        <>
            <div className={me ? 'message-container-me' : 'message-container'}> 
                <div className='text-container'>
                    <p className='contact'> {me ? "Me" : sender}</p>
                    <p className='message'> 
                    {message}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Message