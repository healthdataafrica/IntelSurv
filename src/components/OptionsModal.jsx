import React from "react";

function OptionsModal({ option, isOpen, closeModal }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay, optional: */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-0 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Definition
                                </h3>
                              
                                    <p className="text-sm text-gray-500">
                                        {option.definition}
                                    </p>


                                    {option.commDefinition.length!=0 ? <>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                   Community Definition
                                </h3>
                              
                                    <p className="text-sm text-gray-500">
                                        {option.commDefinition}
                                    </p>
                                    
                                    </>:<></>
                                      }
                               
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:justify-between sm:items-center">
    <span><b>Option Name: </b>{option.oText}</span>
    <button type="button" className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm" onClick={closeModal}>
        Close
    </button>
    {/* Additional buttons can be added here */}
</div>

                </div>
            </div>
        </div>
    );
}

export {OptionsModal};
