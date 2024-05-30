import '../styles/chat.css'

const Message = ({me}) => {

    return (
        <>
            <div className={me ? 'message-container-me' : 'message-container'}> 
                <div className='text-container'>
                    <p className='contact'> Cariah</p>
                    <p className='message'> 
                    Everything about this song is so good, it never gets old! I could listen to it every day.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Message