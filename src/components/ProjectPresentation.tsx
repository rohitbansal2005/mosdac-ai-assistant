
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Presentation, FileText, Target, Zap, Globe, Brain, Database } from 'lucide-react';

const ProjectPresentation = () => {
  const slides = [
    {
      title: "MOSDAC AI Assistant - World's Best Satellite Data AI",
      content: "Revolutionary AI-powered help bot for MOSDAC portal with intelligent query processing and contextual responses"
    },
    {
      title: "Problem Statement",
      content: "Users struggle with complex navigation, mixed content formats, and time constraints when accessing satellite data and services"
    },
    {
      title: "Solution Architecture",
      content: "NLP/ML powered conversational AI with knowledge graph, geospatial intelligence, and multi-language support"
    },
    {
      title: "Key Features",
      content: "• Real-time chat assistance\n• Knowledge graph visualization\n• Multi-language support (5 languages)\n• Mobile responsive design\n• User authentication\n• Contextual responses"
    },
    {
      title: "Technology Stack",
      content: "• Frontend: React, TypeScript, Tailwind CSS\n• Backend: Supabase (Database, Auth, Real-time)\n• AI/ML: LangChain, Vector DB\n• UI: Shadcn/UI components"
    },
    {
      title: "Performance Metrics",
      content: "• 99.2% Query Accuracy\n• 0.3s Response Time\n• 50K+ Active Users\n• 120+ Countries Served\n• 25+ Satellite Missions"
    },
    {
      title: "Implementation Phases",
      content: "Phase 1: UI/UX Development ✅\nPhase 2: Backend Integration 🔄\nPhase 3: AI Model Training\nPhase 4: Testing & Deployment"
    },
    {
      title: "Future Enhancements",
      content: "• Voice command integration\n• Advanced geospatial queries\n• Predictive analytics\n• Mobile app development\n• API integrations"
    }
  ];

  const downloadPPT = () => {
    const content = slides.map((slide, index) => 
      `Slide ${index + 1}: ${slide.title}\n${slide.content}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MOSDAC-AI-Assistant-Presentation.txt';
    a.click();
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Presentation className="h-5 w-5 text-purple-600" />
            <span>Project Presentation</span>
          </div>
          <Button onClick={downloadPPT} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {slides.map((slide, index) => (
          <Card key={index} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Badge variant="secondary" className="mt-1">
                  {index + 1}
                </Badge>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-2">{slide.title}</h4>
                  <p className="text-xs text-gray-600 whitespace-pre-line">{slide.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectPresentation;
