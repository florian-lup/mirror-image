import { DynamicStructuredTool } from '@langchain/core/tools';

export const search = new DynamicStructuredTool({
  name: 'search',
  description: 'Search for information on the internet',
  schema: {
    type: "object",
    properties: {
      input: {
        type: "string",
        description: "The search query",
      },
    },
    required: ["input"],
  },
  func: async ({ input }) => {
    // This is a mock implementation. In a real application, you would integrate with a search API
    return `Mock search results for: ${input}`;
  },
});

export const calculator = new DynamicStructuredTool({
  name: 'calculator',
  description: 'Perform mathematical calculations',
  schema: {
    type: "object",
    properties: {
      input: {
        type: "string",
        description: "The mathematical expression to evaluate",
      },
    },
    required: ["input"],
  },
  func: async ({ input }) => {
    try {
      // WARNING: In a production environment, you should use a safer evaluation method
      const result = eval(input);
      return `Result: ${result}`;
    } catch (error) {
      return `Error calculating: ${error}`;
    }
  },
});

export const tools = [search, calculator]; 