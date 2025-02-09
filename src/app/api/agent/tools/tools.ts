import { KnowledgeBase } from './KnowledgeBase';
import { DeepResearch } from './DeepResearch';

export const tools = [
  KnowledgeBase.create(),
  DeepResearch.create()
]; 