import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Search, MapPin, Satellite } from 'lucide-react';
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
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const messagesEndRef = useRef(null);

  // Language-specific welcome messages with space theme
  const welcomeMessages = {
    en: '🚀 Welcome to MOSDAC Space AI! I am your intelligent assistant for satellite data, space missions, and ISRO services. Ready to explore the cosmos of data with you! What would you like to discover?',
    hi: '🚀 MOSDAC Space AI में आपका स्वागत है! मैं satellite data, space missions और ISRO services का आपका बुद्धिमान सहायक हूं। आपके साथ data के ब्रह्मांड की खोज के लिए तैयार हूं! आप क्या खोजना चाहते हैं?',
    bn: '🚀 MOSDAC Space AI তে স্বাগতম! আমি satellite data, space missions এবং ISRO services এর জন্য আপনার বুদ্ধিমান সহায়ক। আপনার সাথে data এর মহাকাশ অন্বেষণ করতে প্রস্তুত! আপনি কী আবিষ্কার করতে চান?',
    ta: '🚀 MOSDAC Space AI க்கு வரவேற்கிறோம்! நான் satellite data, space missions மற்றும் ISRO services க்கான உங்கள் அறிவார்ந்த உதவியாளர். உங்களுடன் data வின் பிரபஞ்சத்தை ஆராய தயாராக இருக்கிறேன்! நீங்கள் என்ன கண்டுபிடிக்க விரும்புகிறீர்கள்?',
    te: '🚀 MOSDAC Space AI కి స్వాగతం! నేను satellite data, space missions మరియు ISRO services కోసం మీ తెలివైన సహాయకుడను। మీతో data యొక్క విశ్వాన్ని అన్వేషించడానికి సిద్ధంగా ఉన్నాను! మీరు ఏమి కనుగొనాలనుకుంటున్నారు?'
  };

  // Initialize messages with language-specific welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: welcomeMessages[currentLanguage],
        timestamp: new Date(),
        entities: []
      }
    ]);
  }, [currentLanguage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Enhanced multilingual responses with space theme
  const mockResponses = {
    en: [
      {
        keywords: ['weather', 'meteorological', 'temperature', 'rainfall'],
        response: '🛰️ Found meteorological satellite data! INSAT-3D and INSAT-3DR provide comprehensive weather monitoring from space. These advanced satellites deliver temperature profiles, humidity data, and precipitation measurements with global coverage in HDF5 format.',
        entities: ['INSAT-3D', 'INSAT-3DR', 'Temperature', 'Precipitation', 'HDF5']
      },
      {
        keywords: ['ocean', 'oceansat', 'sea surface', 'coastal'],
        response: '🌊 Oceansat-2 and Oceansat-3 are India\'s ocean observation champions! They monitor ocean color, sea surface temperature, chlorophyll concentration, and coastal zone dynamics. Data available from L1B to L3 processing levels for comprehensive marine analysis.',
        entities: ['Oceansat-2', 'Oceansat-3', 'Ocean Color', 'Sea Surface Temperature', 'L1B', 'L3']
      },
      {
        keywords: ['land', 'vegetation', 'agriculture', 'ndvi'],
        response: '🌱 Resourcesat series satellites provide excellent land and vegetation monitoring! NDVI calculations, land use/land cover mapping, and agricultural monitoring through AWiFS and LISS sensors for multi-spectral vegetation analysis.',
        entities: ['Resourcesat', 'NDVI', 'AWiFS', 'LISS', 'Land Use', 'Agriculture']
      },
      {
        keywords: ['download', 'access', 'registration', 'login'],
        response: '📥 To access MOSDAC space data: 1) Register at mosdac.gov.in/register 2) Verify email 3) Login and explore catalogs 4) Use Data Pool or visualization tools. Some premium products require bulk download approval.',
        entities: ['Registration', 'Data Pool', 'Catalog', 'Bulk Download']
      }
    ],
    hi: [
      {
        keywords: ['weather', 'meteorological', 'temperature', 'rainfall', 'मौसम', 'तापमान'],
        response: '🛰️ Meteorological satellite data मिल गया! INSAT-3D और INSAT-3DR अंतरिक्ष से comprehensive weather monitoring प्रदान करते हैं। ये advanced satellites temperature profiles, humidity data, और precipitation measurements HDF5 format में global coverage के साथ देते हैं।',
        entities: ['INSAT-3D', 'INSAT-3DR', 'Temperature', 'Precipitation', 'HDF5']
      },
      {
        keywords: ['ocean', 'oceansat', 'sea surface', 'coastal', 'समुद्र', 'तटीय'],
        response: '🌊 Oceansat-2 और Oceansat-3 भारत के ocean observation champions हैं! ये ocean color, sea surface temperature, chlorophyll concentration, और coastal zone dynamics को monitor करते हैं। L1B से L3 processing levels तक comprehensive marine analysis के लिए data उपलब्ध है।',
        entities: ['Oceansat-2', 'Oceansat-3', 'Ocean Color', 'Sea Surface Temperature', 'L1B', 'L3']
      },
      {
        keywords: ['land', 'vegetation', 'agriculture', 'ndvi', 'भूमि', 'कृषि', 'वनस्पति'],
        response: '🌱 Resourcesat series satellites excellent land और vegetation monitoring प्रदान करते हैं! NDVI calculations, land use/land cover mapping, और AWiFS तथा LISS sensors के through agricultural monitoring multi-spectral vegetation analysis के लिए।',
        entities: ['Resourcesat', 'NDVI', 'AWiFS', 'LISS', 'Land Use', 'Agriculture']
      },
      {
        keywords: ['download', 'access', 'registration', 'login', 'डाउनलोड', 'पंजीकरण'],
        response: '📥 MOSDAC space data access करने के लिए: 1) mosdac.gov.in/register पर register करें 2) Email verify करें 3) Login करके catalogs explore करें 4) Data Pool या visualization tools use करें। कुछ premium products के लिए bulk download approval चाहिए।',
        entities: ['Registration', 'Data Pool', 'Catalog', 'Bulk Download']
      }
    ]
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    const languageResponses = mockResponses[currentLanguage] || mockResponses.en;
    
    for (const mock of languageResponses) {
      if (mock.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return {
          content: mock.response,
          entities: mock.entities
        };
      }
    }
    
    // Default responses based on language with space theme
    const defaultResponses = {
      en: '🚀 I understand you want space-related information! Please be more specific about satellite data, space missions, or ISRO services. Ask about specific satellites, data products, download procedures, or technical specifications.',
      hi: '🚀 मैं समझ गया कि आप space-related जानकारी चाहते हैं! कृपया satellite data, space missions, या ISRO services के बारे में अधिक specific बताएं। Specific satellites, data products, download procedures, या technical specifications के बारे में पूछें।',
      bn: '🚀 আমি বুঝতে পারি যে আপনি space-related তথ্য চান! দয়া করে satellite data, space missions, বা ISRO services সম্পর্কে আরও specific বলুন। Specific satellites, data products, download procedures, বা technical specifications সম্পর্কে জিজ্ঞাস করুন।',
      ta: '🚀 நீங்கள் space-related தகவல்களை விரும்புகிறீர்கள் என்று புரிகிறது! Satellite data, space missions, அல்லது ISRO services பற்றி மிகவும் specific ஆக சொல்லுங்கள். Specific satellites, data products, download procedures, அல்லது technical specifications பற்றி கேளுங்கள்।',
      te: '🚀 మీకు space-related సమాచారం కావాలని అర్థమైంది! Satellite data, space missions, లేదా ISRO services గురించి మరింత specific గా చెప్పండి। Specific satellites, data products, download procedures, లేదా technical specifications గురించి అడగండి।'
    };
    
    return {
      content: defaultResponses[currentLanguage] || defaultResponses.en,
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

  // Language-specific placeholders with space theme
  const placeholders = {
    en: '🛰️ Ask about satellites, space missions, data products...',
    hi: '🛰️ Satellites, space missions, data products के बारे में पूछें...',
    bn: '🛰️ Satellites, space missions, data products সম্পর্কে জিজ্ঞাস করুন...',
    ta: '🛰️ Satellites, space missions, data products பற்றி கேளுங்கள்...',
    te: '🛰️ Satellites, space missions, data products గురించి అడగండి...'
  };

  // Typing indicators
  const typingTexts = {
    en: '🤖 Space AI is processing...',
    hi: '🤖 Space AI प्रोसेसिंग कर रहा है...',
    bn: '🤖 Space AI প্রসেসিং করছে...',
    ta: '🤖 Space AI செயலாக்கம் செய்கிறது...',
    te: '🤖 Space AI ప్రాసెసింగ్ చేస్తోంది...'
  };

  return (
    <ResponsiveLayout>
      <EnhancedHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
      />
      
      <div className="py-2 sm:py-6">
        <SmartStatsCards />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-6">
          {/* Chat/Graph Panel */}
          <div className="xl:col-span-2">
            <Card className="bg-card/90 backdrop-blur-sm h-[400px] sm:h-[600px] flex flex-col shadow-2xl border border-primary/20 cosmic-glow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {activeTab === 'chat' ? (
                      <>
                        <Bot className="h-5 w-5 text-primary space-float" />
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          Space AI Assistant
                        </span>
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5 text-primary space-float" />
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          Knowledge Galaxy
                        </span>
                      </>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              
              {activeTab === 'chat' ? (
                <>
                  <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    {isTyping && (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Bot className="h-4 w-4 space-float" />
                        <div className="flex space-x-1">
                          <div className="animate-bounce w-2 h-2 bg-primary rounded-full"></div>
                          <div className="animate-bounce w-2 h-2 bg-primary rounded-full" style={{animationDelay: '0.1s'}}></div>
                          <div className="animate-bounce w-2 h-2 bg-primary rounded-full" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm">{typingTexts[currentLanguage]}</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </CardContent>
                  
                  <div className="p-3 sm:p-4 border-t border-primary/20 bg-muted/30">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={placeholders[currentLanguage]}
                        className="flex-1 bg-background border-primary/30 text-sm focus:border-primary"
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!inputValue.trim()}
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 cosmic-glow"
                        size="sm"
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
          <div className="space-y-3 sm:space-y-6">
            <QuerySuggestions onSuggestionClick={handleSuggestionClick} currentLanguage={currentLanguage} />
            
            <Card className="bg-card/90 backdrop-blur-sm shadow-2xl border border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Satellite className="h-5 w-5 text-accent space-float" />
                  <span>Space AI Capabilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  {['🛰️ Satellite Data Analysis', '🌍 Multi-language Support', '🎙️ Voice Commands', '⚡ Real-time Processing', '💡 Smart Suggestions', '🧠 Context Awareness'].map((capability) => (
                    <Badge key={capability} variant="secondary" className="justify-center py-1 text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/90 backdrop-blur-sm shadow-2xl border border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-accent space-float" />
                  <span>Space Mission Entities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['🛰️ INSAT-3D', '🌊 Oceansat-2', '🌱 NDVI', '📊 HDF5', '📡 AWiFS', '🔬 L3 Products', '🚀 MOSDAC', '🛰️ Resourcesat'].map((entity) => (
                    <Badge key={entity} variant="outline" className="text-xs hover:bg-primary/10 cursor-pointer transition-colors border-primary/30">
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
