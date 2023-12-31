import axios from 'axios';

async function getChatCompletions(message, knowledgeBase,  semContext, synContext,  maxRetries=5) {
    console.log('here is message', message);
  // Define the API endpoint and request data
  const apiUrl = `https://us-central1-questmap-mubas.cloudfunctions.net/intelsurvchatcompletion`;

  // The data to send with the POST request
  const postData = {
    message: message,
    knowledgeBase: knowledgeBase,
    semContext: semContext,
    synContext: synContext
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
export { getChatCompletions };
