// import ListGroup from 'react-bootstrap/ListGroup';

// function InboxInterface() {
//   const alertClicked = () => {
//     alert('You clicked the third ListGroupItem');
//   };

//   return (
//     <ListGroup defaultActiveKey="#link1">
//       <ListGroup.Item action onClick={alertClicked}>
//         Link 1
//       </ListGroup.Item>
//       <ListGroup.Item action onClick={alertClicked}>
//         Link 2
//       </ListGroup.Item>
//       <ListGroup.Item action onClick={alertClicked}>
//         This one is a button
//       </ListGroup.Item>
//     </ListGroup>
//   );
// }

// export default InboxInterface;

import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Form, InputGroup } from 'react-bootstrap';
import '../styles/inbox.css';

// Dummy data for users and messages
const data = [
  { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?' },
  { id: 2, name: 'Jane Smith', lastMessage: 'Are you coming tomorrow?' },
  { id: 3, name: 'Alice Johnson', lastMessage: 'Let’s catch up later!' },
  // Add more users as needed
];

const InboxInterface = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          {/* Space for existing navbar */}
          <div className="navbar-placeholder">
            {/* Navbar placeholder */}
          </div>
          <div className="search-bar-container">
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </div>
          <ListGroup>
            {filteredData.map((user) => (
              <ListGroup.Item
                key={user.id}
                action
                onClick={() => handleChatSelect(user)}
                active={selectedChat?.id === user.id}
              >
                <div className="fw-bold">{user.name}</div>
                <div className="text-muted">{user.lastMessage}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9}>
          {selectedChat ? (
            <div>
              <h4>Chat with {selectedChat.name}</h4>
              <p>{selectedChat.lastMessage}</p>
              {/* Here you can add the actual chat component */}
            </div>
          ) : (
            <div>
              <h4>Select a chat to start messaging</h4>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default InboxInterface;
