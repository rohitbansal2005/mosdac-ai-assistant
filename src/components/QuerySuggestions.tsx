
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from 'lucide-react';

interface QuerySuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  currentLanguage: string;
}

const QuerySuggestions = ({ onSuggestionClick, currentLanguage }: QuerySuggestionsProps) => {
  const suggestions = {
    en: [
      "How to download INSAT-3D weather data?",
      "What is the difference between AWiFS and LISS sensors?",
      "Show me Oceansat-2 chlorophyll products",
      "How to register for MOSDAC services?",
      "What formats are available for satellite data?",
      "Tell me about land use classification products"
    ],
    hi: [
      "INSAT-3D weather data कैसे download करें?",
      "AWiFS और LISS sensors में क्या अंतर है?",
      "Oceansat-2 chlorophyll products दिखाएं",
      "MOSDAC services के लिए registration कैसे करें?",
      "Satellite data कौन से formats में उपलब्ध है?",
      "Land use classification products के बारे में बताएं"
    ],
    bn: [
      "INSAT-3D weather data কিভাবে download করব?",
      "AWiFS এবং LISS sensors এর মধ্যে পার্থক্য কি?",
      "Oceansat-2 chlorophyll products দেখান",
      "MOSDAC services এর জন্য registration কিভাবে করব?",
      "Satellite data কোন formats এ পাওয়া যায়?",
      "Land use classification products সম্পর্কে বলুন"
    ],
    ta: [
      "INSAT-3D weather data எப்படி download செய்வது?",
      "AWiFS மற்றும் LISS sensors க்கு இடையே என்ன வேறுபாடு?",
      "Oceansat-2 chlorophyll products காட்டுங்கள்",
      "MOSDAC services க்கு registration எப்படி செய்வது?",
      "Satellite data எந்த formats ல் கிடைக்கிறது?",
      "Land use classification products பற்றி சொல்லுங்கள்"
    ],
    te: [
      "INSAT-3D weather data ఎలా download చేయాలి?",
      "AWiFS మరియు LISS sensors మధ్య తేడా ఏమిటి?",
      "Oceansat-2 chlorophyll products చూపించండి",
      "MOSDAC services కోసం registration ఎలా చేయాలి?",
      "Satellite data ఏ formats లో అందుబాటులో ఉంది?",
      "Land use classification products గురించి చెప్పండి"
    ]
  };

  const currentSuggestions = suggestions[currentLanguage] || suggestions.en;

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          <span>Smart Suggestions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {currentSuggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            className="w-full text-left text-xs hover:bg-blue-50 transition-colors justify-start h-auto p-2 whitespace-normal"
          >
            {suggestion}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuerySuggestions;
