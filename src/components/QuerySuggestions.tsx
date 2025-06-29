
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Satellite, Download, FileText, Map } from 'lucide-react';

const QuerySuggestions = ({ onSuggestionClick }) => {
  const suggestions = [
    {
      category: 'Product Information',
      icon: Satellite,
      queries: [
        'What weather satellite data is available?',
        'Show me ocean color products',
        'NDVI data for vegetation monitoring'
      ]
    },
    {
      category: 'Data Access',
      icon: Download,
      queries: [
        'How to download bulk satellite data?',
        'Registration process for MOSDAC',
        'Data pool access requirements'
      ]
    },
    {
      category: 'Technical Support',
      icon: FileText,
      queries: [
        'HDF5 file format specifications',
        'API documentation for developers',
        'Processing levels L1B to L3 explained'
      ]
    },
    {
      category: 'Geospatial Queries',
      icon: Map,
      queries: [
        'Satellite coverage for India region',
        'Temporal resolution of INSAT data',
        'Coastal zone monitoring products'
      ]
    }
  ];

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <span>Quick Queries</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <category.icon className="h-4 w-4" />
              <span>{category.category}</span>
            </div>
            <div className="space-y-1">
              {category.queries.map((query, queryIndex) => (
                <Button
                  key={queryIndex}
                  variant="ghost"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-2 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => onSuggestionClick(query)}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuerySuggestions;
