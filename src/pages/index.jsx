import { useRef,useState,useEffect } from 'react'
import { Button } from "@/components/Button";
import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon";
import QuestionnaireOptions from "@/components/QuestionnaireOptions";
import { Heading } from "@/components/Heading";
import { HeroPattern } from "@/components/HeroPattern";
import { Resources } from "@/components/Resources";
import store from "../stores/store";
import { ChatWindow } from "@/components/chatWindow";
import { ChooseKnowledgeBase } from '@/components/chooseKnowledgeBase';
import { Logo2 } from '@/components/logo2';
import { useMobileNavigationStore } from '@/components/MobileNavigation';
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation';
import {ChatHistory} from  "@/components/chatHistory";

const IndexPage = () => {
  const { mainStore } = store;
  const { setSelectedFormField, selectedFormField, currentSession, setCurrentSession , chatLogs,setChatLogs} = mainStore();
  const [chatQuestion, setChatQuestion] = useState('');
  const [askYourOwnQuestion, setAskYourOwnQuestion] = useState(0);

  const [currentKnowledgeBase, setCurrentKnowledgeBase] = useState('CASE');
  const [semContext, setSemContext] = useState('');
  const [synContext, setSynContext] = useState('');
  const [historyData, setHistoryData] = useState([]);


  const [isScreenSmall, setIsScreenSmall] = useState(null); 

  


  let { isOpen, toggle, close } = useMobileNavigationStore();
  let isInsideMobileNavigation = useIsInsideMobileNavigation()




  useEffect(() => {
    function handleResize() {
      // Check if screen size is less than a specific size
      setIsScreenSmall(window.innerWidth < 640);
    }

    // Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Set the initial value
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



 
  const styles = {
    // Styles for the chat window
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
      borderRadius: '5px',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
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

  function chunkArrayInThrees(array) {
    // Add an index property to each object
    const indexedArray = array.map((item, index) => ({
        ...item,
        index: index + 1
    }));

    let chunks = [];
    for (let i = 0; i < indexedArray.length; i += 3) {
        chunks.push(indexedArray.slice(i, i + 3));
    }

    return chunks;
}

function chunkArrayInSix(array) {
    let chunks = [];
  for (let i = 0; i < array.length; i += 6) {
      chunks.push(array.slice(i, i + 6));
  }

  return chunks;
}


  const userChat = (chatQuestion,currentKnowledgeBase,setCurrentKnowledgeBase) => (
    <div className="my-16 xl:max-w-none">
      <div style={{ display: 'inline-flex', alignItems: 'center' }}> 
        <Heading level={2} id="resources">Ask your Own Question</Heading>
      </div>

      <div>
        <div className="not-prose mt-2 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-2 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3"></div>

        <div className='mb-0 text-gray-500' style={{ fontSize: '16px' }}>

      {/*  Hello. I am <a href="#">IntelSurv</a>, your AI assistant, How can I assist you today? There are 3 types of questions: about to case definitions of diseases, about form fields and general. Select the type (context) you want when asking a question. */}

         
        </div>

        {selectedFormField !== null && <ChooseKnowledgeBase currentKnowledgeBase={currentKnowledgeBase} setCurrentKnowledgeBase={setCurrentKnowledgeBase} setSynContext={setSynContext} setSemContext={setSemContext} />}

 

        <ChatWindow element={selectedFormField.href} field={selectedFormField.title}  askYourOwnQuestion={askYourOwnQuestion}  chatQuestion={chatQuestion} currentKnowledgeBase={currentKnowledgeBase}  synContext={synContext} semContext={semContext}     />
      </div>
    </div>
  );

  const filterBySession = (array, sessionId) => {
    return array.filter(item => item.session === sessionId);
  };
  

  function CollapsibleDiv({selectedFormField}) {
    const [showInstructions, setShowInstructions] = useState(false);
  
    const toggleInstructions = () => {
      setShowInstructions(prevState => !prevState);
    };
  
    return (
      <div>

{selectedFormField.idsrQListing && selectedFormField.idsrQListing.linkToForm && (
            <a target="_blank" rel="noopener noreferrer" href={selectedFormField.idsrQListing.linkToForm}>
<button
          type="button"
          style={{fontWeight:'400',  backgroundColor: "#5283A3", color:'white',    marginTop:'10px' , marginRight: '10px', paddingLeft: '8px',paddingRight:'8px', border: '1px solid #5283A3 ', fontSize:'15px'}}
         


        >
       Link to Form
        </button>
        </a> )}
      
        <button
          type="button"
          style={{ backgroundColor: "#5283A3", color:'white',  marginTop:'10px' , marginRight: '10px', paddingLeft: '8px',paddingRight:'8px', border: '1px solid #5283A3', fontSize:'15px'}}
          onClick={toggleInstructions}
        >
          {showInstructions? "Hide Info" : "More Info"}
        </button>
        { isScreenSmall ?<button
          type="button"
          style={{ backgroundColor: "#5283A3", color:'white',    marginTop:'10px' , marginRight: '10px', paddingLeft: '8px',paddingRight:'8px', border: '1px solid #5283A3', fontSize:'15px'}}
          onClick={() => toggle()}


        >
         View & Select Fields
        </button>: null}

        <button
          type="button"
          style={{  backgroundColor: "#5283A3", color:'white',    marginTop:'10px' , marginRight: '10px', paddingLeft: '8px',paddingRight:'8px', border: '1px solid #5283A3 ', fontSize:'15px'}}
          onClick={() => setAskYourOwnQuestion(prevState => prevState + 1)}


        >
        Ask a Question 
        </button>
  
        {showInstructions && (
          <div>
            <p style={{ fontSize: "14px" }}>
         

          {selectedFormField.idsrQListing && selectedFormField.idsrQListing.country && (
            <><strong>Country:</strong> {selectedFormField.idsrQListing.country}<br /></>
          )}

          {selectedFormField.idsrQListing && selectedFormField.idsrQListing.creator && (
            <><strong>Creator:</strong> {selectedFormField.idsrQListing.creator}<br /></>
          )}

          {selectedFormField.idsrQListing && selectedFormField.idsrQListing.institution && (
            <><strong>Institution:</strong> {selectedFormField.idsrQListing.institution}<br /></>
          )}

          {selectedFormField.idsrQListing && selectedFormField.idsrQListing.dateIssue && (
            <><strong>Date Issue:</strong> {selectedFormField.idsrQListing.dateIssue}<br /></>
          )}

          {selectedFormField.idsrQListing && selectedFormField.idsrQListing.version && (
            <><strong>Version:</strong> {selectedFormField.idsrQListing.version}<br /></>
          )}
              
              </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <HeroPattern />
      {selectedFormField === null ? (
  <div>
    <Logo2/>

    <h1>Getting Started</h1>
   {isScreenSmall?
   <div> <p style={{ fontSize: '15px', lineHeight: '30px', color: '#3C3B40' }}>
      Hello, I am <a href="#">IntelSurv</a>, your AI assistant for disease surveillance data collection. I&rsquo;m currently trained for the Malawi Integrated Disease Surveillance system, but I&rsquo;m continuously learning to support data collection in other countries as. </p>
      
      <p>You can ask me 3 kinds of questions</p>
        <ul>
       <li><strong>Case definitions of diseases</strong></li>
         <li><strong>Form fields</strong></li> 
        <li><strong>General surveillance</strong></li>
           
          </ul>

          

       <p> By default I am listenimg to case definitions. But you can select the database you want when asking a question.


    

      To get started, click the "Open Questionnaire Fields" button below to display available fields, to filter and search for your preferred field, simply input your search query. The fields are numbered in the order they appear on the form.
    </p> 
    <button
          type="button"
          style={{ backgroundColor: "#5283A3", color:'white',  marginTop:'10px' , marginRight: '10px', paddingLeft: '8px',paddingRight:'8px', border: '1px solid #efefef', fontSize:'15px'}}
          onClick={() => toggle()}


        >
         Go to Help Page
        </button>
    
    </div>:<div style={{ fontSize: '17px', lineHeight: '30px', color: '#3C3B40' }}><p >
      Hello, I am <a href="#">IntelSurv</a>, your AI assistant for disease surveillance data collection. I&rsquo;m currently trained for the Malawi Integrated Disease Surveillance system, but I&rsquo;m continuously learning to support data collection in other countries as well.</p>


 
  <p >You can ask me 3 kinds of questions</p>
        <ul>
       <li><strong>Case definitions of diseases</strong></li>
         <li><strong>Form fields</strong></li> 
        <li><strong>General surveillance</strong></li>
           
          </ul>

          

         <p>By default I am listenimg to case definitions. But you can select the database you want when asking a question.



      To get started, select a form field from the list to your left. To filter and search for your preferred field, simply input your search query. The fields are numbered in the order they appear on the form. 
    </p> 
    <button
          type="button"
          style={{ backgroundColor: "#5283A3", color:'white',  marginTop:'10px' , marginRight: '10px', paddingLeft: '8px',paddingRight:'8px', border: '1px solid #efefef', fontSize:'15px'}}
          onClick={() => toggle()}


        >
         Go to Help Page
        </button>
    
    </div>
    
     
    
    }

    
   { isScreenSmall ?<button
          type="button"
          style={{ backgroundColor: "#5283A3", color:'white',  marginTop:'10px' , marginRight: '10px', paddingLeft: '8px',paddingRight:'8px', border: '1px solid #efefef', fontSize:'15px'}}
          onClick={() => toggle()}


        >
         View and Select Fields
        </button>: null}
  </div>
)
 : (
        <>

{ isScreenSmall ?
        <a href="/" style={{marginBottom:'20px'}}>Go to Homepage </a>
       : null}

     

<span style={{fontSize: '16px'}}><strong>Selected field:</strong>  {selectedFormField.href && selectedFormField.title && (
           <span><strong>{selectedFormField.title} (Field No {selectedFormField.href})</strong></span>
          )}</span>

        <div style={{ fontSize: '16px', lineHeight: '35px' }}>
         
          {selectedFormField.idsrQListing.title && (
            <><strong>Form: </strong>{selectedFormField.idsrQListing.title}<br /></>
          )}



          {selectedFormField.elemDescr && (
            <><strong>Description:</strong> {selectedFormField.elemDescr}<br /></>
          )}

         
        


     <div >
          {selectedFormField.qOptions.length!=0 && <QuestionnaireOptions qOptions={chunkArrayInSix(selectedFormField.qOptions)} total={selectedFormField.qOptions.length} />} </div>
        </div></>
      )}
<br/>
{selectedFormField  !== null && <CollapsibleDiv selectedFormField={selectedFormField} />}
{selectedFormField !== null && selectedFormField.elemQuestion.length !=0 && <Resources total={selectedFormField.elemQuestion.length} setSynContext={setSynContext} setSemContext={setSemContext}  questions={ chunkArrayInThrees(selectedFormField.elemQuestion)} chatQuestion={chatQuestion} setChatQuestion={setChatQuestion} setCurrentKnowledgeBase={setCurrentKnowledgeBase}/>}
{/*selectedFormField !== null && selectedFormField.elemQuestion.length == 0 &&<div>
<Heading level={2} id="resources" className="mt-20">Frequently Asked Questions</Heading>
<div className="my-16 xl:max-w-none border-t border-zinc-900/5  mt-5" font-family='Inter' >
          <p style={{fontSize:'16px'}} className='text-gray-500'>There are currently no questions about this field in our database. This could be because this field is straightforward  to fill in.</p></div></div>*/}

      {selectedFormField !== null && userChat(chatQuestion,currentKnowledgeBase,setCurrentKnowledgeBase)}

      {selectedFormField !== null && currentSession != 'NONE' && filterBySession(chatLogs, currentSession).length > 0 ? <ChatHistory context={currentKnowledgeBase} field={selectedFormField.title} historyData={filterBySession(chatLogs, currentSession)} /> : null}


    </div>
  
  );
};

export default IndexPage;
