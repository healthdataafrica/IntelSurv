import {React} from 'react';
import { Guides } from '@/components/Guides';
import { Resources } from '@/components/Resources';
import { HeroPattern } from '@/components/HeroPattern';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading'
import store from "../components/store";
import { ChatBubbleIcon } from '@/components/icons/ChatBubbleIcon'


const index = () => {
    const { mainStore } = store;
    const { setSelectedFormField, selectedFormField } = mainStore();



    
    const styles = {
        chatWindow: {
          
          height: '400px',
          border: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
        },
        chatMessages: {
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
        },
        chatInput: {
          display: 'flex',
          padding: '10px',
          borderTop: '1px solid #ccc',
        },
        inputField: {
          flex: 1,
          padding: '5px 10px',
          marginRight: '10px',
        },
        sendButton: {
            padding: '5px 15px',
            backgroundColor: '#50C878',
            borderRadius: '5px', // or '50%' for a fully rounded button
            color: 'white', // assuming you want the text color to be white
            border: 'none', // to remove any default borders
            cursor: 'pointer', // to indicate it's clickable
          },
        chatMessage: {
          marginBottom: '10px',
          padding: '8px',
          borderRadius: '5px',
        },
        userMessage: {
          alignSelf: 'flex-end',
          backgroundColor: '#DAF4E3',
          
        },
        botMessage: {
          alignSelf: 'flex-start',
          backgroundColor: '#fcfcfc',
        },
      };
      
      const ChatWindow = ({ messages = [ { type: 'bot', text: 'Hello! How can I assist you today?' },
     ] }) => (
        <div style={styles.chatWindow} className=' w-full sm:w-[600px] lg:w-[600px] xl:w-[800px] '>
          <div style={styles.chatMessages}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.chatMessage,
                  ...(message.type === 'user' ? styles.userMessage : styles.botMessage),
                }}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div style={styles.chatInput}>
            <input type="text" placeholder="Type your message..." style={styles.inputField} />
            <button style={styles.sendButton}>Send</button>
          </div>
        </div>
      );


    function Icon({ icon: Icon }) {
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
            <Icon className="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" />
          </div>
        )
      }


    function Search() {

        function SearchIcon(props) {
            return (
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
                />
              </svg>
            )
          }
      
     
        return (
         
<form class="flex items-center">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full sm:w-[600px] lg:w-[600px] xl:w-[800px]" >
      
        <input type="text" id="simple-search" class=" w-full sm:w-[600px] lg:w-[600px] xl:w-[800px] bg-gray-50 border-gray-300 text-gray-900 focus:border-none text-sm rounded-lg block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your question..." required/>
    </div>
    <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-emerald-400 rounded-lg   hover:bg-emerald-600 dark:bg-emerald-400 dark:hover:bg-emerald-600 ">
       SEND
       
    </button>
</form>

        )
      }


     function userChat() {
        return (
            <div className="my-16 xl:max-w-none">
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                
                <Heading level={2} id="resources">Ask your Own Question</Heading>
            </div>

            <div>
            <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3">  </div>

           <div className='mb-10' style={{fontSize:'18px'}}> Welcome to the <a href="#">IntelSurv</a> assistant, ask and recieve answers </div>

                  



           <ChatWindow/>
            </div>

            
        </div>
        
        )
      }

    return (
        <div>
            <HeroPattern />

            {/* You can uncomment and utilize this section when needed.
            <div>
                Use the Protocol API to access contacts, conversations, group messages, and more and seamlessly integrate your product into the workflows of dozens of devoted Protocol users.
                <div className="prose mb-16 mt-6 flex gap-3">
                    <Button href="/quickstart" arrow="right">
                        Quickstart
                    </Button>
                    <Button href="/sdks" variant="outline">
                        Explore SDKs
                    </Button>
                </div>
            </div>
            */}

            {
                selectedFormField === null ?
                    <div>
                        <h1>Getting Started</h1>
                        <span style={{fontSize:'20px',lineHeight:'30px'}}>Welcome to <a href="#">IntelSurv</a>. To get started, select a form field from the list to your left. To filter and search for your preferred field, simply input your search query in the panel above, the fields are numbered in the order they appear on the form</span>
                    </div>
                :
                <div style={{fontSize:'18px',lineHeight:'35px'}}>
                {selectedFormField.href && selectedFormField.title && (
                  <h1>{selectedFormField.href}. {selectedFormField.title}</h1>
                )}
              
                {selectedFormField.elemDescr && (
                  <><strong>Description:</strong> {selectedFormField.elemDescr}<br/></>
                )}
              
                {selectedFormField.idsrQListing && selectedFormField.idsrQListing.title && (
                  <><strong>Form:</strong> {selectedFormField.idsrQListing.title}<br/></>
                )}
              
                {selectedFormField.idsrQListing && selectedFormField.idsrQListing.country && (
                  <><strong>Country:</strong> {selectedFormField.idsrQListing.country}<br/></>
                )}
              
                {selectedFormField.idsrQListing && selectedFormField.idsrQListing.creator && (
                  <><strong>Creater:</strong> {selectedFormField.idsrQListing.creator}<br/></>
                )}
              
                {selectedFormField.idsrQListing && selectedFormField.idsrQListing.institution && (
                  <><strong>Institution:</strong> {selectedFormField.idsrQListing.institution}<br/></>
                )}
              
                {selectedFormField.idsrQListing && selectedFormField.idsrQListing.dateIssue && (
                  <><strong>Date Issue:</strong> {selectedFormField.idsrQListing.dateIssue}<br/></>
                )}
              
                {selectedFormField.idsrQListing && selectedFormField.idsrQListing.version && (
                  <><strong>Version:</strong> {selectedFormField.idsrQListing.version}<br/></>
                )}
              
                {selectedFormField.idsrQListing && selectedFormField.idsrQListing.linkToForm && (
                  <a  target="_blank" 
                  rel="noopener noreferrer"href={selectedFormField.idsrQListing.linkToForm}> <strong>Link to Form</strong></a>
                )}
              </div>
              
            }

            {selectedFormField !=null? <Resources />:<></>}

            {selectedFormField != null ? userChat() : <></>}

            




            {/* You can uncomment and utilize this section when needed.
            <div>
                <Button href="/sdks" variant="text" arrow="right">
                    Get your API key
                </Button>
            </div>
            
           
            
           
            */}
        </div>
    );
};

export default index;
