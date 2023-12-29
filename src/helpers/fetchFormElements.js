import axios from 'axios';

async function fetchFormElements(id, maxRetries) {
  // Define the API endpoint and request data
  const apiUrl = `https://us-central1-questmap-mubas.cloudfunctions.net/getIdsrElements?id=${id}`;


  // Retry function
  async function retryRequest(retriesLeft) {
    return axios.get(apiUrl)
      .then((response) => {
        // Return the API response data
        // console.log(response.data);
        
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

export { fetchFormElements };


