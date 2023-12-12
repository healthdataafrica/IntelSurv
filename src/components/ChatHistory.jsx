import { HistoryHeader } from "./HistoryHeader";
import { QuestionItem } from "./QuestionItem";
import { useRef,useState,useEffect } from 'react'


function ChatHistory({ historyData }) {

  const [expandedItems, setExpandedItems] = useState({});
  const [expandAll, setExpandAll] = useState(false);
  const [isHistoryExpanded, setHistoryExpanded] = useState(false);

  const toggleAnswer = (logID) => {
      setExpandedItems(prev => ({ ...prev, [logID]: !prev[logID] }));
  };
  const toggleExpandAll = () => {
    setExpandAll(prevState => !prevState);
};


 

  return (
    <div style={{ padding: '20px' }}>
    <h2 style={{ color: '#333' }}>Your Chat History</h2>
    <div style={{ marginBottom: '20px' }}>
        <HistoryHeader 
            isHistoryExpanded={isHistoryExpanded} toggleExpandAll={toggleExpandAll} expandAll={expandAll}
            toggleHistory={() => setHistoryExpanded(!isHistoryExpanded)}
        />
      
    </div><br/><br/>
          {isHistoryExpanded && historyData.map((data, index) => (

              <QuestionItem
                  key={data.logID}
                  data={data}
                  field={data.fieldName}
                  logID={data.logID}

context={data.context}
session={data.session}
time={data.timestamp}
                  index={index}
                  isExpanded={expandAll || !!expandedItems[data.logID]}

                  toggleAnswer={toggleAnswer}
              />
          ))}
      </div>
  );
}


export {ChatHistory};