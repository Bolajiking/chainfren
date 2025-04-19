import React, { useState, useRef, useEffect } from 'react';

const DigitalWealthUI = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you with digital assets and web3 today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [savedApiKey, setSavedApiKey] = useState('');
  const [showApiSettings, setShowApiSettings] = useState(false);
        const [usingAI, setUsingAI] = useState(false);
      const [apiProvider, setApiProvider] = useState('anthropic');
  
  const messagesEndRef = useRef(null);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleApiSettings = () => {
    setShowApiSettings(!showApiSettings);
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check for saved API key in localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('web3AssistantApiKey');
    const storedProvider = localStorage.getItem('web3AssistantProvider') || 'anthropic';
    if (storedApiKey) {
      setSavedApiKey(storedApiKey);
      setUsingAI(true);
      setApiProvider(storedProvider);
    }
  }, []);
  
  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('web3AssistantApiKey', apiKey.trim());
      localStorage.setItem('web3AssistantProvider', apiProvider);
      setSavedApiKey(apiKey.trim());
      setUsingAI(true);
      setApiKey('');
      setShowApiSettings(false);
      setMessages([
        { role: 'assistant', content: `API key saved! I'm now connected to the ${apiProvider === 'anthropic' ? 'Anthropic' : 'OpenAI'} API for more intelligent responses about web3 and digital assets.` }
      ]);
    }
  };

  const removeApiKey = () => {
    localStorage.removeItem('web3AssistantApiKey');
    localStorage.removeItem('web3AssistantProvider');
    setSavedApiKey('');
    setUsingAI(false);
    setMessages([
      { role: 'assistant', content: 'API key removed. I\'m now using demo mode with predefined responses.' }
    ]);
    setShowApiSettings(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    
    // Show typing indicator
    setIsTyping(true);
    
    if (usingAI && savedApiKey) {
      try {
        let response;
        let data;
        
        if (apiProvider === 'anthropic') {
          // Make API call to Anthropic Claude
          response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': savedApiKey,
              'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
              model: 'claude-3-opus-20240229',
              max_tokens: 150,
              system: 'You are a helpful assistant specializing in web3, blockchain, NFTs, and digital assets for creators and brands. Keep responses concise and focused on helping users understand how to leverage digital assets for growth.',
              messages: [
                ...messages.map(msg => ({
                  role: msg.role,
                  content: msg.content
                })),
                {
                  role: 'user',
                  content: userMessage
                }
              ]
            })
          });
          
          data = await response.json();
          
          if (data.error) {
            throw new Error(data.error.message || 'Error with Anthropic API');
          }
          
          if (data.content && data.content[0] && data.content[0].text) {
            setMessages(prev => [...prev, { 
              role: 'assistant', 
              content: data.content[0].text 
            }]);
          }
        } else {
          // Make API call to OpenAI
          response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${savedApiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'system',
                  content: 'You are a helpful assistant specializing in web3, blockchain, NFTs, and digital assets for creators and brands. Keep responses concise and focused on helping users understand how to leverage digital assets for growth.'
                },
                ...messages.map(msg => ({
                  role: msg.role,
                  content: msg.content
                })),
                {
                  role: 'user',
                  content: userMessage
                }
              ],
              max_tokens: 150
            })
          });
          
          data = await response.json();
          
          if (data.error) {
            throw new Error(data.error.message || 'Error with OpenAI API');
          }
          
          if (data.choices && data.choices[0] && data.choices[0].message) {
            setMessages(prev => [...prev, { 
              role: 'assistant', 
              content: data.choices[0].message.content 
            }]);
          }
        }
      } catch (error) {
        console.error(`Error with ${apiProvider} API:`, error);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Sorry, there was an error connecting to the AI service: ${error.message}. Please check your API key.` 
        }]);
        setUsingAI(false);
      } finally {
        setIsTyping(false);
      }
    } else {
      // Use predefined responses for demo mode
      setTimeout(() => {
        const aiResponses = [
          "I'd be happy to explain how our platform helps creators monetize their content using web3 technology.",
          "Digital assets can provide new revenue streams for your brand. Would you like to learn more about NFTs or social tokens?",
          "Our tools make it easy to launch your own token without any technical knowledge. Would you like a demo?",
          "We've helped many creators increase their revenue by 40% in the first quarter after implementation.",
          "Web3 technology allows for direct connection with your audience without platform intermediaries taking large cuts.",
          "Think of tokens as a membership program for your most dedicated fans, offering exclusive content and experiences.",
          "The key benefit of blockchain-based assets is verifiable scarcity and ownership that can't be copied or diluted.",
          "Many brands are using NFTs to create premium digital experiences and build stronger community engagement."
        ];
        
        // Simple logic to try to match response to question
        let response = "";
        const lowerCaseMessage = userMessage.toLowerCase();
        
        if (lowerCaseMessage.includes('nft') || lowerCaseMessage.includes('token')) {
          response = aiResponses[1] || aiResponses[4];
        } else if (lowerCaseMessage.includes('how') || lowerCaseMessage.includes('explain')) {
          response = aiResponses[0] || aiResponses[7];
        } else if (lowerCaseMessage.includes('benefit') || lowerCaseMessage.includes('advantage')) {
          response = aiResponses[4] || aiResponses[6];
        } else if (lowerCaseMessage.includes('example') || lowerCaseMessage.includes('case study')) {
          response = aiResponses[3] || aiResponses[7];
        } else {
          // Random response if no keyword match
          response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        }
        
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        setIsTyping(false);
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-950 to-indigo-900 flex flex-col" style={{backgroundImage: "linear-gradient(to bottom, #0f172a, #1e1b4b)", backgroundSize: "100% 100%", backgroundAttachment: "fixed"}}>
      {/* Header for desktop */}
      <header className="hidden md:flex justify-between items-center w-full py-4 px-8">
        <div className="text-white text-xl font-bold">DigitalWealth</div>
        <nav className="flex items-center space-x-8">
          <a href="#" className="text-white hover:text-cyan-300 transition-colors">About</a>
          <a href="#" className="text-white hover:text-cyan-300 transition-colors">Services</a>
          <a href="#" className="text-white hover:text-cyan-300 transition-colors">Contact</a>
        </nav>
      </header>

      {/* Mobile header with hamburger */}
      <header className="md:hidden flex justify-between items-center w-full py-4 px-6">
        <div className="text-white text-xl font-bold">DigitalWealth</div>
        <button 
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 right-0 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <div className="h-full w-64 bg-indigo-900 shadow-lg flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-indigo-800">
            <span className="text-white text-lg font-bold">Menu</span>
            <button onClick={toggleSidebar} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col p-4">
            <a href="#" className="text-white py-3 border-b border-indigo-800 hover:text-cyan-300 transition-colors">About</a>
            <a href="#" className="text-white py-3 border-b border-indigo-800 hover:text-cyan-300 transition-colors">Services</a>
            <a href="#" className="text-white py-3 hover:text-cyan-300 transition-colors">Contact</a>
          </nav>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-4xl">
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-2">
            Unlocking
          </h1>
          <h1 className="text-cyan-200 text-5xl md:text-6xl font-bold mb-2">
            Digital Wealth
          </h1>
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-8">
            for Creators and Brands
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
            We are a web3 company enabling the power of crypto and digital assets to build 
            products and experiences that drive valuable growth in the digital age
          </p>
          
          <button className="bg-cyan-400 text-indigo-950 font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-300 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
      
      {/* Chat button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-cyan-400 text-indigo-950 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-cyan-300 transition-colors z-30"
      >
        {isChatOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {/* Chat window */}
      <div className={`fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-30 transition-transform duration-300 ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
        <div className="bg-indigo-900 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-indigo-900 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold">Web3 Assistant</span>
            {usingAI && (
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">LIVE</span>
            )}
          </div>
          <div className="flex items-center">
            <button onClick={toggleApiSettings} className="text-white mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button onClick={toggleChat} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* API settings panel */}
        {showApiSettings && (
          <div className="bg-gray-100 p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">Connect to AI API</h3>
            <p className="text-sm text-gray-600 mb-3">Enter your API key for more intelligent responses.</p>
            
            {savedApiKey ? (
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-full"></div>
                  </div>
                  <span className="ml-2 text-sm text-green-600">Connected to {apiProvider === 'anthropic' ? 'Anthropic' : 'OpenAI'}</span>
                </div>
                <button 
                  onClick={removeApiKey}
                  className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove API Key
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-3">
                  <div className="flex mb-3">
                    <button 
                      onClick={() => setApiProvider('anthropic')} 
                      className={`flex-1 py-2 px-4 rounded-l ${
                        apiProvider === 'anthropic' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Anthropic
                    </button>
                    <button 
                      onClick={() => setApiProvider('openai')} 
                      className={`flex-1 py-2 px-4 rounded-r ${
                        apiProvider === 'openai' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      OpenAI
                    </button>
                  </div>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`Enter your ${apiProvider === 'anthropic' ? 'Anthropic' : 'OpenAI'} API key`}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button 
                  onClick={saveApiKey}
                  disabled={!apiKey.trim()}
                  className={`w-full py-2 px-4 rounded ${
                    apiKey.trim() ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition-colors`}
                >
                  Connect
                </button>
              </div>
            )}
            
            <div className="mt-3 text-xs text-gray-500">
              Your API key is stored locally in your browser and never sent to our servers.
            </div>
          </div>
        )}
        
        <div className="h-80 overflow-y-auto p-4 flex flex-col">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-3 max-w-3/4 ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
            >
              <div className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-indigo-100 text-indigo-900' : 'bg-gray-100 text-gray-800'}`}>
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="mb-3 mr-auto">
              <div className="p-3 rounded-lg bg-gray-100 text-gray-800">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-3 border-t border-gray-200">
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              placeholder="Ask about web3 and digital assets..."
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-indigo-500"
            />
            <button 
              onClick={handleSubmit}
              className="bg-indigo-900 text-white px-4 rounded-r-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
            <span>{usingAI ? `Connected to ${apiProvider === 'anthropic' ? 'Anthropic' : 'OpenAI'} API` : 'Using demo mode'}</span>
            {!usingAI && (
              <button 
                onClick={toggleApiSettings} 
                className="text-indigo-600 hover:text-indigo-800"
              >
                Connect API
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay when chat is open on mobile */}
      {isChatOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-20 md:hidden"
          onClick={toggleChat}
        ></div>
      )}
    </div>
  );
};

export default DigitalWealthUI;