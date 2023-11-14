import React, { useEffect, useState, useRef, useCallback } from "react";


  
 export const ChatHistory = ({ historyData }) => {
    const [expandedItems, setExpandedItems] = useState({});
    const [isHistoryExpanded, setHistoryExpanded] = useState(false);

    function removeHtmlTags(str) {
        return str.replace(/<[^>]*>/g, '');
      } 
    const HistoryHeader = ({ onClick, isHistoryExpanded }) => (
        isHistoryExpanded 
          ? <h3 style={{ cursor: 'pointer' }} onClick={onClick}>Click to Hide your History</h3> 
          : <h3 style={{ cursor: 'pointer' }} onClick={onClick}>Click to Show your History</h3>
      );
      
      
   

      const QuestionItem = ({ logID, question, answer, toggleAnswer, isExpanded,index }) => (
        <div>
          <p style={{ cursor: 'pointer' }} onClick={() => toggleAnswer(logID)}> Question {index}: {question}</p>
          {isExpanded && <p style={{paddingLeft:'35px'}}>Answer:{removeHtmlTags(answer)}</p>}
        </div>
      );
      
      
    
  const toggleAnswer = (logID) => {
    setExpandedItems(prev => ({ ...prev, [logID]: !prev[logID] }));
  };
    
      return (
        <div>
      <HistoryHeader onClick={() => setHistoryExpanded(!isHistoryExpanded)} isHistoryExpanded={isHistoryExpanded} />
      {isHistoryExpanded && historyData.map(({ logID, question, answer }, index) => (
            <QuestionItem
            index ={index + 1}
              key={logID}
              logID={logID}
              question={question}
              answer={answer}
              isExpanded={!!expandedItems[logID]}
              toggleAnswer={toggleAnswer}
            />
          ))}
        </div>
      );
    };