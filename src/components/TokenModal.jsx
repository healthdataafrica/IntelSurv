import React, { useState } from "react";
import { fetchTokenRecord } from "@/helpers/fetchTokenRecord";
import store from "../stores/store";
import { toast } from "react-toastify";



function TokenModal({ tokenMessage, isModalOpen, closeModal }) {
    const [token, setToken] = useState('');
    const [isTokenVerified, setIsTokenVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { mainStore } = store;
    const { setOpenTokenModal, setTokenMessageCount, setTokenValidTo, setUserToken } = mainStore();


    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    async function verifyToken() {

        setIsLoading(true);
        const record = await fetchTokenRecord(token);
        if (record != null) {
            setToken("");
            //be7de1591f400989c38539c61ef22c12cd48527fd6e2aedf25101c4915a6acbf
            localStorage.setItem('userToken', record.tokenString);
            setUserToken(record.tokenString);
            setTokenMessageCount(record.noQueries);
            setTokenValidTo(record.validTo);
            closeModal();
            toast.success("Token Successfully Authorized", {
                position: toast.POSITION.TOP_CENTER
            });
            setOpenTokenModal(false);
        } else {
            setToken("");
            toast.error("Sorry your access token is invalid", {
                position: toast.POSITION.TOP_CENTER
            });

        }

        setIsLoading(false);

    };


    if (!isModalOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {!isTokenVerified ? (
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        {tokenMessage === 'NO-TOKEN' && (
                            <div className="bg-white px-4 pt-0 pb-0 sm:p-6 sm:pb-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>    <img src="./warning.png" width="10%" />
                                </div>

                                <h1 className=" text-gray-900 text-center">No access token found</h1>
                                <h5 className="text-gray-900 text-center pb-4">Please enter your token below to authorize</h5>
                                <input
                                    type="text"
                                    value={token}
                                    onChange={handleTokenChange}
                                    className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                                    placeholder="Enter access token here" // Added placeholder
                                />
                                <button onClick={verifyToken} disabled={isLoading} className="mt-4 bg-blue-600 text-white p-2 rounded-md w-full">
                                    {isLoading ? 'Verifying...' : 'Verify Token'}
                                </button>
                                {isLoading && <div className="loader"></div>}
                                <button onClick={closeModal} className="mt-2 text-blue-600 hover:text-blue-700 text-sm text-center w-full">
                                    Cancel
                                </button>
                            </div>
                        )}

{tokenMessage === 'TOKENS-FINISHED' && (
                            <div className="bg-white px-4 pt-0 pb-0 sm:p-6 sm:pb-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>    <img src="./warning.png" width="10%" />
                                </div>

                                <h1 className=" text-gray-900 text-center">You have zero tokens left</h1>
                                <h5 className="text-gray-900 text-center pb-4">Please enter a new token below to authorize or ask for an increment</h5>
                                <input
                                    type="text"
                                    value={token}
                                    onChange={handleTokenChange}
                                    className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                                    placeholder="Enter access token here" // Added placeholder
                                />
                                <button onClick={verifyToken} disabled={isLoading} className="mt-4 bg-blue-600 text-white p-2 rounded-md w-full">
                                    {isLoading ? 'Verifying...' : 'Verify Token'}
                                </button>
                                {isLoading && <div className="loader"></div>}
                                <button onClick={closeModal} className="mt-2 text-blue-600 hover:text-blue-700 text-sm text-center w-full">
                                    Cancel
                                </button>
                            </div>
                        )}


                    </div>
                ) : (
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
                                    {option.commDefinition.length !== 0 ? (
                                        <>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                Community Definition
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {option.commDefinition}
                                            </p>
                                        </>
                                    ) : <></>}
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
                )}
            </div>
        </div>
    );
}

export { TokenModal };
