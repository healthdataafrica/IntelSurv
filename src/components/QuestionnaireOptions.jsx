// import React from "react";
// import { Button } from "./Button";

// function QuestionnaireOptions({ idsrQListing }) {
//     const qOptions = idsrQListing?.selectedFormField?.qOptions || [];

//     return (
//         <div>
//             <div className="prose mb-16 mt-6 flex gap-3">
//                 {qOptions.map((option) => (
//                     <Button key={option.oID} href="/sdks" variant="outline">
//                         {option.OText}
//                     </Button>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default QuestionnaireOptions;


import { useRef,useState,useEffect } from 'react'
import { Button } from "./Button";

function handleNext(optionsIndex,setOptionsIndex) {
    const nextValue = optionsIndex +  1; 
   setOptionsIndex(nextValue);
 }
 function handlePrevious(optionsIndex,setOptionsIndex) {
   const nextValue = optionsIndex -  1; 
  setOptionsIndex(nextValue);
 }


function QuestionnaireOptions({ qOptions,total }) {
    const [optionsIndex, setOptionsIndex] = useState(0);

   



    return (
        <>
        <div style={{marginTop:'50px'}} className='' >
        <p style={{fontSize:'16px'}} className='text-gray-500'>There are <strong>{total} options</strong>. You can ask questions about their meaning or use.</p>

            <div style={{marginTop:'15px',color:'#5283A3'}} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {qOptions[optionsIndex].map((option) => (
                    <Button
                        key={option.oID}
                      
                        variant="outline"
                        className="p-4 text-center text-xs"
                    >
                       <span style={{color:'#0F41A6'}}> {option.OText}</span>
                    </Button>
                ))}
            </div>
        </div>

        <div style={{marginTop:'40px' ,fontSize:'13px'}}> 
        {qOptions[optionsIndex - 1] !=null && <button style={{marginRight:'10px'}}
    className="bg-white border border-gray-200 px-3 py-0 " 
    onClick={() => handlePrevious(optionsIndex, setOptionsIndex)}
>
    PREVIOUS OPTIONS
</button>}
       {qOptions[optionsIndex + 1]  !=null && <button 
    className="bg-white border border-gray-200 px-3 py-0 " 
    onClick={() => handleNext(optionsIndex, setOptionsIndex)}
>
    NEXT OPTIONS
</button>}
</div>
        </>
    );
}

export default QuestionnaireOptions;


// import React, { useState } from "react";
// import { Button } from "./Button";

// function QuestionnaireOptions({ idsrQListing }) {
//     const qOptions = idsrQListing?.selectedFormField?.qOptions || [];
//     const [showAllOptions, setShowAllOptions] = useState(false);

//     const visibleOptions = showAllOptions ? qOptions : qOptions.slice(0, 3);

//     return (
//         <div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                 {visibleOptions.map((option) => (
//                     <Button
//                         key={option.oID}
//                         href="/sdks"
//                         variant="outline"
//                         className="p-4 text-center text-sm"
//                     >
//                         {option.OText}
//                     </Button>
//                 ))}
//             </div>
//             {!showAllOptions && qOptions.length > 3 && (
//                 <Button
//                     onClick={() => setShowAllOptions(true)}
//                     variant="outline"
//                     className="mt-4 mx-auto"
//                 >
//                     See More
//                 </Button>
//             )}
//         </div>
//     );
// }

// export default QuestionnaireOptions;
