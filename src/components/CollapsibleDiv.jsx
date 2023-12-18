import React, { useState } from 'react';

function CollapsibleDiv ({ selectedFormField, isScreenSmall, toggle, setAskYourOwnQuestion }) {
    const [showInstructions, setShowInstructions] = useState(false);
  
    const toggleInstructions = () => {
      setShowInstructions(prevState => !prevState);
    };

  
  
    return (
      <div>
        {selectedFormField.idsrQListing && selectedFormField.idsrQListing.linkToForm && window.matchMedia('(display-mode: standalone)').matches && (
          <a  rel="noopener noreferrer" href={selectedFormField.idsrQListing.linkToForm}>
            <button
              type="button"
              style={{ fontWeight: '400', backgroundColor: "#5283A3", color: 'white', marginTop: '10px', marginRight: '10px', paddingLeft: '8px', paddingRight: '8px', border: '1px solid #5283A3 ', fontSize: '15px' }}
            >
              Link to Form
            </button>
          </a>
        )}

{selectedFormField.idsrQListing && selectedFormField.idsrQListing.linkToForm && !window.matchMedia('(display-mode: standalone)').matches && (
          <a   target="_blank"  rel="noopener noreferrer" href={selectedFormField.idsrQListing.linkToForm}>
            <button
              type="button"
              style={{ fontWeight: '400', backgroundColor: "#5283A3", color: 'white', marginTop: '10px', marginRight: '10px', paddingLeft: '8px', paddingRight: '8px', border: '1px solid #5283A3 ', fontSize: '15px' }}
            >
              Link to Form
            </button>
          </a>
        )}
  
        <button
          type="button"
          style={{ backgroundColor: "#5283A3", color: 'white', marginTop: '10px', marginRight: '10px', paddingLeft: '8px', paddingRight: '8px', border: '1px solid #5283A3', fontSize: '15px' }}
          onClick={toggleInstructions}
        >
          {showInstructions ? "Hide Info" : "More Info"}
        </button>
  
        {isScreenSmall ? (
          <button
            type="button"
            style={{ backgroundColor: "#5283A3", color: 'white', marginTop: '10px', marginRight: '10px', paddingLeft: '8px', paddingRight: '8px', border: '1px solid #5283A3', fontSize: '15px' }}
            onClick={toggle}
          >
            View & Select Fields
          </button>
        ) : null}
  
        <button
          type="button"
          style={{ backgroundColor: "#5283A3", color: 'white', marginTop: '10px', marginRight: '10px', paddingLeft: '8px', paddingRight: '8px', border: '1px solid #5283A3 ', fontSize: '15px' }}
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
  
  export default CollapsibleDiv;