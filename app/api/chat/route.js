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
    content: `You are a chat bot, you work on the chainfrens website e-learning platform as an ai chatbot which helps in answering student's web3 and other educational questions.`,
   },];
export async function POST(req) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json()
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [...initialMessages, ...messages],
  })
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}