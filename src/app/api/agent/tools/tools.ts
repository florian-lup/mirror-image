import { PineconeAssistant } from './PineconeAssistant';
import { PerplexityAssistant } from './PerplexityAssistant';

export const tools = [
  PineconeAssistant.create(),
  PerplexityAssistant.create()
]; 