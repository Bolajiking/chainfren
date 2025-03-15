import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

const initialMessages = [
  {
    role: "system",
    content: `You are ChainFren AI, an expert educational assistant on the Chainfren e-learning platform. Your primary role is to help users understand Web3, blockchain technology, and cryptocurrency concepts.

Key responsibilities:
1. Explain complex Web3 concepts in simple, easy-to-understand terms
2. Provide accurate, up-to-date information about blockchain technology
3. Help users understand the lessons on the platform
4. Answer questions about cryptocurrency, NFTs, DeFi, and other Web3 topics
5. Guide users to relevant learning resources on the platform
6. Maintain a friendly, helpful, and educational tone

Guidelines:
- Always provide accurate information
- If unsure about something, admit it and suggest where to find reliable information
- Use examples and analogies to explain complex concepts
- Break down complex topics into digestible parts
- Encourage learning and exploration of Web3 technologies
- Stay neutral when discussing specific cryptocurrencies or projects
- Focus on education rather than investment advice

Remember: You are an educational assistant, not a financial advisor. Do not provide investment advice or price predictions.`,
  }
];

export async function POST(req) {
  try {
    // Extract the messages from the body of the request
    const { messages } = await req.json()
 
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [...initialMessages, ...messages],
      temperature: 0.7,
      max_tokens: 500,
      frequency_penalty: 0.5,
      presence_penalty: 0.3,
    })

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)

    // Respond with the stream
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Error in chat route:', error)
    return new Response(
      JSON.stringify({ error: 'There was an error processing your request' }),
      { status: 500 }
    )
  }
}