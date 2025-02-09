import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { Index } from "@upstash/vector";

// Accept either a string or an object with a query property
const KnowledgeBaseSchema = z.union([
  z.string().describe('The query to send to the knowledge base'),
  z.object({
    query: z.string().describe('The query to send to the knowledge base')
  })
]);

/**
 * Tool for querying the knowledge base to get information from indexed documents
 */
export class KnowledgeBase {
  static create() {
    return new DynamicStructuredTool({
      name: 'knowledge_base',
      description: 'Query your knowledge base to get relevant information from your documents. Only use this for querying existing document content.',
      schema: KnowledgeBaseSchema,
      func: async (input) => {
        try {
          // Parse and validate the input
          const parsedInput = KnowledgeBaseSchema.parse(input);
          // Extract query from either string or object input
          const query = typeof parsedInput === 'string' ? parsedInput : parsedInput.query;

          if (!process.env.UPSTASH_VECTOR_REST_URL || !process.env.UPSTASH_VECTOR_REST_TOKEN) {
            return JSON.stringify({
              success: false,
              message: 'Knowledge base credentials not configured',
              response: 'Error: Knowledge base credentials not configured'
            });
          }

          // Initialize index
          const index = new Index({
            url: process.env.UPSTASH_VECTOR_REST_URL,
            token: process.env.UPSTASH_VECTOR_REST_TOKEN,
          });

          // Query the vector store using the text directly
          const results = await index.query({
            data: query, // Use the text query directly, Upstash will handle embedding
            topK: 5, // Get top 5 most relevant results
            includeMetadata: false, // We don't need metadata
            includeVectors: false,
            includeData: true, // Include the original text data
          });
          
          // Filter and format results
          const relevantResults = results.filter(result => {
            const hasScore = result.score >= 0.7;
            const hasData = Boolean(result.data);
            return hasScore && hasData;
          });
          
          if (relevantResults.length === 0) {
            return JSON.stringify({
              success: false,
              message: 'No relevant information found',
              response: 'I could not find any relevant information about that in my knowledge base.'
            });
          }

          // Combine all relevant content into one answer
          const combinedContent = relevantResults
            .map(result => result.data || '')
            .filter(Boolean)
            .join('\n\n');

          if (!combinedContent.trim()) {
            return JSON.stringify({
              success: false,
              message: 'No content found in results',
              response: 'I found some matches but they did not contain any readable content.'
            });
          }

          return JSON.stringify({
            success: true,
            message: 'Successfully retrieved information',
            response: combinedContent
          });
          
        } catch (error: unknown) {
          return JSON.stringify({
            success: false,
            message: error instanceof Error 
              ? `Error querying knowledge base: ${error.message}`
              : 'Unknown error occurred while querying knowledge base',
            response: 'Sorry, I encountered an error while searching the knowledge base.'
          });
        }
      }
    });
  }
} 