
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Database, Brain, MapPin, FileText, Search, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import KnowledgeGraph from '../components/KnowledgeGraph';
import ChatMessage from '../components/ChatMessage';
import QuerySuggestions from '../components/QuerySuggestions';

const Index = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your MOSDAC AI Assistant. I can help you find information about satellite data, products, documentation, and services. What would you like to know?',
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

  const mockResponses = [
    {
      keywords: ['weather', 'meteorological', 'temperature', 'rainfall'],
      response: 'I found information about meteorological satellite data. MOSDAC provides INSAT-3D and INSAT-3DR weather satellite products including temperature profiles, humidity, and precipitation data. These are available in HDF5 format with global coverage.',
      entities: ['INSAT-3D', 'INSAT-3DR', 'Temperature', 'Precipitation', 'HDF5']
    },
    {
      keywords: ['ocean', 'oceansat', 'sea surface', 'coastal'],
      response: 'Oceansat-2 and Oceansat-3 provide comprehensive ocean color and sea surface temperature data. These satellites monitor chlorophyll concentration, suspended sediments, and coastal zone changes. Data is available in various processing levels from L1B to L3.',
      entities: ['Oceansat-2', 'Oceansat-3', 'Ocean Color', 'Sea Surface Temperature', 'L1B', 'L3']
    },
    {
      keywords: ['land', 'vegetation', 'agriculture', 'ndvi'],
      response: 'For land and vegetation monitoring, we have Resourcesat series data providing NDVI, land use/land cover maps, and agricultural monitoring products. AWiFS and LISS sensors offer multi-spectral data for vegetation analysis.',
      entities: ['Resourcesat', 'NDVI', 'AWiFS', 'LISS', 'Land Use', 'Agriculture']
    },
    {
      keywords: ['download', 'access', 'registration', 'login'],
      response: 'To access MOSDAC data: 1) Register at mosdac.gov.in/register 2) Verify your email 3) Login and browse catalogs 4) Use the data pool or visualization tools. Some products require approval for bulk downloads.',
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
      content: 'I understand you\'re looking for information about satellite data and services. Could you be more specific about what you need? For example, you can ask about specific satellites, data products, download procedures, or technical specifications.',
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

    // Simulate AI processing delay
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

  const stats = [
    { label: 'Knowledge Entities', value: '15,432', icon: Database },
    { label: 'Processed Documents', value: '2,847', icon: FileText },
    { label: 'Query Accuracy', value: '94.2%', icon: Brain },
    { label: 'Response Time', value: '0.8s', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">MOSDAC AI Assistant</h1>
                <p className="text-sm text-gray-500">Intelligent Help Bot for Satellite Data Services</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={activeTab === 'chat' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveTab('chat')}
              >
                Chat
              </Button>
              <Button 
                variant={activeTab === 'graph' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveTab('graph')}
              >
                Knowledge Graph
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat/Graph Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-white h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  {activeTab === 'chat' ? (
                    <>
                      <Bot className="h-5 w-5 text-blue-600" />
                      <span>AI Chat Assistant</span>
                    </>
                  ) : (
                    <>
                      <Database className="h-5 w-5 text-blue-600" />
                      <span>Knowledge Graph</span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              
              {activeTab === 'chat' ? (
                <>
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
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
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </CardContent>
                  
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about satellite data, products, documentation..."
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
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
          <div className="space-y-6">
            <QuerySuggestions onSuggestionClick={handleSuggestionClick} />
            
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>Capabilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Geospatial Queries</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Product Search</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Technical Support</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Data Access Help</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Mission Information</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-purple-600" />
                  <span>Recent Entities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['INSAT-3D', 'Oceansat-2', 'NDVI', 'HDF5', 'AWiFS', 'L3 Products'].map((entity) => (
                    <Badge key={entity} variant="outline" className="text-xs">
                      {entity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
