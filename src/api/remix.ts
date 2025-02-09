import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
});

export async function remixContent(text: string, style: string) {
  const prompt = `Please rewrite the following text in a ${style} style while maintaining the core message and meaning:\n\n${text}`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if ('type' in content && content.type === 'text') {
      return content.text;
    }
    throw new Error('Unexpected response format from Claude API');
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error('Failed to remix content');
  }
} 