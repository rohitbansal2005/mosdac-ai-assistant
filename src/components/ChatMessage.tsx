
import React from 'react';
import { Bot, User, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const ChatMessage = ({ message }) => {
  const isBot = message.type === 'bot';
  
  return (
    <div className={`flex space-x-3 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-100' : 'bg-gray-100'
      }`}>
        {isBot ? (
          <Bot className="h-4 w-4 text-blue-600" />
        ) : (
          <User className="h-4 w-4 text-gray-600" />
        )}
      </div>
      
      <div className={`flex-1 ${isBot ? '' : 'text-right'}`}>
        <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
          isBot 
            ? 'bg-blue-50 text-gray-800' 
            : 'bg-gray-900 text-white'
        }`}>
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        
        {message.entities && message.entities.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {message.entities.map((entity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {entity}
              </Badge>
            ))}
          </div>
        )}
        
        <div className={`flex items-center space-x-1 mt-1 text-xs text-gray-500 ${
          isBot ? '' : 'justify-end'
        }`}>
          <Clock className="h-3 w-3" />
          <span>{message.timestamp.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
