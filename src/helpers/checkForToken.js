import { fetchTokenRecord } from "./fetchTokenRecord";

async function checkForToken(setTokenMessage,setUserToken,setTokenMessageCount,setTokenValidTo,setOpenTokenModal) {

    let userToken = localStorage.getItem('userToken');

    if (userToken) {
        setUserToken(userToken);
        const record = await fetchTokenRecord(userToken);
        setTokenMessageCount(record.noQueries);
        setTokenValidTo(record.validTo);

        
    } else {

        setOpenTokenModal(true);
        setTokenMessage('NO-TOKEN');





    }
};

export { checkForToken }