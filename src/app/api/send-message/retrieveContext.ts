import { GoogleGenAI } from "@google/genai";
import { MongoClient } from "mongodb";

function generateDesc({
  name = "",
  url = "",
  languages = "",
  tags = "",
  readme = "",
}: {
  name?: string;
  url?: string;
  languages?: string;
  tags?: string;
  readme?: string;
}): string {
  return `# METADATA
  Repository name: ${name}
  Repository URL: ${url}
  Repository languages: ${languages}
  Repository topics: ${tags}
  
  # README:
  ${readme}`;
}

export async function retrieveContext(query: string) {
  console.log("Setup for retrieve context");
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  const database = client.db(process.env.MONGODB_VECTOR_DATABASE);
  const collection = database.collection(
    process.env.MONGODB_VECTOR_COLLECTION!,
  );

  const documents: string[] = [];

  const response = await ai.models.embedContent({
    model: "text-embedding-004",
    contents: query,
    config: {
      taskType: "SEMANTIC_SIMILARITY",
    },
  });

  console.log("Context retrieved");
  const query_embedding = response.embeddings?.[0]?.values;

  const pipeline = [
    {
      $vectorSearch: {
        index: "vector_index",
        queryVector: query_embedding,
        path: "embedding",
        exact: true,
        limit: 3,
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        readme: 1,
        topics: 1,
        languages: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ];

  const cursor = collection.aggregate(pipeline);
  const results = await cursor.toArray();

  console.log("Related documents retrived");
  for (const r of results) {
    documents.push(
      generateDesc({
        name: r.name,
        languages: r.languages ? Object.keys(r.languages).join(", ") : "",
        tags: Array.isArray(r.topics) ? r.topics.join(", ") : (r.topics ?? ""),
        readme: r.readme,
      }),
    );
  }

  return documents;
}
