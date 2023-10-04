import React, { useEffect, useState, useRef, useCallback } from "react";
import { getChatCompletions } from "@/helpers/getChatCompletions";

const styles = {
  chatWindow: {
    
    height: "400px",
    border: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
  },
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
  },
  chatInput: {
    display: "flex",
    padding: "10px",
    borderBottom: "1px solid #ccc",
    height: "60px",
  },
  inputField: {
    flex: 1,
    padding: "5px 10px",
    marginRight: "10px",
  },
  sendButton: {
    height: "40px",
    width: "60px",
    padding: "5px 15px",
    backgroundColor: "#50C878",
    borderRadius: "5px", // or '50%' for a fully rounded button
    color: "white", // assuming you want the text color to be white
    border: "none", // to remove any default borders
    cursor: "pointer", // to indicate it's clickable
  },
  chatMessage: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "5px",
  },
  userMessage: {
    display: 'inline-block',   // Add this
    alignSelf: "flex-end",
    backgroundColor: "#fcfcfc",
    padding: '15px',
    maxWidth: '80%',    // Adjust this value if needed
},

botMessage: {
    display: 'inline-block',   // Add this
    alignSelf: "flex-start",
    backgroundColor: "#DAF4E3",
    padding: '15px',
    textAlign: 'left',
    maxWidth: '80%',    // Adjust this value if needed
},
  
  
};

const Loader = () => {
  const containerStyle = {
    height: "30px",
    width: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <img
        src="/chat-loader.gif"
        alt="Loading"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
};

export const ChatWindow = ({}) => {
  const [chatLoading, setChatLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([{ type: 'bot', text: 'Hello! How can I assist you today?' }]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      // 2. Scroll the last message into view
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);


  async function sendMessage() {
    setChatLoading(true);

    const userInput = inputValue;
    setInputValue('');
    const userMessage = { type: "user", text: userInput };

    setMessages((prevMessages) => [...prevMessages, userMessage]);


    
    const response = await getChatCompletions(
      userInput,
      "intelsurv-case-definitions"
    );

    console.log(response);
    
    const newMessage = { type: "bot", text: response};
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setChatLoading(false);

    
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };


  return (
    <div
      style={styles.chatWindow}
      className=" w-full sm:w-[600px] lg:w-[600px] xl:w-[800px] "
    >
      <div style={styles.chatInput}>
        <input
          value={inputValue}
          type="text"
          placeholder="Type your message..."
          style={styles.inputField}
          onChange={handleInputChange}
        />
        <div
          style={{
            width: "60px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {chatLoading ? (
            <Loader />
          ) : (
            <button onClick={sendMessage} style={styles.sendButton}>
              Send
            </button>
          )}
        </div>
      </div>
      <div style={styles.chatMessages}>
      
      {messages.map((message, index) => (
    <div key={index} style={{ display: 'flex', justifyContent: message.type === "user" ? 'flex-end' : 'flex-start' }}>
        <div style={{
            ...styles.chatMessage,
            ...(message.type === "user" ? styles.userMessage : styles.botMessage),
        }}>
            {message.text}
        </div>
    </div>
))}
        <div ref={messagesEndRef}></div>


      </div>
    </div>
  );
};
