/**
 * Upsert vector data into the Pinecone index.
 * @param {Array} data - Array of vector data to upsert.
 * @param {Object} pinecone - PineconeClient instance.
 * @returns {Array} An array of upsert results.
 */

async function upsertVectors(data, pinecone) {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  try {
    // Initialize PineconeClient with the appropriate environment and API key
    await pinecone.init({
      environment: "us-west4-gcp-free",
      apiKey: "00c0cf81-1e26-4ee0-85cc-9e1aaf36b7f5",
    });

    let result = [];

    // Create the Pinecone Index object
    const index = pinecone.Index("questmap");

    // Process data in batches of 99 vectors and upsert into Pinecone index
    while (data.length) {
      const batchedVectors = data.splice(0, 99);

      const upsertRequest = {
        vectors: batchedVectors,
        namespace: "intelsurv-case-definitions",
      };

      let retryCount = 0;
      let upsertResponse;
      while (retryCount < 3) {
        // Retry up to 3 times in case of failure
        try {
          console.log("Here is the structure of upsert", upsertRequest);
          upsertResponse = await index.upsert({ upsertRequest });
          break; // Break out of the retry loop if successful
        } catch (error) {
          console.log(error);
          console.log(
            `Upsert failed. Retrying in 30 seconds... (${retryCount + 1}/3)`
          );
          retryCount++;
          await sleep(30000); // Sleep for 30 seconds before retrying
        }
      }

      if (retryCount === 3 && !upsertResponse) {
        console.log("Upsert failed after multiple retries.");
        return;
      }

      result.push(upsertResponse);
    }

    console.log("Upsert result:", result);

    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { upsertVectors };
