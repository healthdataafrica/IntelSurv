const functions = require("firebase-functions");
const { PineconeClient } = require("@pinecone-database/pinecone");
const { Configuration, OpenAIApi } = require("openai");

exports.chatCompletion = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET, POST");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
      response.status(200).send();
      return;
    }

    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: "us-west4-gcp-free",
      apiKey: "616b417c-33fc-439f-8780-b52b80cbc3be",
    });

    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const { message } = request.body;
    const { knowledgeBase } = request.body;

    console.log('here is user message', message);

    
      async function extractMetadataValues(data) {
        const metadataValues = [];

        data.matches.forEach((match, index) => {
          metadataValues.push(match.metadata.context);
        });

        return metadataValues;
      }

      async function createEmbedding(input_from_user, openai) {
        try {
          const result = await openai.createEmbedding({
            input: input_from_user,
            model: "text-embedding-ada-002",
          });
          let embedding = result.data.data[0].embedding;

          return embedding;
        } catch (error) {
          console.error("Context retrieval failed. An error occurred:", error);
        }
      }

      async function contextRetrieval(embedding,vectorIndex,namespace,pinecone) {
        try {
          const index = pinecone.Index(vectorIndex);
          const queryRequest = {
            vector: embedding,
            topK: 5,
            includeValues: false,
            includeMetadata: true,

            namespace: namespace,
          };
          const queryResponse = await index.query({ queryRequest });
          console.log("here is context retrieval", queryResponse);
          return queryResponse;
        } catch (error) {
          console.error("Context retrieval failed, An error occurred:", error);
          throw new Error("Context retrieval failed, Internal server error");
        }
      }

      async function startCompletion(message,pinecone) {
        let assistantMessage;
        //const message = 'what is the difference between a confirmed and suspected case of covid 19?';
        const vectorIndexNameSpace = "intelsurv-case-definitions";
        const vectorIndex = "questmap";
        const userInput = `here is the users message:%%%%${message}%%%%`;
        const embedding = await createEmbedding(userInput, openai);
        const contextData = await contextRetrieval(
          embedding,
          vectorIndex,
          vectorIndexNameSpace,
          pinecone
        );
        const processedContext = await extractMetadataValues(contextData);

        try {
          const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-0301",
            temperature: 0,
            messages: [
              {
                role: "system",
                content:
                  "Use the following pieces of context delimeted by %%%% to answer the users question. If you don't know the answer, just say that you don't know, don't try to make up an answer. Use eight sentences maximum. Keep the answer as concise as possible.",
              },
              { role: "system", content: `%%%%${processedContext}%%%%` },
              { role: "user", content: userInput},
            ],
          });

          const response = chatCompletion.data;
          console.log(response.choices[0].message);
          assistantMessage = response.choices[0].message.content;
        } catch (error) {
          console.error("An error occurred with openAI call:", error);
          throw new Error("Internal server error with openAI call");
        }

        return assistantMessage;
      }

      const finalResponse = await startCompletion(message,pinecone);

      response.status(200).json(finalResponse);
   
  }
);
