import React, { useEffect, useState, useRef, useCallback } from "react";
import { getChatCompletions } from "@/helpers/getChatCompletions";
import { animateScroll } from "react-scroll";


export const ChooseKnowledgeBase = ({currentKnowledgeBase, setCurrentKnowledgeBase, setSemContext, setSynContext}) => {

    console.log(currentKnowledgeBase);



    function setKnowledgeBase(base) {

        setCurrentKnowledgeBase(base);     
        setSemContext('');
        setSynContext('');
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

    
<ul class="  list-none items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
        <input
  id="horizontal-list-radio-license"
  type="radio"
  name="list-radio"
  value="CASE"
  checked={currentKnowledgeBase === 'CASE'} // This should be a boolean expression
  onChange={() => setKnowledgeBase('CASE')} // Typically you use onChange for radio buttons in React
  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
/>
            <label for="horizontal-list-radio-license" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Case Definitions </label>
        </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
            <input id="horizontal-list-radio-id"  checked={currentKnowledgeBase === 'FORM'}  onClick={() => setKnowledgeBase('FORM')} type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="horizontal-list-radio-id" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Form & Field Definitions</label>
        </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
            <input id="horizontal-list-radio-millitary" checked={currentKnowledgeBase === 'GENERAL'}  onClick={() => setKnowledgeBase('GENERAL')} type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="horizontal-list-radio-millitary" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">General</label>
        </div>
    </li>
   
</ul>

   {/* <div>
      
      <ul className="grid w-full gap-6 md:grid-cols-3 list-none">
      <li  onClick={() => setKnowledgeBase('CASE')}>
          <button className={getClassNamesForItem('CASE')}>
            <div className="block">
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
               <div className="w-full text-base font-semibold text-zinc-900">General</div>
              <div className="w-full text-sm mt-2 leading-normal" font-family='Inter'>
                A comprehensive repository of general health data and definitions for informed understanding.
              </div>
            </div>
          </button>
          </li>
        
       
          
             
      </ul>
      </div>*/}
  </>
  );
};
