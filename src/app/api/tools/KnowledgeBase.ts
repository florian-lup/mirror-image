import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { Index } from "@upstash/vector";
import { ToolResponse, ToolInput, VectorSearchResult, VectorSearchConfig } from "@/types/tools";

// Accept either a string or an object with a query property
const KnowledgeBaseSchema = z.union([
  z.string().describe('The query to send to the knowledge base'),
  z.object({
    query: z.string().describe('The query to send to the knowledge base')
  })
]) satisfies z.ZodType<ToolInput>;

/**
 * Tool for querying the knowledge base to get information from indexed documents
 */
export class KnowledgeBase {
  static create() {
    return new DynamicStructuredTool({
      name: 'knowledge_base',
      description: 'Query your knowledge base to get relevant information from your documents. Only use this for querying existing document content.',
      schema: KnowledgeBaseSchema,
      func: async (input): Promise<string> => {
        try {
          // Parse and validate the input
          const parsedInput = KnowledgeBaseSchema.parse(input);
          // Extract query from either string or object input
          const query = typeof parsedInput === 'string' ? parsedInput : parsedInput.query;

          if (!process.env.UPSTASH_VECTOR_REST_URL || !process.env.UPSTASH_VECTOR_REST_TOKEN) {
            const errorResponse: ToolResponse = {
              success: false,
              message: 'Knowledge base credentials not configured',
              response: 'Error: Knowledge base credentials not configured'
            };
            return JSON.stringify(errorResponse);
          }

          // Initialize index
          const index = new Index({
            url: process.env.UPSTASH_VECTOR_REST_URL,
            token: process.env.UPSTASH_VECTOR_REST_TOKEN,
          });

          // Query the vector store using the text directly
          const searchConfig: VectorSearchConfig = {
            data: query,
            topK: 5,
            includeMetadata: false,
            includeVectors: false,
            includeData: true,
          };

          const results = await index.query(searchConfig) as VectorSearchResult[];
          
          // Filter and format results
          const relevantResults = results.filter(result => {
            const hasScore = result.score >= 0.7;
            const hasData = Boolean(result.data);
            return hasScore && hasData;
          });
          
          if (relevantResults.length === 0) {
            const emptyResponse: ToolResponse = {
              success: false,
              message: 'No relevant information found',
              response: 'I could not find any relevant information about that in my knowledge base.'
            };
            return JSON.stringify(emptyResponse);
          }

          // Combine all relevant content into one answer
          const combinedContent = relevantResults
            .map(result => result.data || '')
            .filter(Boolean)
            .join('\n\n');

          if (!combinedContent.trim()) {
            const noContentResponse: ToolResponse = {
              success: false,
              message: 'No content found in results',
              response: 'I found some matches but they did not contain any readable content.'
            };
            return JSON.stringify(noContentResponse);
          }

          const successResponse: ToolResponse = {
            success: true,
            message: 'Successfully retrieved information',
            response: combinedContent
          };
          return JSON.stringify(successResponse);
          
        } catch (error: unknown) {
          const errorResponse: ToolResponse = {
            success: false,
            message: error instanceof Error 
              ? `Error querying knowledge base: ${error.message}`
              : 'Unknown error occurred while querying knowledge base',
            response: 'Sorry, I encountered an error while searching the knowledge base.'
          };
          return JSON.stringify(errorResponse);
        }
      }
    });
  }
} 