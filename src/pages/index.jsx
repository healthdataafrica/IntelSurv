import React, { useEffect, useState, useRef, useCallback } from "react";
import { Guides } from '@/components/Guides';
import { Resources } from '@/components/Resources';
import { HeroPattern } from '@/components/HeroPattern';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading'
import store from "../components/store";
import { ChatBubbleIcon } from '@/components/icons/ChatBubbleIcon'
import { getChatCompletions } from "@/helpers/getChatCompletions";
import { ChatWindow } from "@/components/chatWindow";


const index = () => {
    const { mainStore } = store;
    const { setSelectedFormField, selectedFormField } = mainStore();
    const [chatMessages, setChatMessages] = useState([ { type: 'bot', text: 'Hello! How can I assist you today?' }]);





    const handleInputChange = useCallback((event) => {
      setInputValue(event.target.value);
      console.log('here is the textbox input', event.target.value);
    }, []);


    



    function Icon({ icon: Icon }) {
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
            <Icon className="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" />
          </div>
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

            {selectedFormField != null ? userChat(chatMessages) : <></>}

            
            {selectedFormField != null ? <ChatWindow messages={chatMessages} />: <></>}




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
