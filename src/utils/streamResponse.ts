export const streamResponse = async (
  response: Response,
  onChunk: (accumulatedContent: string) => void
): Promise<void> => {
  if (!response.body) {
    throw new Error('No response body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let accumulatedContent = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    accumulatedContent += chunk;

    onChunk(accumulatedContent);
  }
}; 