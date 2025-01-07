import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getFeedback = async (draft) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: `Provide feedback on the following grant application draft: ${draft}` },
      ],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching feedback from OpenAI:', error);
    throw new Error('Failed to get feedback from AI.');
  }
};
