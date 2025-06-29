import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Search, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import KnowledgeGraph from '../components/KnowledgeGraph';
import ChatMessage from '../components/ChatMessage';
import QuerySuggestions from '../components/QuerySuggestions';
import ResponsiveLayout from '../components/ResponsiveLayout';
import EnhancedHeader from '../components/EnhancedHeader';
import SmartStatsCards from '../components/SmartStatsCards';

const Index = () => {
  // ... keep existing code (state declarations and useEffect)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'नमस्ते! मैं आपका MOSDAC AI Assistant हूं। मैं satellite data, products, documentation और services के बारे में जानकारी दे सकता हूं। आप क्या जानना चाहते हैं?',
      timestamp: new Date(),
      entities: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // ... keep existing code (mockResponses, generateBotResponse, handleSendMessage, handleSuggestionClick, handleKeyPress)
  const mockResponses = [
    {
      keywords: ['weather', 'meteorological', 'temperature', 'rainfall', 'मौसम', 'तापमान'],
      response: 'मैंने meteorological satellite data की जानकारी खोजी है। MOSDAC INSAT-3D और INSAT-3DR weather satellite products प्रदान करता है जिसमें temperature profiles, humidity, और precipitation data शामिल है। यह HDF5 format में global coverage के साथ उपलब्ध है।',
      entities: ['INSAT-3D', 'INSAT-3DR', 'Temperature', 'Precipitation', 'HDF5']
    },
    {
      keywords: ['ocean', 'oceansat', 'sea surface', 'coastal', 'समुद्र', 'तटीय'],
      response: 'Oceansat-2 और Oceansat-3 comprehensive ocean color और sea surface temperature data प्रदान करते हैं। ये satellites chlorophyll concentration, suspended sediments, और coastal zone changes को monitor करते हैं। Data विभिन्न processing levels L1B से L3 तक उपलब्ध है।',
      entities: ['Oceansat-2', 'Oceansat-3', 'Ocean Color', 'Sea Surface Temperature', 'L1B', 'L3']
    },
    {
      keywords: ['land', 'vegetation', 'agriculture', 'ndvi', 'भूमि', 'कृषि', 'वनस्पति'],
      response: 'भूमि और vegetation monitoring के लिए, हमारे पास Resourcesat series का data है जो NDVI, land use/land cover maps, और agricultural monitoring products प्रदान करता है। AWiFS और LISS sensors vegetation analysis के लिए multi-spectral data देते हैं।',
      entities: ['Resourcesat', 'NDVI', 'AWiFS', 'LISS', 'Land Use', 'Agriculture']
    },
    {
      keywords: ['download', 'access', 'registration', 'login', 'डाउनलोड', 'पंजीकरण'],
      response: 'MOSDAC data access करने के लिए: 1) mosdac.gov.in/register पर register करें 2) अपना email verify करें 3) Login करके catalogs browse करें 4) Data pool या visualization tools का use करें। कुछ products के लिए bulk downloads की approval चाहिए।',
      entities: ['Registration', 'Data Pool', 'Catalog', 'Bulk Download']
    }
  ];

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const mock of mockResponses) {
      if (mock.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return {
          content: mock.response,
          entities: mock.entities
        };
      }
    }
    
    return {
      content: 'मैं समझ गया कि आप satellite data और services के बारे में जानकारी चाहते हैं। कृपया अधिक specific बताएं कि आपको क्या चाहिए? उदाहरण के लिए, आप specific satellites, data products, download procedures, या technical specifications के बारे में पूछ सकते हैं।',
      entities: ['Help', 'Guidance', 'Specification']
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      entities: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        entities: botResponse.entities
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ResponsiveLayout>
      <EnhancedHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="py-4 sm:py-6">
        <SmartStatsCards />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Chat/Graph Panel */}
          <div className="xl:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm h-[500px] sm:h-[600px] flex flex-col shadow-xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  {activeTab === 'chat' ? (
                    <>
                      <Bot className="h-5 w-5 text-blue-600" />
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        AI Chat Assistant
                      </span>
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 text-blue-600" />
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Knowledge Graph
                      </span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              
              {activeTab === 'chat' ? (
                <>
                  <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    {isTyping && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="animate-bounce w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div className="animate-bounce w-2 h-2 bg-blue-600 rounded-full" style={{animationDelay: '0.1s'}}></div>
                          <div className="animate-bounce w-2 h-2 bg-blue-600 rounded-full" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm">AI सोच रहा है...</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </CardContent>
                  
                  <div className="p-3 sm:p-4 border-t bg-gray-50/50">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Satellite data, products, documentation के बारे में पूछें..."
                        className="flex-1 bg-white"
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!inputValue.trim()}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <CardContent className="flex-1 p-0">
                  <KnowledgeGraph />
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <QuerySuggestions onSuggestionClick={handleSuggestionClick} />
            
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>AI Capabilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  {['Geospatial Queries', 'Multi-language Support', 'Voice Commands', 'Real-time Data', 'Smart Suggestions', 'Context Awareness'].map((capability) => (
                    <Badge key={capability} variant="secondary" className="justify-center py-1">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-purple-600" />
                  <span>Recent Entities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['INSAT-3D', 'Oceansat-2', 'NDVI', 'HDF5', 'AWiFS', 'L3 Products', 'MOSDAC', 'Resourcesat'].map((entity) => (
                    <Badge key={entity} variant="outline" className="text-xs hover:bg-blue-50 cursor-pointer transition-colors">
                      {entity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default Index;
