import React, { useEffect, useState, useRef, useCallback } from "react";
import { getChatCompletions } from "@/helpers/getChatCompletions";
import { animateScroll } from "react-scroll";


export const ChooseKnowledgeBase = ({currentKnowledgeBase, setCurrentKnowledgeBase}) => {

    console.log(currentKnowledgeBase);



    function setKnowledgeBase(base) {

        setCurrentKnowledgeBase(base);     
    }

    const getClassNamesForItem = (base) => {
        const baseClasses = "inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer dark:hover:text-gray-300 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700";
        if (currentKnowledgeBase === base) {
          return `${baseClasses} border-customBlue dark:text-gray-300`;
        }
        return `${baseClasses} border-gray-200 dark:border-gray-700`;
      };
    


  return (
    <>
    <div>
      
      <ul className="grid w-full gap-6 md:grid-cols-3 list-none">
      <li  onClick={() => setKnowledgeBase('CASE')}>
          <button className={getClassNamesForItem('CASE')}>
            <div className="block">
              {/* SVG Here */}
              <div className="w-full text-base font-semibold text-zinc-900">Case Definitions</div>
              <div className="w-full text-sm mt-2 leading-normal" font-family='Inter'>
              A dedicated knowledge base outlining the case definitions of COVID-19 for accurate diagnosis and reporting.
              </div>
            </div>
          </button>
          </li>
          <li  onClick={() => setKnowledgeBase('FORM')}>
          <button className={getClassNamesForItem('FORM')}>
            <div className="block">
              {/* SVG Here */}
              <div className="w-full text-base font-semibold text-zinc-900">Form & Field Definitions</div>
              <div className="w-full text-sm mt-2 leading-normal" font-family='Inter'>
              A definitive knowledge base providing form and field definitions essential for effective disease surveillance.
              </div>
            </div>
          </button>
          </li>
          <li  onClick={() => setKnowledgeBase('GENERAL')}>
          <button className={getClassNamesForItem('GENERAL')}>
            <div className="block">
              {/* SVG Here */}
              <div className="w-full text-base font-semibold text-zinc-900">General</div>
              <div className="w-full text-sm mt-2 leading-normal" font-family='Inter'>
                A comprehensive repository of general health data and definitions for informed understanding.
              </div>
            </div>
          </button>
          </li>
        
       
          
             
      </ul>
      </div>
  </>
  );
};
