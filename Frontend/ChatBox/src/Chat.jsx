// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// const socket = io.connect('http://localhost:8003') // to connect socket with front 




// const Chat = () => {
//   const [username, setUsername] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [hasSetUsername, setHasSetUsername] = useState(false);

//   useEffect(() => {
//     socket.on('message', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       socket.off('message');
//     };
//   }, []);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       const data = { username, message, isSender: true };  // Add isSender flag for the current user
//       socket.emit('message', data); //emit to send data to server ie send hi to server ,kuch bhi naam dedo eg message
//       setMessage('');
//     }
//   };

//   const handleSetUsername = (e) => {
//     e.preventDefault();
//     if (username.trim()) {
//       setHasSetUsername(true);
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <h2 className="text-center">Chat App</h2>

//           {!hasSetUsername ? (
//             <Form onSubmit={handleSetUsername}>
//               <Form.Group>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your username..."
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </Form.Group>
//               <Button variant="primary" type="submit" className="w-100 mt-2">
//                 Set Username
//               </Button>
//             </Form>
//           ) : (
//             <>
//               <div
//                 className="chat-box border rounded p-3 mb-3"
//                 style={{ height: '300px', overflowY: 'auto', textAlign: 'left' }}
//               >
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`p-2 mb-2 ${msg.username === username ? 'text-right' : 'text-left'}`}
//                     style={{
//                       backgroundColor: msg.username === username ? '#d1e7dd' : '#f8d7da',
//                       borderRadius: '10px',
//                       maxWidth: '80%',
//                       marginLeft: msg.username === username ? 'auto' : '0',
//                       marginRight: msg.username === username ? '0' : 'auto',
//                     }}
//                   >
//                     <strong>{msg.username}: </strong>{msg.message}
//                   </div>
//                 ))}
//               </div>
//               <Form onSubmit={sendMessage}>
//                 <Form.Group>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter message..."
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" className="w-100 mt-2">
//                   Send
//                 </Button>
//               </Form>
//             </>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Chat;




import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Form, Button } from 'react-bootstrap';

const socket = io.connect('http://localhost:8003') // to connect socket with front 

const Chat = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasSetUsername, setHasSetUsername] = useState(false);

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const data = { username, message, isSender: true };  // isSender flag = current user
      socket.emit('message', data); // Emit to send data to server
      setMessage('');
    }
  };

  const handleSetUsername = (e) => {
    e.preventDefault();
    console.log(e)
    if (username.trim()) {
      setHasSetUsername(true);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Chat App</h2>

          {!hasSetUsername ? (
            <form onSubmit={handleSetUsername}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-2">
                Set Username
              </button>
            </form>
          ) : (
            <>
              <div
                className=" border rounded p-3 mb-3"
                style={{ height: '350px', overflowY: 'auto', textAlign: 'left' }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 mb-2 ${msg.username === username ? 'text-right' : 'text-left'}`}
                    style={{
                      backgroundColor: msg.username === username ? '#d1e7dd' : '#80ff80',
                      borderRadius: '10px',
                      maxWidth: '80%',
                  
                    }}
                  >
                    <strong>{msg.username}: </strong>{msg.message}
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-2">
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
