interface Message {
  isUser: boolean;
  content: string;
}

export const chatWithGemini = async (
  message: string,
  conversationHistory: Message[],
  language: string = 'english'
) => {
  try {
    const response = await fetch('https://csvzsqwsknusmztdtppb.functions.supabase.co/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory,
        language
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in chatWithGemini:', error);
    throw error;
  }
};