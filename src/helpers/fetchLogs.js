import store from "../stores/store";


async function fetchLogs(setChatLogs) {

   
        const response = await fetch('https://us-central1-questmap-mubas.cloudfunctions.net/getChatLogs');
        const data = await response.json();
    
        // Filter the logs by a specific session
       // const filteredData = data.filter(log => log.timestamp > 1702967505);
    
        setChatLogs(data);
       
       return data;
    
   
}

 export {fetchLogs};
