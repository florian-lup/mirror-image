import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

const PineconeSchema = z.object({
  query: z.string().describe('The message to send to the Pinecone Assistant to search through your documents')
});

type PineconeInput = z.infer<typeof PineconeSchema>;

/**
 * Tool for interacting with Pinecone Assistant to get information from indexed documents
 */
export class PineconeAssistant {
  static create() {
    return new DynamicStructuredTool({
      name: 'pinecone_assistant',
      description: 'Chat with your Pinecone Assistant to get answers based on your uploaded documents. Only use this for querying existing document content, not for hypothetical or future events.',
      schema: PineconeSchema,
      func: async ({ query }: PineconeInput) => {
        console.log('🤖 Pinecone Assistant Tool - Starting chat request');
        console.log(`📤 Query: "${query}"`);

        if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_ASSISTANT_ID) {
          console.error('❌ Missing required environment variables');
          throw new Error('Pinecone credentials or Assistant ID not configured');
        }

        try {
          console.log(`🔄 Sending request to Pinecone Assistant (ID: ${process.env.PINECONE_ASSISTANT_ID})`);
          
          const requestBody = {
            assistant_id: process.env.PINECONE_ASSISTANT_ID,
            messages: [
              {
                role: "user",
                content: query
              }
            ]
          };
          
          console.log('📦 Request payload:', JSON.stringify(requestBody, null, 2));

          const response = await fetch('https://api.pinecone.io/v1/assistants/chat', {
            method: 'POST',
            headers: {
              'Api-Key': process.env.PINECONE_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ Pinecone API Error (${response.status}):`, errorText);
            throw new Error(`Pinecone Assistant API error: ${response.statusText}`);
          }

          const data = await response.json();
          console.log('📥 Received response:', JSON.stringify(data, null, 2));
          
          const result = {
            success: true,
            message: 'Successfully received response from Pinecone Assistant',
            data: data
          };
          
          console.log('✅ Request completed successfully');
          return JSON.stringify(result);
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error('❌ Error:', errorMessage);
          
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