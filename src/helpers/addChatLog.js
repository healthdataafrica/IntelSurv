import axios from 'axios';

async function addChatLog( elemID,field,timestamp,session,context,question,answer, maxRetries=5) {
  // Define the API endpoint and request data
  const apiUrl = `https://us-central1-questmap-mubas.cloudfunctions.net/addChatLog`;

  // The data to send with the POST request
  const postData = {
    fieldName: field,   
    timestamp: timestamp,
    session: session,
    context: context,
    question: question,
    answer: answer,
    predefined:0,
    elemID: parseInt(elemID),
      prevQuestion:0   
  };

  // Retry function
  async function retryRequest(retriesLeft) {
    return axios.post(apiUrl, postData)
      .then((response) => {
        // Return the API response data
        console.log(response.data);
        return response.data;

      })
      .catch((error) => {
        if (retriesLeft > 0) {
          console.error('API Error:', error);
          console.log(`Retrying in 30 seconds. Retries left: ${retriesLeft}`);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(retryRequest(retriesLeft - 1));
            }, 30000); // 30 seconds
          });
        } else {
          // No more retries left, throw the error
          throw error;
        }
      });
  }

  // Start the initial request with retries
  return retryRequest(maxRetries);
}

// Assuming you meant to export getChatCompletions instead of fetchFormElements
export { addChatLog };
