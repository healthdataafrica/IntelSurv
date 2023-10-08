import React, { useEffect, useState, useRef, useCallback } from "react";
import { getChatCompletions } from "@/helpers/getChatCompletions";
import { animateScroll } from "react-scroll";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';



const styles = {
  chatWindow: {
    
    height: "500px",
    border: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
  },
  chatMessages: {
    scrollBehavior: 'smooth',
    flex: 1,
    overflowY: "auto",
    padding: "10px",
  },
  chatInput: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
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
    backgroundColor: "#0F41A6",
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
    backgroundColor:  "rgba(237, 236, 245, 0.4)",
    padding: '15px',
    maxWidth: '80%',    // Adjust this value if needed
},

botMessage: {
  display: 'inline-block',
  alignSelf: "flex-start",
  backgroundColor: "rgba(82, 131, 163,0.1)", // 0.7 means 70% opacity
  padding: '15px',
  textAlign: 'left',
  maxWidth: '80%',
}

  
  
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
      <Image
        src="/chat-loader.gif"
        alt="Loading"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
};




export const ChatWindow = ({chatQuestion,currentKnowledgeBase}) => {
  const [chatLoading, setChatLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([{ type: 'bot', text: 'Hello! How can I assist you today?' }]);

  const messagesEndRef = useRef(null);
  const messagesEndRef2 = useRef(null);

  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
        const chatMessagesContainer = messagesEndRef.current.parentElement;
        const scrollHeight = chatMessagesContainer.scrollHeight;

        animateScroll.scrollToBottom({
            containerId: "chatMessagesContainerId",  // You need to set this id to your chat messages div
            duration: 500  // Scroll duration in milliseconds
        });
    }
};


  useEffect(() => {
 
    scrollToBottom();
  }, [messages]);

  useEffect(() => {

    if(messages.length > 1){

    setMessages([{ type: 'bot', text: 'Hello! How can I assist you today?' }]);
    }

  }, [currentKnowledgeBase]);


  useEffect(() => {

    if(chatQuestion !=''){
    if (messagesEndRef2.current) {
        messagesEndRef2.current.scrollIntoView({ behavior: "smooth" });
    }
}


    setInputValue(chatQuestion);
    
  }, [chatQuestion]);



  async function sendMessage() {
    setChatLoading(true);

    const userInput = inputValue;
    setInputValue('');
    const userMessage = { type: "user", text: userInput };

    setMessages((prevMessages) => [...prevMessages, userMessage]);


    
    const response = await getChatCompletions(
      userInput,
      currentKnowledgeBase
    );

    console.log(response);
    
    const newMessage = { type: "bot", text: response};
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setChatLoading(false);

    
  }

  function extractChatHistory(messages) {
    return messages.map(message => {
      const prefix = message.type === 'bot' ? 'Bot: ' : 'User: ';
      return `${prefix}${message.text}`;
    }).join('\n');
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  async function  handleCopyToClipboard(){

    try {

      const chatHistory =  extractChatHistory(messages);
      await navigator.clipboard.writeText(chatHistory);
      toast.success("Chat successfully copied!", {
        position: toast.POSITION.TOP_CENTER
      });
      console.log('Text copied to clipboard');
  } catch (err) {
      console.error('Failed to copy text: ', err);
  }
  


   
  };



  return (
    <>
     <div ref={messagesEndRef2}></div>

    <div id="chat"
      style={styles.chatWindow}
      className=" w-full sm:w-[600px] lg:w-[600px] xl:w-[800px] "
    >
               

   
      <div style={styles.chatMessages} id="chatMessagesContainerId">
      
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
          <a style={{cursor:'pointer'}} onClick={handleCopyToClipboard} > <Image
        src="/copy.png"
        alt=""
        style={{ width:"25px" , height: "25px" }}
      /></a>
        
        </div>
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
    </div>
    </>
  );
};
