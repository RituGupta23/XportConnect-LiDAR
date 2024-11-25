import { useState, useEffect, useRef } from "react";

// API calls
const getMessages = async (token) => {
  // Fetch messages from an API or server
  try {
    const response = await fetch('/api/messages', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    return data.messages; // assuming the response contains a 'messages' array
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    throw error;
  }
};

const sendMessage = async (token, text) => {
  // Send the message to the API
  try {
    await fetch('/api/sendMessage', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ text })
    });
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
};

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  // Fetch messages on mount and when the token changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesData = await getMessages(user.token);
        setMessages(messagesData);
      } catch (err) {
        alert("Failed to fetch messages");
      }
    };
    fetchMessages();
  }, [user.token]);

  // Handle sending a message
  const handleSend = async () => {
    if (!text.trim()) return; // Prevent sending empty messages
    try {
      await sendMessage(user.token, text);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text, sender: user.username },
      ]);
      setText("");
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      alert("Failed to send message");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6">Chat with XportExpert</h2>
      <div className="h-40 overflow-y-auto border mb-4 p-2 bg-gray-100 rounded-lg">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <p key={idx}>
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <input
        className="w-full p-3 mb-4 border rounded-lg"
        value={text}
        placeholder="Type a message"
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        onClick={handleSend}
      >
        Send Message
      </button>
    </div>
  );
};

export default Chat;
