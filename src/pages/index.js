import { useRef,useState,useEffect } from 'react'
import { Button } from "@/components/Button";
import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon";
import QuestionnaireOptions from "@/components/QuestionnaireOptions";
import { Heading } from "@/components/Heading";
import HeroPattern  from "@/components/HeroPattern";
import  Resources  from "@/components/Resources";
import store from "../stores/store";
import ChatWindow  from "@/components/ChatWindow";
import ChooseKnowledgeBase  from '@/components/ChooseKnowledgeBase';
import { useMobileNavigationStore } from '@/components/MobileNavigation';
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation';
import ChatHistory from  "@/components/ChatHistory";
import HelpSection from '@/components/HelpSection';
import GettingStarted from '@/components/GettingStarted';
import FormFieldDetails from '@/components/FormFieldDetails';

function IndexPage () {
  const { mainStore } = store;
  const {setShowHelpPage, showHelpPage ,setSelectedFormField, selectedFormField, currentSession, setCurrentSession , chatLogs,setChatLogs,appendChatLogs} = mainStore();
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatAnswer, setChatAnswer] = useState('');
  const [askYourOwnQuestion, setAskYourOwnQuestion] = useState(0);
  const [predefinedAutoId, setPredefinedAutoId] =  useState(0);
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



  const PwaInstallPrompt = ({ onInstall, onCancel }) => {
    const [hover, setHover] = useState(false);

    // Define the keyframes animation
    const fadeInSlideDown = {
        '0%': {
            opacity: 0,
            transform: 'translateY(-20px)'
        },
        '100%': {
            opacity: 1,
            transform: 'translateY(0)'
        }
    };

    const styles = {
        promptOverlay: {
            paddingTop: '20px',
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            zIndex: 1000,
            animation: `fadeInSlideDown 1s ease forwards` // Apply the animation
        },
        promptContent: {
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#5283A3',
            borderRadius: '5px',
            textAlign: 'center',
            color: 'white',
        },
        button: {
            margin: '10px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: hover ? '#e3f2fd' : '#fff',
            color: '#5283A3',
            transition: 'background-color 0.3s ease'
        }
    };

    return (
        <div  className="fadeIn" style={styles.promptOverlay}>
            <div style={styles.promptContent}>
                <h2 style={{color:'white'}}>IntelSurv App</h2>
                <p>Do you want to install our Progressive Web App?</p>
                <div>
                    <button style={styles.button} onClick={onInstall}>Install</button>
                    <button style={styles.button} onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

  
  

 
  return ( 
    <div>

{/*<PwaInstallPrompt/>*/}
      <HeroPattern /> 
      
      {selectedFormField === null ? (
      
        showHelpPage === null ? (
  <GettingStarted   isScreenSmall={isScreenSmall} toggle={toggle}  setShowHelpPage={setShowHelpPage} showHelpPage={showHelpPage} />
 ):(

<HelpSection />

  )
)
 : (
  <FormFieldDetails appendChatLogs={appendChatLogs}
  setAskYourOwnQuestion={setAskYourOwnQuestion}
  askYourOwnQuestion={askYourOwnQuestion}
  toggle={toggle}
  isScreenSmall={isScreenSmall}   
  predefinedAutoId={predefinedAutoId}
  setPredefinedAutoId={setPredefinedAutoId}
  setSynContext={setSynContext}
  setSemContext={setSemContext}
  chatQuestion={chatQuestion}
  chatAnswer={chatAnswer}
  setChatAnswer={setChatAnswer}
  setChatQuestion={setChatQuestion}
  currentKnowledgeBase={currentKnowledgeBase}
  setCurrentKnowledgeBase={setCurrentKnowledgeBase}
   synContext={synContext}
  semContext={semContext}
/>
  )}
  

   </div>
   
 
  
  );  
};

export default IndexPage;