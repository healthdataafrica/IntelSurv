import store from "../stores/store";


function handleUserSession (setCurrentSession) {

    let sessionKey = localStorage.getItem('sessionKey');

    if (sessionKey) {

      setCurrentSession(sessionKey);
      // If session key exists, fetch logs
           } else {
      // If session key does not exist, generate a new one
      sessionKey = uuidv4();
      localStorage.setItem('sessionKey', sessionKey);
      setCurrentSession(sessionKey);

      console.log('New session key generated:', sessionKey);
    }
  };

  export {handleUserSession}