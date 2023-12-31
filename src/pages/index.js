import { useRef, useState, useEffect } from 'react'
import { Button } from "@/components/Button";
import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon";
import QuestionnaireOptions from "@/components/QuestionnaireOptions";
import { Heading } from "@/components/Heading";
import HeroPattern from "@/components/HeroPattern";
import Resources from "@/components/Resources";
import store from "../stores/store";
import ChatWindow from "@/components/ChatWindow";
import ChooseKnowledgeBase from '@/components/ChooseKnowledgeBase';
import { useMobileNavigationStore } from '@/components/MobileNavigation';
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation';
import ChatHistory from "@/components/ChatHistory";
import HelpSection from '@/components/HelpSection';
import GettingStarted from '@/components/GettingStarted';
import FormFieldDetails from '@/components/FormFieldDetails';
import useWindowSize from '@/helpers/handleResize';
import { PwaInstallPrompt } from '@/components/pwaInstallPrompt';

function IndexPage() {
  const { mainStore } = store;
  const { setShowHelpPage, showHelpPage, setSelectedFormField, selectedFormField, currentSession, setCurrentSession, chatLogs, setChatLogs, appendChatLogs } = mainStore();
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatAnswer, setChatAnswer] = useState('');
  const [askYourOwnQuestion, setAskYourOwnQuestion] = useState(0);
  const [predefinedAutoId, setPredefinedAutoId] = useState(0);
  const [currentKnowledgeBase, setCurrentKnowledgeBase] = useState('CASE');
  const [semContext, setSemContext] = useState('');
  const [synContext, setSynContext] = useState('');
  const [historyData, setHistoryData] = useState([]);
  let { isOpen, toggle, close } = useMobileNavigationStore();
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  const isScreenSmall = useWindowSize();



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


  return (
    <div>

      {/*<PwaInstallPrompt/>*/}
      <HeroPattern />

      {selectedFormField === null ? (

        showHelpPage === null ? (
          <GettingStarted isScreenSmall={isScreenSmall} toggle={toggle} setShowHelpPage={setShowHelpPage} showHelpPage={showHelpPage} />
        ) : (

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