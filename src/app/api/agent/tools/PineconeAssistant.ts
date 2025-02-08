import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

// Accept either a string or an object with a query property
const PineconeSchema = z.union([
  z.string().describe('The message to send to the Pinecone Assistant'),
  z.object({
    query: z.string().describe('The message to send to the Pinecone Assistant')
  })
]);

/**
 * Tool for interacting with Pinecone Assistant to get information from indexed documents
 */
export class PineconeAssistant {
  static create() {
    return new DynamicStructuredTool({
      name: 'pinecone_assistant',
      description: 'Chat with your Pinecone Assistant to get answers based on your uploaded documents. Only use this for querying existing document content, not for hypothetical or future events.',
      schema: PineconeSchema,
      func: async (input) => {
        // Parse and validate the input
        const parsedInput = PineconeSchema.parse(input);
        // Extract query from either string or object input
        const query = typeof parsedInput === 'string' ? parsedInput : parsedInput.query;

        if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_ASSISTANT_ID) {
          throw new Error('Pinecone credentials or Assistant ID not configured');
        }

        try {
          const requestBody = {
            assistant_id: process.env.PINECONE_ASSISTANT_ID,
            messages: [
              {
                role: "user",
                content: query
              }
            ]
          };

          const response = await fetch('https://api.pinecone.io/v1/assistants/chat', {
            method: 'POST',
            headers: {
              'Api-Key': process.env.PINECONE_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            throw new Error(`Pinecone Assistant API error: ${response.statusText}`);
          }

          const data = await response.json();
          
          const result = {
            success: true,
            message: 'Successfully received response from Pinecone Assistant',
            data: data
          };
          
          return JSON.stringify(result);
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          
          const errorResult = {
            success: false,
            message: `Error chatting with Pinecone Assistant: ${errorMessage}`,
            data: null
          };
          
          return JSON.stringify(errorResult);
        }
      }
    });
  }
} 