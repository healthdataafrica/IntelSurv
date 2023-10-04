const functions = require("firebase-functions");
const { PrismaClient } = require("@prisma/client");
const { Configuration, OpenAIApi } = require("openai");
const { createVectorEmbeddings } = require("./createVectorEmbeddings");
const { embeddingsApi } = require("./embeddingsApi");
const { upsertVectors } = require("./upsertVectors");
const { PineconeClient } = require("@pinecone-database/pinecone");

// Initialize Prisma client
const prisma = new PrismaClient();

// Initialize OpenAI configuration
const openaiConfiguration = new Configuration({
  apiKey: "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",
});

// Initialize OpenAI client
const openai = new OpenAIApi(openaiConfiguration);

// Initialize Pinecone client
const pinecone = new PineconeClient();


const caseDefinitions = [
{id:'1', searchContent:`

Covid 19/SARS-CoV-2 Suspected Case
A person who meets the clinical OR epidemiological criteria
Clinical criteria includes:acute onset of fever AND cough (ILI) or acute onset of ANY THREE OR MORE of the following signs or
symptoms: fever, cough, general weakness/fatigue1, headache,myalgia, sore throat, coryza, dyspnoea, nausea/diarrhoea/anorexia
Epidemiological criteria includes : contact of a probable or confirmed case, or linked to a COVID-19 cluster. A patient with severe acute respiratory illness
(SARI: acute respiratory infection with history of fever or measured fever of
≥38 °C; and cough; with onset within the last 10 days; and requires hospitalization)

A patient with severe acute respiratory illness
(SARI: acute respiratory infection with history of fever or measured fever of
≥38 °C; and cough; with onset within the last 10 days; and requires
hospitalization)

A person with no clinical signs or symptoms OR meeting epidemiologic criteria with a positive professional-use or self-test SARS-CoV-2 Antigen-RDT.

Exposure Criteria (within 14 days before onset of symptoms):
Traveled to or transited more than 24 hours in high-risk countries* with SARS-CoV-2 community transmission.
Close contact with a confirmed COVID-19 case.
Visited a healthcare facility reporting COVID-19 cases.
`
,context:`

[Category: Covid 19/SARS-CoV-2 Suspected Case]

[Clinical Criteria]
A person who:
- Has an acute onset of fever AND cough (ILI), OR
- Has an acute onset of ANY THREE OR MORE of the following signs or symptoms:
  * Fever
  * Cough
  * General weakness/fatigue
  * Headache
  * Myalgia
  * Sore throat
  * Coryza
  * Dyspnoea
  * Nausea/diarrhoea/anorexia

[Epidemiological Criteria]
A person who:
- Has had contact with a probable or confirmed case, OR
- Is linked to a COVID-19 cluster, OR
- Is a patient with severe acute respiratory illness (SARI):
  * Acute respiratory infection with history of fever or measured fever of ≥38 °C
  * Cough, with onset within the last 10 days
  * Requires hospitalization

[Option A: Suspected Case Definition]
A person who meets either the clinical or epidemiological criteria described above.

[Option B: SARI Definition]
A patient with severe acute respiratory illness (SARI):
- Acute respiratory infection with history of fever or measured fever of ≥38 °C
- Cough, with onset within the last 10 days
- Requires hospitalization

[Option C: Positive Antigen-RDT Case]
A person with:
- No clinical signs or symptoms, OR
- Meeting the epidemiological criteria 
AND has a positive professional-use or self-test SARS-CoV-2 Antigen-RDT.

[Exposure Criteria]
Within 14 days before onset of symptoms, the person:
- Traveled to or transited for more than 24 hours in high-risk countries with SARS-CoV-2 community transmission, OR
- Had close contact with a confirmed COVID-19 case, OR
- Visited a healthcare facility reporting COVID-19 cases.
`},

{id:'2', searchContent:`
Covid 19/SARS-CoV-2 Probable Case

A patient who meets clinical criteria AND is a contact of a probable or
confirmed case, or linked to a COVID-19 cluster

Death, not otherwise explained, in an adult with respiratory distress preceding
death AND who was a contact of a probable or confirmed case or linked to a
COVID-19 cluster

`, context:`

[Category: Covid 19/SARS-CoV-2 Probable Case]

[Option A: Clinical and Epidemiological Criteria]
A patient who:
- Meets clinical criteria
- Is a contact of a probable or confirmed case, OR
- Is linked to a COVID-19 cluster.

[Option B: Unexplained Death with Prior Respiratory Distress]
An adult who:
- Had respiratory distress preceding death,
- Death was not otherwise explained, AND
- Was a contact of a probable or confirmed case, OR
- Was linked to a COVID-19 cluster.


`},

{id:'3',searchContent:`
Covid 19/SARS-CoV-2 Confirmed Case
A person with a positive Nucleic Acid Amplification Test (NAAT), regardless of clinical criteria OR epidemiological criteria
A person meeting clinical criteria AND/OR epidemiological criteria ( suspect case A) with a positive professional-use or self- test SARS-CoV-2 Antigen-RDT.

`,context:`

[Category: Covid 19/SARS-CoV-2 Confirmed Case]

[Option A: Positive Nucleic Acid Amplification Test]
A person who:
- Has a positive Nucleic Acid Amplification Test (NAAT), 
- Regardless of meeting clinical or epidemiological criteria.

[Option B: Positive Antigen-RDT with Clinical or Epidemiological Criteria]
A person who:
- Meets clinical criteria AND/OR epidemiological criteria (as defined in suspect case A),
- Has a positive professional-use or self-test SARS-CoV-2 Antigen-RDT.

`}






];

// Function to start vectorization
async function startVectorization() {

  // Create vector embeddings
  const vectorArray = await createVectorEmbeddings(
    caseDefinitions,
    openai,
    embeddingsApi
  );

  // Upsert vectors to Pinecone
  const vectorResults = await upsertVectors(vectorArray, pinecone);
  console.log("Here is the result vector", vectorResults);
}

// Call the startVectorization function to initiate the process
startVectorization();
