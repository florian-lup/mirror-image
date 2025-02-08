import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

// Accept either a string or an object with a query property
const PerplexitySchema = z.union([
  z.string().describe('The question or query to send to Perplexity AI'),
  z.object({
    query: z.string().describe('The question or query to send to Perplexity AI')
  })
]);

interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface Citation {
  url?: string;
  text?: string;
  title?: string;
  [key: string]: string | undefined;
}

/**
 * Tool for interacting with Perplexity AI to get real-time information and answers
 */
export class PerplexityAssistant {
  static create() {
    console.log('🔧 Initializing Perplexity Assistant Tool');
    
    return new DynamicStructuredTool({
      name: 'perplexity_assistant',
      description: 'Use Perplexity AI to get real-time information and answers about current events, facts, or any general knowledge questions.',
      schema: PerplexitySchema,
      func: async (input) => {
        // Parse and validate the input
        const parsedInput = PerplexitySchema.parse(input);
        // Extract query from either string or object input
        const query = typeof parsedInput === 'string' ? parsedInput : parsedInput.query;
        
        console.log('\n🧠 Perplexity Assistant Tool - Starting request');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📝 Query: "${query}"`);

        if (!process.env.PERPLEXITY_API_KEY) {
          console.error('❌ Missing Perplexity API key');
          throw new Error('Perplexity API key not configured');
        }

        try {
          console.log('🎯 Building request configuration');
          const messages: PerplexityMessage[] = [
            {
              role: 'system',
              content: 'You are a helpful AI assistant that provides accurate, up-to-date information. Always be concise and factual.'
            },
            {
              role: 'user',
              content: query
            }
          ];
          console.log('📨 Messages prepared:', JSON.stringify(messages, null, 2));

          console.log('⚙️ Configuring API parameters');
          const requestBody = {
            model: 'sonar-reasoning',
            messages,
            max_tokens: 1024,
            temperature: 0.7,
            return_related_questions: true,
            search_recency_filter: 'day'
          };
          
          console.log('📦 Request configuration:');
          console.log('  - Model:', requestBody.model);
          console.log('  - Max Tokens:', requestBody.max_tokens);
          console.log('  - Temperature:', requestBody.temperature);
          console.log('  - Search Recency:', requestBody.search_recency_filter);

          console.log('\n🚀 Sending request to Perplexity API...');
          const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Perplexity API Error');
            console.error(`Status: ${response.status} - ${response.statusText}`);
            console.error('Error details:', errorText);
            throw new Error(`Perplexity API error: ${response.statusText}`);
          }

          const data = await response.json();
          console.log('\n📥 Response received');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          
          if (data.usage) {
            console.log('📊 Token Usage:');
            console.log(`  - Prompt tokens: ${data.usage.prompt_tokens}`);
            console.log(`  - Completion tokens: ${data.usage.completion_tokens}`);
            console.log(`  - Total tokens: ${data.usage.total_tokens}`);
          }

          if (data.citations?.length > 0) {
            console.log('\n📚 Citations found:', data.citations.length);
            data.citations.forEach((citation: Citation, index: number) => {
              console.log(`  ${index + 1}. ${citation.url || 'No URL provided'}`);
            });
          }

          if (data.related_questions?.length > 0) {
            console.log('\n❓ Related questions:');
            data.related_questions.forEach((question: string, index: number) => {
              console.log(`  ${index + 1}. ${question}`);
            });
          }
          
          const result = {
            success: true,
            message: 'Successfully received response from Perplexity',
            answer: data.choices[0]?.message?.content || '',
            citations: data.citations || [],
            related_questions: data.related_questions || [],
            usage: data.usage
          };
          
          console.log('\n✅ Request completed successfully');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          return JSON.stringify(result);
        } catch (error: unknown) {
          console.error('\n❌ Error occurred');
          console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error('Error details:', errorMessage);
          if (error instanceof Error && error.stack) {
            console.error('Stack trace:', error.stack);
          }
          
          const errorResult = {
            success: false,
            message: `Error querying Perplexity: ${errorMessage}`,
            data: null
          };
          
          return JSON.stringify(errorResult);
        }
      }
    });
  }
} 