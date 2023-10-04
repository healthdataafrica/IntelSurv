import React, { useState } from "react";
import { Button } from "@/components/Button";
import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon";
import QuestionnaireOptions from "@/components/QuestionnaireOptions";
import { Heading } from "@/components/Heading";
import { HeroPattern } from "@/components/HeroPattern";
import { Resources } from "@/components/Resources";
import store from "../stores/store";
import { ChatWindow } from "@/components/chatWindow";

const IndexPage = () => {
  const { mainStore } = store;
  const { setSelectedFormField, selectedFormField } = mainStore();

  const idsrQListing = { selectedFormField };

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

  const userChat = () => (
    <div className="my-16 xl:max-w-none">
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Heading level={2} id="resources">Ask your Own Question</Heading>
      </div>

      <div>
        <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3"></div>

        <div className='mb-10' style={{ fontSize: '18px' }}>
          Welcome to the <a href="#">IntelSurv</a> assistant, ask and receive answers
        </div>

        <ChatWindow />
      </div>
    </div>
  );

  return (
    <div>
      <HeroPattern />
      {selectedFormField === null ? (
        <div>
          <h1>Getting Started</h1>
          <span style={{ fontSize: '20px', lineHeight: '30px' }}>
            Welcome to <a href="#">IntelSurv</a>. To get started, select a form field from the list to your left.
            To filter and search for your preferred field, simply input your search query in the panel above.
            The fields are numbered in the order they appear on the form.
          </span>
        </div>
      ) : (
        <div style={{ fontSize: '18px', lineHeight: '35px' }}>
          {selectedFormField.href && selectedFormField.title && (
            <h1>{selectedFormField.href}. {selectedFormField.title}</h1>
          )}

          {selectedFormField.elemDescr && (
            <><strong>Description:</strong> {selectedFormField.elemDescr}<br /></>
          )}

          {selectedFormField.idsrQListing && selectedFormField.idsrQListing.title && (
            <><strong>Form:</strong> {selectedFormField.idsrQListing.title}<br /></>
          )}

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

          {selectedFormField.idsrQListing && selectedFormField.idsrQListing.linkToForm && (
            <a target="_blank" rel="noopener noreferrer" href={selectedFormField.idsrQListing.linkToForm}>
              <strong>Link to Form</strong>
            </a>
          )}

          {selectedFormField.idsrQListing && <QuestionnaireOptions idsrQListing={idsrQListing} />}
        </div>
      )}
      {selectedFormField !== null && <Resources />}
      {selectedFormField !== null && userChat()}
      {selectedFormField !== null && <chatWindow/>}
    </div>
  );
};

export default IndexPage;
