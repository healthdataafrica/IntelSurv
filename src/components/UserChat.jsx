import React from "react";
import {Heading} from "./Heading"; // Import the Heading component
import {ChooseKnowledgeBase} from "./ChooseKnowledgeBase"; // Import the ChooseKnowledgeBase component
import {ChatWindow} from "./ChatWindow"; // Import the ChatWindow component

function UserChat ({
  autoId,
  chatQuestion,
  currentKnowledgeBase,
  setCurrentKnowledgeBase,
  setSynContext,
  setSemContext,
  askYourOwnQuestion,
  semContext,
  synContext,
  selectedFormField,
}) {
  return (
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
          autoId={autoId}
          askYourOwnQuestion={askYourOwnQuestion}
          chatQuestion={chatQuestion}
          currentKnowledgeBase={currentKnowledgeBase}
          synContext={synContext}
          semContext={semContext}
        />
      </div>
    </div>
  );
}

export {UserChat};

