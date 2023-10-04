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


import React from "react";
import { Button } from "./Button";

function QuestionnaireOptions({ idsrQListing }) {
    const qOptions = idsrQListing?.selectedFormField?.qOptions || [];

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {qOptions.map((option) => (
                    <Button
                        key={option.oID}
                        href="/sdks"
                        variant="outline"
                        className="p-4 text-center text-xs"
                    >
                        {option.OText}
                    </Button>
                ))}
            </div>
        </div>
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
