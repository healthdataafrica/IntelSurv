import React, { useState } from 'react';
import { Button } from "./Button";
import OptionsModal from './OptionsModal';

function QuestionnaireOptions({ options, qOptions, total }) {
    const [optionsIndex, setOptionsIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [foundOption, setFoundOption] = useState({});


    function findOptionByOText(options, oText) {
        // Trim and convert both the search text and the oText value to lower case (or upper case)
        const normalizedSearchText = oText.trim().toLowerCase();
    
        return options.find(option => option.oText.trim().toLowerCase() === normalizedSearchText);
    }

    const handleNext = () => {
        setOptionsIndex(prev => prev + 1);
    };

    const handlePrevious = () => {
        setOptionsIndex(prev => prev - 1);
    };

    const openModal = (text) => {
        if(options !=0 ){
      
       
        const foundOption = findOptionByOText(options, text);
        setFoundOption(foundOption);
        setIsModalOpen(true);
         
        }
    };

    const closeModal = () => {      
     
        setIsModalOpen(false);     
        
    };

    return (
        <>
        <div style={{marginTop:'50px'}} className='' >
        <p style={{fontSize:'16px'}} className='text-gray-500'>There are <strong>{total} options</strong>. You can ask questions about their meaning or use.</p>

            <div style={{marginTop:'15px',color:'#5283A3'}} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {qOptions[optionsIndex].map((option) => (
                    <Button  onClick={() => openModal(option.OText)}
 
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
<OptionsModal option={foundOption}  isOpen={isModalOpen} closeModal={closeModal} />
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
