import React from "react";
import QuestionnaireOptions from "@/components/QuestionnaireOptions";
import CollapsibleDiv from "@/components/CollapsibleDiv";
import UserChat from "@/components/UserChat";
import Resources from "@/components/Resources";
import {ChatHistory} from "@/components/ChatHistory";
import store from "../stores/store";
import { Heading } from "./Heading"; // Import the Heading component
import { ChooseKnowledgeBase } from "./ChooseKnowledgeBase"; // Import the ChooseKnowledgeBase component
import { ChatWindow } from "./ChatWindow"; // Import the ChatWindow component;

function FormFieldDetails({
  setAskYourOwnQuestion,
  toggle,
  isScreenSmall,
  predefinedAutoId,
  setPredefinedAutoId,
  setSynContext,
  setSemContext,
  chatQuestion,
  setChatQuestion,
  currentKnowledgeBase,
  setCurrentKnowledgeBase,
  askYourOwnQuestion,
  synContext,
  semContext,
}) {
  function chunkArrayInSix(array) {
    let chunks = [];
    for (let i = 0; i < array.length; i += 6) {
      chunks.push(array.slice(i, i + 6));
    }

    return chunks;
  }

  function chunkArrayInThrees(array) {
    // Add an index property to each object
    const indexedArray = array.map((item, index) => ({
      ...item,
      index: index + 1,
    }));

    let chunks = [];
    for (let i = 0; i < indexedArray.length; i += 3) {
      chunks.push(indexedArray.slice(i, i + 3));
    }

    return chunks;
  }

  const filterBySession = (array, sessionId) => {
    return array.filter((item) => item.session === sessionId);
  };
  const { mainStore } = store;
  const {
    setShowHelpPage,
    showHelpPage,
    setSelectedFormField,
    selectedFormField,
    currentSession,
    setCurrentSession,
    chatLogs,
    setChatLogs,
  } = mainStore();

  return (
    <>
      {isScreenSmall && (
        <a
          href="/"
          style={{
            marginBottom: "30px",
            color: "#007bff",
            textDecoration: "none",
            fontSize: "18px",
            display: "block",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ← Go to Homepage
        </a>
      )}
      <div
        style={{
          fontSize: "18px",
          color: "#333",
          marginBottom: "20px",
          borderBottom: "2px solid #eee",
          paddingBottom: "15px",
        }}
      >
        <strong>Selected field:</strong>
        {selectedFormField.href && selectedFormField.title && (
          <span
            style={{ fontWeight: "bold", marginLeft: "5px", color: "#5283A3" }}
          >
            {selectedFormField.title} (Field No {selectedFormField.href})
          </span>
        )}
      </div>
      <div
        style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "25px" }}
      >
        {selectedFormField.idsrQListing.title && (
          <p style={{ marginBottom: "10px" }}>
            <strong>Form: </strong>
            {selectedFormField.idsrQListing.title}
          </p>
        )}

        {selectedFormField.elemDescr && (
          <p style={{ marginBottom: "10px" }}>
            <strong>Description:</strong> {selectedFormField.elemDescr}
          </p>
        )}

        {selectedFormField.rationale !== 0 && (
          <p style={{ marginBottom: "10px" }}>
            <strong>Rationale:</strong> {selectedFormField.rationale}
          </p>
        )}
      </div>
      {selectedFormField.qOptions.length !== 0 && (
        <div
          style={{
            marginBottom: "30px",
            borderTop: "1px dashed #ccc",
            paddingTop: "20px",
          }}
        >
          <QuestionnaireOptions
            qOptions={chunkArrayInSix(selectedFormField.qOptions)}
            total={selectedFormField.qOptions.length}
          />
        </div>
      )}
      {selectedFormField !== null && (
        <CollapsibleDiv
          selectedFormField={selectedFormField}
          isScreenSmall={isScreenSmall}
          toggle={toggle}
          setAskYourOwnQuestion={setAskYourOwnQuestion}
        />
      )}
      {selectedFormField !== null &&
        selectedFormField.elemQuestion.length !== 0 && (
          <Resources
            autoId={predefinedAutoId}
            setAutoId={setPredefinedAutoId}
            total={selectedFormField.elemQuestion.length}
            setSynContext={setSynContext}
            setSemContext={setSemContext}
            questions={chunkArrayInThrees(selectedFormField.elemQuestion)}
            chatQuestion={chatQuestion}
            setChatQuestion={setChatQuestion}
            setCurrentKnowledgeBase={setCurrentKnowledgeBase}
          />
        )}
    {" "}
      <div className="my-16 xl:max-w-none">
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          <Heading level={2} id="resources">
            Ask your Own Question
          </Heading>
        </div>

        <div>
          <div className="not-prose mt-2 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-2 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3"></div>

          <div className="mb-0 text-gray-500" style={{ fontSize: "16px" }}>
            {/* Your introductory text */}
          </div>

          {selectedFormField !== null && (
            <ChooseKnowledgeBase
              currentKnowledgeBase={currentKnowledgeBase}
              setCurrentKnowledgeBase={setCurrentKnowledgeBase}
              setSynContext={setSynContext}
              setSemContext={setSemContext}
            />
          )}

          <ChatWindow
            autoId={predefinedAutoId}
            askYourOwnQuestion={askYourOwnQuestion}
            chatQuestion={chatQuestion}
            currentKnowledgeBase={currentKnowledgeBase}
            synContext={synContext}
            semContext={semContext}
          />
        </div>
      </div>{" "}
      {selectedFormField !== null &&
        currentSession !== "NONE" &&
        filterBySession(chatLogs, currentSession).length > 0 && (
          <div
            style={{
              marginTop: "30px",
              borderTop: "1px solid #ccc",
              paddingTop: "20px",
            }}
          >
            <ChatHistory
              context={currentKnowledgeBase}
              field={selectedFormField.title}
              historyData={filterBySession(chatLogs, currentSession)}
            />
          </div>
        )}
    </>
  );
}

export default FormFieldDetails;
