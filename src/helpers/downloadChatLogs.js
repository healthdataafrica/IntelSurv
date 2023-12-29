

async function downloadChatLogs(filteredData) {

    const jsonToCSV = (json) => {
        if (json.length === 0) {
          return null;
        }
      
        let columns = Object.keys(json[0]);
      
        // Move 'answer' to the end if it exists
        const answerIndex = columns.indexOf('answer');
        if (answerIndex > -1) {
          columns.splice(answerIndex, 1);
          columns.push('answer');
        }
      
        // Create the CSV header
        const header = columns.map(col => `"${col}"`).join(',');
      
        // Map each object to a CSV row
        const rows = json.map(obj =>
          columns.map(col => {
            // Apply consistent data formatting
            const value = formatData(obj[col]);
            return `"${value}"`; // Enclose each field in quotes
          }).join(',')
        );
      
        return [header, ...rows].join('\r\n');
      };



      
    function formatData(str) {
        if (!str || typeof str !== 'string') return str;
        // Remove HTML tags
        let formattedStr = str.replace(/<\/?[^>]+(>|$)/g, "");
        // Remove newline characters
        formattedStr = formattedStr.replace(/\n/g, "");
        // Escape double quotes
        formattedStr = formattedStr.replace(/"/g, '""');
        return formattedStr;
      }


      // filteredData = data.filter(log => log.session === 'ecfd620e-f25c-42ca-ad23-707fd8c6bf9e');
     // const filteredData = data.filter(log => log.timestamp > 1702967505);

   const csvString = jsonToCSV(filteredData);

    if (csvString) {
        // Create a Blob from the CSV String
        const blob = new Blob([csvString], { type: 'text/csv' });
  
        // Create a link element, use it to download the CSV file and remove it
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'chat-logs.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }







}

export {downloadChatLogs}