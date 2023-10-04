/**
 * Retrieve embeddings for the given input from OpenAI.
 * @param {string} input - The input text to generate embeddings for.
 * @param {Object} openai - OpenAI API instance for creating embeddings.
 * @param {number} maxRetries - Maximum number of retry attempts in case of failure.
 * @returns {Array} An array of embeddings.
 */
async function embeddingsApi(input, openai, maxRetries = 10) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      // Create embeddings for the input text using the OpenAI API
      const result = await openai.createEmbedding({
        input: input,
        model: "text-embedding-ada-002",
      });

      // Extract the embedding from the API response
      const embedding = result.data.data[0].embedding;

      return embedding;
    } catch (error) {
      console.error(
        `Embedding retrieval failed for input "${input}". Retry ${
          retries + 1
        }/${maxRetries}. Error:`,
        error
      );

      // Increment the retry count
      retries++;

      if (retries < maxRetries) {
        console.log(`Retrying in 30 seconds...`);
        await sleep(30000); // Sleep for 30 seconds before retrying
      } else {
        console.error(
          `Max retries (${maxRetries}) reached for input "${input}". Giving up.`
        );
        throw error; // Throw the error after max retries
      }
    }
  }
}

// Sleep function to pause execution for a given number of milliseconds
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports = { embeddingsApi };
