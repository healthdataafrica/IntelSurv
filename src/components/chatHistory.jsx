import React, { useEffect, useState, useRef, useCallback } from "react";


  
 export const ChatHistory = ({ historyData }) => {
    const [expandedItems, setExpandedItems] = useState({});
    const [isHistoryExpanded, setHistoryExpanded] = useState(false);

    function removeHtmlTags(str) {
        return str.replace(/<[^>]*>/g, '');
      } 
      function TimestampConverter({ time }) {
        // Convert the string Unix timestamp to a number
        const timestamp = parseInt(time);
    
        // Convert it back to a readable date
        const date = new Date(timestamp * 1000);
        const readableDate = date.toString(); // or any other format you prefer
    
        return <>{readableDate}</>;
    }
    
    
    const HistoryHeader = ({ onClick, isHistoryExpanded }) => (
        isHistoryExpanded 
          ?  <button
          type="button"
          style={{  backgroundColor: "#5283A3", color:'white',    marginTop:'10px' , marginRight: '10px', paddingLeft: '8px',paddingRight:'8px', border: '1px solid #5283A3 ', fontSize:'15px'}}
          onClick={() => setHistoryExpanded(!isHistoryExpanded)}


        >
      Click to Hide
        </button>
          :   <button
          type="button"
          style={{  backgroundColor: "#5283A3", color:'white',    marginTop:'10px' , marginRight: '10px', paddingLeft: '8px',paddingRight:'8px', border: '1px solid #5283A3 ', fontSize:'15px'}}
          onClick={() => setHistoryExpanded(!isHistoryExpanded)}

        >
        Click to Show
        </button>
      );
      
      
   

      const QuestionItem = ({field, context,logID, question, answer, toggleAnswer, isExpanded,index,session,time }) => (
        <div>
        <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
    <p style={{ cursor: 'pointer', fontSize: '17px', margin: '0', display: 'flex', alignItems: 'center' }} onClick={() => toggleAnswer(logID)}>
        <span style={{fontWeight: '600'}}>Question {index}</span> 
    </p> : <span  style={{ cursor: 'pointer',paddingLeft:'5px',}} onClick={() => toggleAnswer(logID)}>  {question}</span>
    {isExpanded ? <img 
        style={{marginLeft: '10px', width: "18px", height: "18px"}} 
        src="/arrow-up.png" 
        alt="" 
    />: <img 
    style={{marginLeft: '10px', width: "24px", height: "24px"}} 
    src="/downward-arrow.png" 
    alt="" 
/>}
</span> 



          {isExpanded && <><p style={{paddingLeft:'35px',fontSize:'17px'}}><span style={{fontSize:'14px'}}><strong>SESSION ID : </strong>{session}<br/> <strong>TIME & DATE: </strong>{TimestampConverter({ time })}<br/><strong>FIELD NAME : </strong> {field} <strong><br/>CONTEXT : </strong>{context}</span><br/><br/><span style={{fontWeight:'600' }}>Answer : </span>{removeHtmlTags(answer)}</p>
         

          </>
          
          }
        </div>
        
      );
      
      
    
  const toggleAnswer = (logID) => {
    setExpandedItems(prev => ({ ...prev, [logID]: !prev[logID] }));
  };
    
      return (
        <div>
            <h2>Your Chat History</h2>
      <HistoryHeader isHistoryExpanded={isHistoryExpanded} />
      <br/>  <br/>
      
      {isHistoryExpanded && historyData.map(({ fieldName,logID, question, answer,context,session,timestamp }, index) => (
            <QuestionItem

            field={fieldName}
            index ={index + 1}
            context={context}
            session={session}
            time={timestamp}
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