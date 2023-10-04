/**
 * Create vector embeddings for a list of data items.
 * @param {Array} data - List of data items to create embeddings for.
 * @param {Object} openai - OpenAI API instance for generating embeddings.
 * @param {Function} embeddingsApi - Function for generating embeddings for an item.
 * @returns {Array} An array of objects representing vector embeddings.
 */
async function createVectorEmbeddings(data, openai, embeddingsApi) {
  let vectorArray = [];

  for (const item of data) {
    try {
      // Generate embeddings for the current data item using the provided embeddingsApi
      const embeddingsResult = await embeddingsApi(item.searchContent, openai);

      // Create a vector object for the current item
      const vector = {
        id: item.id,
        values: embeddingsResult,
        metadata: {
         context:item.context
        },
      };
      
    

      // Log the created vector for debugging purposes
      console.log("Vector:", vector);

      // Add the vector to the result array
      vectorArray.push(vector);
    } catch (error) {
      console.error("Error creating embeddings for item:", item, error);
      // Handle the error here, such as continuing with the next item or taking appropriate action.
      // For example, you can use 'continue' to skip this item and continue with the next one.
      continue;
    }
  }

  return vectorArray;
}

module.exports = { createVectorEmbeddings };
