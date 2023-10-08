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

const IndexPage = () => {
  const { mainStore } = store;
  const { setSelectedFormField, selectedFormField } = mainStore();
  const [chatQuestion, setChatQuestion] = useState('')
  const [currentKnowledgeBase, setCurrentKnowledgeBase] = useState('CASE')



 
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


  const userChat = (chatQuestion,currentKnowledgeBase) => (
    <div className="my-16 xl:max-w-none">
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Heading level={2} id="resources">Ask your Own Question</Heading>
      </div>

      <div>
        <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3"></div>

        <div className='mb-10 text-gray-500' style={{ fontSize: '16px' }}>

        Hello. I am <a href="#">IntelSurv</a>, your AI assistant, How can I assist you today? We are accessing our knowledge base to answer your questions. It also leverages LLMs to complement this knowledge. We currently have two contexts in which IntelSurv functions. A &ldquo;General&rdquo; context which you can use to ask any question, a &ldquo;Case Definition&rdquo; context to ask questions about case definitions for disease as defined by WHO/Countries. To select a context click on the one you would like to use.
        </div>

        <ChatWindow chatQuestion={chatQuestion} currentKnowledgeBase={currentKnowledgeBase} />
      </div>
    </div>
  );

  function CollapsibleDiv({selectedFormField}) {
    const [showInstructions, setShowInstructions] = useState(false);
  
    const toggleInstructions = () => {
      setShowInstructions(prevState => !prevState);
    };
  
    return (
      <div>
        <button
          type="button"
          style={{ backgroundColor: "transparent",   marginTop:'10px' , marginRight: '10px', paddingLeft: '8px',paddingRight:'8px', border: '1px solid #efefef', fontSize:'15px'}}
          onClick={toggleInstructions}
        >
          {showInstructions? "Hide Questionnaire Info" : "More Questionnaire Info"}
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
    <h1>Getting Started</h1>
    <p style={{ fontSize: '20px', lineHeight: '30px', color: '#3C3B40' }}>
      Hello, I am <a href="#">IntelSurv</a>, your AI assistant for disease surveillance data collection. I&rsquo;m currently trained for the Malawi Integrated Disease Surveillance system, but I&rsquo;m continuously learning to support data collection in other countries as well.

      <br /><br />To get started, select a form field from the list to your left. To filter and search for your preferred field, simply input your search query. The fields are numbered in the order they appear on the form.
    </p>
  </div>
)
 : (
        <>

        <div style={{ fontSize: '18px', lineHeight: '35px' }}>
          {selectedFormField.href && selectedFormField.title && (
            <h1>{selectedFormField.href}. {selectedFormField.title}</h1>
          )}
          {selectedFormField.idsrQListing.title && (
            <><strong>Form: </strong>{selectedFormField.idsrQListing.title}<br /></>
          )}



          {selectedFormField.elemDescr && (
            <><strong>Description:</strong> {selectedFormField.elemDescr}<br /></>
          )}

          {selectedFormField.idsrQListing && selectedFormField.idsrQListing.linkToForm && (
            <a target="_blank" rel="noopener noreferrer" href={selectedFormField.idsrQListing.linkToForm}>
              <strong>Link to Form</strong>
            </a>
          )}
          {selectedFormField.title && <CollapsibleDiv selectedFormField={selectedFormField} />}


     <div >
          {selectedFormField.qOptions.length!=0 && <QuestionnaireOptions qOptions={chunkArrayInSix(selectedFormField.qOptions)} total={selectedFormField.qOptions.length} />} </div>
        </div></>
      )}
{selectedFormField !== null && selectedFormField.elemQuestion.length !=0 && <Resources total={selectedFormField.elemQuestion.length}   questions={ chunkArrayInThrees(selectedFormField.elemQuestion)} chatQuestion={chatQuestion} setChatQuestion={setChatQuestion}/>}
{selectedFormField !== null && selectedFormField.elemQuestion.length == 0 &&<div>
<Heading level={2} id="resources" className="mt-20">Frequently Asked Questions</Heading>
<div className="my-16 xl:max-w-none border-t border-zinc-900/5  mt-5" font-family='Inter' >
 <p style={{fontSize:'16px'}} className='text-gray-500'>There are currently no questions about this field in our database. This could be because this field is straightforward  to fill in.</p></div></div>}
      {selectedFormField !== null && userChat(chatQuestion,currentKnowledgeBase)}

      {selectedFormField !== null && <ChooseKnowledgeBase currentKnowledgeBase={currentKnowledgeBase} setCurrentKnowledgeBase={setCurrentKnowledgeBase}  />}

    </div>
  
  );
};

export default IndexPage;
